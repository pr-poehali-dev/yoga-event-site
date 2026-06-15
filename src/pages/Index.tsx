import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/files/80d2c61e-db87-4d54-8b02-52d06cb25743.jpg";
const TRAINER_PHOTO = "https://cdn.poehali.dev/files/b74b9443-ddbf-4517-a073-fae0b0b70032.jpeg";
const API_URL = "https://functions.poehali.dev/bf54092e-43e5-4114-9ade-aa9f3a5b54a2";

const scenarios = [
  {
    icon: "Building2",
    tag: "Корпоратив",
    title: "Тимбилдинг, корпоратив или праздник",
    desc: "Необычный формат, который запомнят гости. Йога объединяет команду лучше, чем любой командный квест.",
  },
  {
    icon: "Tent",
    tag: "Фестиваль",
    title: "Фестиваль, конференция или открытое мероприятие",
    desc: "Выхожу на сцену или на полянку — веду практику для любого уровня. Без специальной подготовки.",
  },
  {
    icon: "Sparkles",
    tag: "Частное",
    title: "День рождения, девичник или частное событие",
    desc: "Спокойная, атмосферная практика для вашей компании. Создаём особенное настроение вместе.",
  },
];

const faqs = [
  {
    q: "Сколько человек может участвовать?",
    a: "От 5 до 200+ человек. Я адаптирую формат под размер группы — будь то камерный девичник или большой корпоратив.",
  },
  {
    q: "Какой у вас опыт?",
    a: "Проводил практики на большинстве крупных российских фестивалей. 10+ лет личной практики йоги.",
  },
  {
    q: "Где проводите занятия?",
    a: "Там, где удобно вам: в офисе, на природе, в зале, на крыше, на площадке фестиваля. Приезжаю с реквизитом.",
  },
  {
    q: "Нужно ли готовиться?",
    a: "Просто приходите в удобной одежде. Коврики и всё необходимое можно обсудить заранее.",
  },
  {
    q: "Чем йога отличается от фитнеса?",
    a: "В фитнесе вы просто двигаетесь. В йоге учитесь чувствовать тело, управлять дыханием и замечать, как меняется состояние. Результат — не только тело, но и спокойствие.",
  },
  {
    q: "Нужно ли во что-то верить?",
    a: "Нет. Йога — про здоровье тела и ясность ума. Всё что я даю — работает независимо от ваших убеждений.",
  },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const scrollToForm = () => {
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Что-то пошло не так. Попробуйте ещё раз или напишите напрямую.");
      }
    } catch {
      setError("Нет связи. Попробуйте позже.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "'Golos Text', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: "var(--cream)" }}>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 text-center">
          <p className="section-label fade-up-delay-1 mb-5">
            Корпоративная йога
          </p>
          <h1
            className="font-display fade-up-delay-2 text-5xl md:text-7xl font-light leading-tight mb-6"
            style={{ color: "var(--green-deep)", fontStyle: "italic" }}
          >
            Йога на ваше<br />мероприятие
          </h1>
          <p
            className="fade-up-delay-3 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto"
            style={{ color: "var(--stone)" }}
          >
            Приезжаю и провожу практику для гостей.<br />Любой формат, любая площадка.
          </p>
          <div className="fade-up-delay-4 flex flex-col items-center gap-3">
            <button onClick={scrollToForm} className="btn-primary text-base px-8 py-4">
              Обсудить мероприятие
            </button>
            <a
              href="tel:+79969971527"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: "var(--stone)", opacity: 0.65 }}
            >
              или позвоните: +7 996 997 15 27
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={28} style={{ color: "var(--green-mid)" }} />
        </div>
      </section>

      {/* ── SCENARIOS ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Форматы</p>
            <h2
              className="font-display text-4xl md:text-5xl font-light"
              style={{ color: "var(--green-deep)", fontStyle: "italic" }}
            >
              Под любой повод
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: i === 1 ? "var(--green-deep)" : "white",
                  boxShadow: "0 2px 16px rgba(45,74,30,0.08)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: i === 1 ? "rgba(255,255,255,0.12)" : "var(--green-pale)" }}
                >
                  <Icon
                    name={s.icon}
                    size={20}
                    style={{ color: i === 1 ? "var(--cream)" : "var(--green-mid)" }}
                  />
                </div>
                <p
                  className="section-label"
                  style={{ color: i === 1 ? "var(--green-pale)" : "var(--green-mid)" }}
                >
                  {s.tag}
                </p>
                <h3
                  className="font-display text-2xl font-normal leading-snug"
                  style={{ color: i === 1 ? "var(--cream)" : "var(--green-deep)", fontStyle: "italic" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: i === 1 ? "rgba(247,245,239,0.75)" : "var(--stone)" }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOGA GIVES ── */}
      <section className="py-24 px-6" style={{ background: "white" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-label mb-4">Что даёт йога</p>
          <h2
            className="font-display text-4xl md:text-5xl font-light mb-12"
            style={{ color: "var(--green-deep)", fontStyle: "italic" }}
          >
            Я не гуру и не обещаю чудес
          </h2>
          <div className="flex flex-col gap-8 text-left">
            {[
              { step: "01", title: "Крепкое тело", text: "Гибкость, сила, выносливость без травм." },
              { step: "02", title: "Устойчивый ум", text: "Дыхание, концентрация, снятие стресса за 5 минут." },
              { step: "03", title: "Осознанность — если захотите", text: "Без мистики, без эзотерики." },
            ].map(({ step, title, text }) => (
              <div key={step} className="flex items-start gap-6">
                <span
                  className="text-xs font-semibold tracking-widest pt-1 flex-shrink-0 w-8"
                  style={{ color: "var(--green-mid)" }}
                >
                  {step}
                </span>
                <div
                  className="flex-1 pt-0.5 pb-8"
                  style={{ borderBottom: step !== "03" ? "1px solid var(--green-pale)" : "none" }}
                >
                  <p className="font-medium text-lg mb-1" style={{ color: "var(--green-deep)" }}>{title}</p>
                  <p className="text-base" style={{ color: "var(--stone)" }}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FESTIVALS ── */}
      <section className="py-20 px-6" style={{ background: "var(--green-deep)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-4" style={{ color: "var(--green-pale)" }}>Опыт</p>
          <h2
            className="font-display text-4xl md:text-5xl font-light mb-8"
            style={{ color: "var(--cream)", fontStyle: "italic" }}
          >
            Крупнейшие российские фестивали
          </h2>
          <p className="text-base mb-8" style={{ color: "rgba(212,232,204,0.75)" }}>
            Проводил практики на крупнейших российских фестивалях:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Дикая Мята", "Йога Журнал — Равновесие", "Фестиваль Сказка", "Систо (Ленинградская обл.)", "Чилаут Пленет"].map((fest) => (
              <span
                key={fest}
                className="text-sm font-medium px-5 py-2.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", color: "var(--cream)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                {fest}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="form" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Заявка</p>
            <h2
              className="font-display text-4xl md:text-5xl font-light"
              style={{ color: "var(--green-deep)", fontStyle: "italic" }}
            >
              Обсудим ваше мероприятие
            </h2>
          </div>

          {submitted ? (
            <div
              className="text-center py-16 rounded-2xl"
              style={{ background: "var(--green-pale)", border: "1.5px solid var(--green-soft)" }}
            >
              <Icon name="CheckCircle" size={48} className="mx-auto mb-4" style={{ color: "var(--green-mid)" }} />
              <h3
                className="font-display text-3xl font-light mb-2"
                style={{ color: "var(--green-deep)", fontStyle: "italic" }}
              >
                Спасибо!
              </h3>
              <p style={{ color: "var(--stone)" }}>Я свяжусь с вами в ближайшее время.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 md:p-10 flex flex-col gap-5"
              style={{ background: "white", boxShadow: "0 2px 20px rgba(45,74,30,0.08)" }}
            >
              <div>
                <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: "var(--stone)" }}>
                  Телефон *
                </label>
                <input
                  className="form-input"
                  placeholder="+7 ..."
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 tracking-wide uppercase" style={{ color: "var(--stone)" }}>
                  Сообщение
                </label>
                <textarea
                  className="form-input resize-none"
                  rows={4}
                  placeholder="Расскажите о вашем мероприятии: формат, место, количество гостей, пожелания..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary self-start mt-2"
                style={{ opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? "Отправляю..." : "Отправить заявку"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-20 px-6" style={{ background: "var(--cream-dark)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <div
                className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden"
                style={{ boxShadow: "0 8px 32px rgba(45,74,30,0.18)", border: "4px solid var(--green-pale)" }}
              >
                <img
                  src={TRAINER_PHOTO}
                  alt="Захаров Спартак Михайлович"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="section-label mb-3">О тренере</p>
              <h2
                className="font-display text-4xl md:text-5xl font-light leading-snug mb-2"
                style={{ color: "var(--green-deep)", fontStyle: "italic" }}
              >
                Захаров Спартак<br />Михайлович
              </h2>
              <span className="leaf-divider md:ml-0 mb-5 block" style={{ margin: "12px 0" }} />
              <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--stone)" }}>
                10+ лет личной практики йоги. Участник крупнейших российских фестивалей.
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ color: "var(--stone)" }}>
                Подстраиваюсь под аудиторию: работаю с новичками и опытными практиками,
                с камерными группами и большими залами. Создаю атмосферу — не просто провожу занятие.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-5">
                {["Дикая Мята", "Равновесие", "Сказка", "Систо", "Чилаут Пленет"].map((f) => (
                  <span
                    key={f}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "var(--green-pale)", color: "var(--green-deep)", fontWeight: 500 }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--stone)", fontStyle: "italic" }}
              >
                Моя философия: йога подстраивается под человека, а не наоборот. Моя задача — дать инструменты, которые работают: убирают боль в спине, снижают тревожность, помогают фокусироваться. Всё без эзотерики, на основе практики.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6" style={{ background: "white" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">FAQ</p>
            <h2
              className="font-display text-4xl font-light"
              style={{ color: "var(--green-deep)", fontStyle: "italic" }}
            >
              Частые вопросы
            </h2>
          </div>

          <div className="flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item py-5">
                <button
                  className="w-full text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-base" style={{ color: "var(--green-deep)" }}>
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 transition-transform duration-300"
                    style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    <Icon name="Plus" size={18} style={{ color: "var(--green-mid)" }} />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? "200px" : "0px" }}
                >
                  <p className="pt-3 text-sm leading-relaxed" style={{ color: "var(--stone)" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-14 px-6" style={{ background: "var(--green-deep)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h3
            className="font-display text-3xl font-light mb-8"
            style={{ color: "var(--cream)", fontStyle: "italic" }}
          >
            Йога на ваше мероприятие
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
            <a
              href="tel:+79969971527"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-75"
              style={{ color: "var(--green-pale)" }}
            >
              <Icon name="Phone" size={15} />
              +7 996 997 15 27
            </a>
            <a
              href="mailto:almaznayaspina@gmail.com"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-75"
              style={{ color: "var(--green-pale)" }}
            >
              <Icon name="Mail" size={15} />
              almaznayaspina@gmail.com
            </a>
            <a
              href="https://t.me/spartakmihailovich"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-75"
              style={{ color: "var(--green-pale)" }}
            >
              <Icon name="Send" size={15} />
              @spartakmihailovich
            </a>
          </div>
          <button
            onClick={scrollToForm}
            className="btn-primary"
            style={{ background: "var(--green-pale)", color: "var(--green-deep)" }}
          >
            Обсудить мероприятие
          </button>
          <p className="mt-8 text-sm" style={{ color: "rgba(212,232,204,0.6)", fontStyle: "italic" }}>
            Йога без гуру, без эзотерики, без надрыва.<br />Просто — чтобы телу было легко, а в голове — ясно.
          </p>
          <p className="mt-4 text-xs" style={{ color: "rgba(212,232,204,0.3)" }}>
            © 2026 yogaevent.ru
          </p>
        </div>
      </footer>

    </div>
  );
}