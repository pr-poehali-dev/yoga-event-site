import json
import os
import psycopg2
import urllib.request


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта, сохраняет в БД и отправляет уведомление в Telegram."""

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

    name = body.get('name', '').strip()
    company = body.get('company', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    event_type = body.get('type', '').strip()
    date = body.get('date', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone or not email or not event_type:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните обязательные поля'})
        }

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.requests (name, company, phone, email, type, date, message) "
        f"VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
        (name, company or None, phone, email, event_type, date or None, message or None)
    )
    request_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    # Telegram уведомление
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_id = '@spartakyogapark_bot'

    lines = [
        f"🧘 *Новая заявка #{request_id}*",
        f"👤 *Имя:* {name}",
    ]
    if company:
        lines.append(f"🏢 *Компания:* {company}")
    lines += [
        f"📞 *Телефон:* {phone}",
        f"📧 *Email:* {email}",
        f"🎯 *Тип:* {event_type}",
    ]
    if date:
        lines.append(f"📅 *Дата:* {date}")
    if message:
        lines.append(f"💬 *Сообщение:* {message}")

    text = "\n".join(lines)

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
        urllib.request.urlopen(req, timeout=10)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': {'ok': True, 'id': request_id}
    }