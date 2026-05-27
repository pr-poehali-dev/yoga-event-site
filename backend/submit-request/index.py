import json
import os
import psycopg2
import urllib.request
import urllib.error


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта (телефон + сообщение), сохраняет в БД и шлёт уведомление в Telegram."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))

    phone = body.get('phone', '').strip()
    message = body.get('message', '').strip()

    if not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Укажите телефон'})
        }

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.requests (name, phone, email, type, message) "
        f"VALUES (%s, %s, %s, %s, %s) RETURNING id",
        ('—', phone, '—', '—', message or None)
    )
    request_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    # Telegram уведомление
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    # chat_id берём из env или используем @spartakmihailovich как fallback
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '@spartakmihailovich')

    lines = [
        f"🧘 *Новая заявка #{request_id}* — yogaevent.ru",
        f"📞 *Телефон:* {phone}",
    ]
    if message:
        lines.append(f"💬 *Сообщение:* {message}")

    text = "\n".join(lines)

    tg_error = None
    if bot_token:
        tg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        tg_body = json.dumps({
            "chat_id": chat_id,
            "text": text,
            "parse_mode": "Markdown"
        }).encode('utf-8')
        req = urllib.request.Request(
            tg_url,
            data=tg_body,
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        try:
            urllib.request.urlopen(req, timeout=10)
        except urllib.error.HTTPError as e:
            tg_error = e.read().decode('utf-8')
        except Exception as e:
            tg_error = str(e)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': {'ok': True, 'id': request_id, 'tg_error': tg_error}
    }
