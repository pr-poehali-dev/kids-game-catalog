import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "catalog" | "delivery" | "contacts";

interface Product {
  id: number;
  name: string;
  brand: string;
  type: "компрессорный" | "ультразвуковой" | "меш-небулайзер";
  age: "дети" | "взрослые" | "универсальный";
  price: number;
  image: string;
  badge?: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "NebuPro 3000",
    brand: "OMRON",
    type: "компрессорный",
    age: "универсальный",
    price: 3490,
    image: "https://cdn.poehali.dev/projects/817a13ff-276b-40ef-b049-24bf274a3f4b/files/c5208ddc-07d8-431c-90e4-9f97fa69000a.jpg",
    badge: "Хит продаж",
    description: "Мощный компрессорный небулайзер для всей семьи. Подходит для любых лекарств.",
  },
  {
    id: 2,
    name: "AquaMist Lite",
    brand: "B.Well",
    type: "ультразвуковой",
    age: "взрослые",
    price: 4990,
    image: "https://cdn.poehali.dev/projects/817a13ff-276b-40ef-b049-24bf274a3f4b/files/56d26244-c4ef-47ac-8485-093723ff7d8c.jpg",
    badge: "Новинка",
    description: "Бесшумный ультразвуковой аппарат для домашнего использования.",
  },
  {
    id: 3,
    name: "KidBreath Junior",
    brand: "Little Doctor",
    type: "меш-небулайзер",
    age: "дети",
    price: 5290,
    image: "https://cdn.poehali.dev/projects/817a13ff-276b-40ef-b049-24bf274a3f4b/files/13ca9ff1-2ff9-42e5-ad0e-ce8992a26bb7.jpg",
    badge: "Для детей",
    description: "Яркий меш-небулайзер с тихой работой. Идеален для малышей от 0 лет.",
  },
  {
    id: 4,
    name: "ComfortBreath Pro",
    brand: "OMRON",
    type: "компрессорный",
    age: "взрослые",
    price: 2890,
    image: "https://cdn.poehali.dev/projects/817a13ff-276b-40ef-b049-24bf274a3f4b/files/c5208ddc-07d8-431c-90e4-9f97fa69000a.jpg",
    description: "Надёжный компрессорный небулайзер для взрослых пациентов.",
  },
  {
    id: 5,
    name: "UltraSilent 500",
    brand: "Microlife",
    type: "ультразвуковой",
    age: "универсальный",
    price: 6790,
    image: "https://cdn.poehali.dev/projects/817a13ff-276b-40ef-b049-24bf274a3f4b/files/56d26244-c4ef-47ac-8485-093723ff7d8c.jpg",
    badge: "Премиум",
    description: "Премиальный ультразвуковой небулайзер с LCD-дисплеем.",
  },
  {
    id: 6,
    name: "MeshKid Mini",
    brand: "Little Doctor",
    type: "меш-небулайзер",
    age: "дети",
    price: 7490,
    image: "https://cdn.poehali.dev/projects/817a13ff-276b-40ef-b049-24bf274a3f4b/files/13ca9ff1-2ff9-42e5-ad0e-ce8992a26bb7.jpg",
    description: "Карманный меш-небулайзер для детей. Работает от USB.",
  },
];

const BRANDS = ["Все", "OMRON", "B.Well", "Little Doctor", "Microlife"];
const TYPES = ["Все", "компрессорный", "ультразвуковой", "меш-небулайзер"];
const AGES = ["Все", "дети", "взрослые", "универсальный"];

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [filterBrand, setFilterBrand] = useState("Все");
  const [filterType, setFilterType] = useState("Все");
  const [filterAge, setFilterAge] = useState("Все");
  const [priceMax, setPriceMax] = useState(10000);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (filterBrand !== "Все" && p.brand !== filterBrand) return false;
      if (filterType !== "Все" && p.type !== filterType) return false;
      if (filterAge !== "Все" && p.age !== filterAge) return false;
      if (p.price > priceMax) return false;
      return true;
    });
  }, [filterBrand, filterType, filterAge, priceMax]);

  const navItems: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "catalog", label: "Каталог" },
    { key: "delivery", label: "Доставка" },
    { key: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button
            onClick={() => setSection("home")}
            className="font-display text-xl font-bold tracking-widest uppercase text-gradient"
          >
            МедКаталог
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                  section === item.key
                    ? "text-[var(--cyan)] active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSection("catalog")}
              className="relative p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Icon name="ShoppingCart" size={20} className="text-muted-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--cyan)] text-background text-xs flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-slide-down">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setSection(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-6 py-3 text-sm font-medium transition-colors ${
                  section === item.key ? "text-[var(--cyan)]" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* ===== HOME ===== */}
        {section === "home" && (
          <div>
            <section className="relative min-h-[90vh] flex items-center bg-grid overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--cyan)] opacity-5 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-cyan-300 opacity-5 blur-3xl" />
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--cyan)]/30 bg-[var(--cyan-dim)] mb-6 section-enter stagger-1">
                      <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
                      <span className="text-xs text-[var(--cyan)] font-medium tracking-widest uppercase">
                        Медицинское оборудование
                      </span>
                    </div>
                    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-none mb-6 section-enter stagger-2">
                      <span className="text-foreground">Дышите</span>
                      <br />
                      <span className="text-gradient">легко</span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8 section-enter stagger-3">
                      Каталог профессиональных ингаляторов и небулайзеров для детей и взрослых. Подберём оптимальный аппарат под ваши нужды.
                    </p>
                    <div className="flex flex-wrap gap-3 section-enter stagger-4">
                      <button
                        onClick={() => setSection("catalog")}
                        className="px-6 py-3 rounded-xl bg-[var(--cyan)] text-background font-semibold hover:opacity-90 transition-all hover:scale-105 glow-cyan"
                      >
                        Перейти в каталог
                      </button>
                      <button
                        onClick={() => setSection("contacts")}
                        className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:border-[var(--cyan)]/50 transition-all"
                      >
                        Задать вопрос
                      </button>
                    </div>
                  </div>
                  <div className="relative section-enter stagger-3">
                    <div className="relative rounded-2xl overflow-hidden border border-border/50">
                      <img
                        src="https://cdn.poehali.dev/projects/817a13ff-276b-40ef-b049-24bf274a3f4b/files/c5208ddc-07d8-431c-90e4-9f97fa69000a.jpg"
                        alt="Небулайзер"
                        className="w-full object-cover aspect-square"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 backdrop-blur-sm">
                      <div className="text-2xl font-display font-bold text-[var(--cyan)]">6+</div>
                      <div className="text-xs text-muted-foreground">моделей в наличии</div>
                    </div>
                    <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 backdrop-blur-sm">
                      <div className="text-2xl font-display font-bold text-[var(--cyan)]">3</div>
                      <div className="text-xs text-muted-foreground">типа аппаратов</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 border-t border-border/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-center mb-4">
                  Почему <span className="text-gradient">выбирают нас</span>
                </h2>
                <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
                  Только сертифицированное оборудование от проверенных производителей
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: "ShieldCheck", title: "Гарантия качества", desc: "Все аппараты имеют сертификаты соответствия" },
                    { icon: "Truck", title: "Быстрая доставка", desc: "Доставим за 1–2 дня по всей России" },
                    { icon: "Headphones", title: "Консультация врача", desc: "Поможем подобрать нужный аппарат" },
                    { icon: "RefreshCcw", title: "Возврат 30 дней", desc: "Без вопросов вернём деньги при любых проблемах" },
                  ].map((f, i) => (
                    <div key={i} className="group p-6 rounded-2xl border border-border/50 bg-card card-hover">
                      <div className="w-12 h-12 rounded-xl bg-[var(--cyan-dim)] border border-[var(--cyan)]/20 flex items-center justify-center mb-4 group-hover:border-[var(--cyan)]/50 transition-colors">
                        <Icon name={f.icon} size={22} className="text-[var(--cyan)]" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-20 border-t border-border/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase">
                    Популярные <span className="text-gradient">модели</span>
                  </h2>
                  <button
                    onClick={() => setSection("catalog")}
                    className="text-[var(--cyan)] text-sm font-medium hover:opacity-70 transition-opacity flex items-center gap-1"
                  >
                    Все товары <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRODUCTS.slice(0, 3).map((product) => (
                    <ProductCard key={product.id} product={product} onBuy={() => setCartCount((c) => c + 1)} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== CATALOG ===== */}
        {section === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
            <div className="mb-8">
              <h1 className="font-display text-4xl font-bold uppercase mb-2">
                Каталог <span className="text-gradient">аппаратов</span>
              </h1>
              <p className="text-muted-foreground">Найдено {filteredProducts.length} моделей</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">
                    Производитель
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => setFilterBrand(b)}
                        className={`filter-pill px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          filterBrand === b
                            ? "bg-[var(--cyan)] text-background border-[var(--cyan)] shadow-[0_0_15px_var(--cyan-glow)]"
                            : "border-border text-muted-foreground hover:border-[var(--cyan)]/40 hover:text-foreground"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">
                    Тип аппарата
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilterType(t)}
                        className={`filter-pill px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          filterType === t
                            ? "bg-[var(--cyan)] text-background border-[var(--cyan)] shadow-[0_0_15px_var(--cyan-glow)]"
                            : "border-border text-muted-foreground hover:border-[var(--cyan)]/40 hover:text-foreground"
                        }`}
                      >
                        {t === "Все" ? t : t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">
                    Возраст
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AGES.map((a) => (
                      <button
                        key={a}
                        onClick={() => setFilterAge(a)}
                        className={`filter-pill px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          filterAge === a
                            ? "bg-[var(--cyan)] text-background border-[var(--cyan)] shadow-[0_0_15px_var(--cyan-glow)]"
                            : "border-border text-muted-foreground hover:border-[var(--cyan)]/40 hover:text-foreground"
                        }`}
                      >
                        {a.charAt(0).toUpperCase() + a.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3 block">
                    Цена до: <span className="text-[var(--cyan)]">{priceMax.toLocaleString()} ₽</span>
                  </label>
                  <input
                    type="range"
                    min={1000}
                    max={10000}
                    step={100}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-[var(--cyan)] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 000 ₽</span>
                    <span>10 000 ₽</span>
                  </div>
                </div>
              </div>

              {(filterBrand !== "Все" || filterType !== "Все" || filterAge !== "Все" || priceMax !== 10000) && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <button
                    onClick={() => {
                      setFilterBrand("Все");
                      setFilterType("Все");
                      setFilterAge("Все");
                      setPriceMax(10000);
                    }}
                    className="text-xs text-muted-foreground hover:text-[var(--cyan)] transition-colors flex items-center gap-1"
                  >
                    <Icon name="X" size={12} /> Сбросить фильтры
                  </button>
                </div>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-4">
                  <Icon name="SearchX" size={28} className="text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground text-sm">Попробуйте изменить параметры фильтра</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onBuy={() => setCartCount((c) => c + 1)} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== DELIVERY ===== */}
        {section === "delivery" && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <h1 className="font-display text-5xl font-bold uppercase mb-2">
              <span className="text-gradient">Доставка</span>
            </h1>
            <p className="text-muted-foreground mb-12">Работаем по всей России и странам СНГ</p>

            <div className="space-y-4">
              {[
                {
                  icon: "Zap",
                  title: "Экспресс-доставка",
                  subtitle: "1–2 рабочих дня",
                  desc: "Доставим на следующий день в Москве и Санкт-Петербурге. Возможна доставка в день заказа при оформлении до 12:00.",
                  price: "от 399 ₽",
                  accent: true,
                },
                {
                  icon: "Truck",
                  title: "Курьерская доставка",
                  subtitle: "2–5 рабочих дней",
                  desc: "Доставка курьером по всей России. Курьер позвонит за час до приезда и привезёт в удобное время.",
                  price: "от 299 ₽",
                  accent: false,
                },
                {
                  icon: "Package",
                  title: "Самовывоз",
                  subtitle: "Пункты выдачи",
                  desc: "Более 3000 пунктов выдачи Boxberry и СДЭК по всей стране. Заберите в удобное время.",
                  price: "Бесплатно",
                  accent: false,
                },
                {
                  icon: "Globe",
                  title: "Международная доставка",
                  subtitle: "5–14 рабочих дней",
                  desc: "Доставка в Беларусь, Казахстан, Армению и другие страны СНГ через EMS Почту России.",
                  price: "от 990 ₽",
                  accent: false,
                },
              ].map((d, i) => (
                <div
                  key={i}
                  className={`flex gap-5 p-6 rounded-2xl border card-hover ${
                    d.accent ? "border-[var(--cyan)]/40 bg-[var(--cyan-dim)]" : "border-border bg-card"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      d.accent ? "bg-[var(--cyan)] text-background" : "bg-secondary text-[var(--cyan)]"
                    }`}
                  >
                    <Icon name={d.icon} size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{d.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{d.subtitle}</p>
                        <p className="text-sm text-muted-foreground">{d.desc}</p>
                      </div>
                      <div
                        className={`text-right shrink-0 font-display font-bold text-lg ${
                          d.accent ? "text-[var(--cyan)]" : "text-foreground"
                        }`}
                      >
                        {d.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-[var(--cyan-dim)] border border-[var(--cyan)]/30">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Gift" size={20} className="text-[var(--cyan)]" />
                <h3 className="font-semibold text-foreground">Бесплатная доставка</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                При заказе от <strong className="text-foreground">5 000 ₽</strong> доставка курьером по России — бесплатно.
              </p>
            </div>
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {section === "contacts" && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
            <h1 className="font-display text-5xl font-bold uppercase mb-2">
              <span className="text-gradient">Контакты</span>
            </h1>
            <p className="text-muted-foreground mb-12">Свяжитесь с нами удобным способом</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (800) 555-35-35", sub: "Бесплатный звонок по России" },
                  { icon: "Mail", label: "Email", value: "info@medkatalog.ru", sub: "Ответим в течение 2 часов" },
                  { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, 1", sub: "Офис и шоурум" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–20:00", sub: "Сб 10:00–18:00, Вс выходной" },
                ].map((c, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-card border border-border card-hover">
                    <div className="w-11 h-11 rounded-xl bg-[var(--cyan-dim)] border border-[var(--cyan)]/20 flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={20} className="text-[var(--cyan)]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{c.label}</p>
                      <p className="font-semibold text-foreground">{c.value}</p>
                      <p className="text-xs text-muted-foreground">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-6">Задать вопрос</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--cyan)]/60 focus:ring-1 focus:ring-[var(--cyan)]/30 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--cyan)]/60 focus:ring-1 focus:ring-[var(--cyan)]/30 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Сообщение</label>
                    <textarea
                      rows={4}
                      placeholder="Расскажите, какой аппарат вас интересует..."
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-[var(--cyan)]/60 focus:ring-1 focus:ring-[var(--cyan)]/30 transition-all text-sm resize-none"
                    />
                  </div>
                  <button className="w-full py-3 rounded-xl bg-[var(--cyan)] text-background font-semibold hover:opacity-90 transition-all hover:scale-[1.02] glow-cyan">
                    Отправить сообщение
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg font-bold tracking-widest uppercase text-gradient">МедКаталог</div>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className="text-xs text-muted-foreground hover:text-[var(--cyan)] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">© 2026 МедКаталог. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, onBuy }: { product: Product; onBuy: () => void }) {
  const [added, setAdded] = useState(false);

  const handleBuy = () => {
    setAdded(true);
    onBuy();
    setTimeout(() => setAdded(false), 2000);
  };

  const ageBadgeColor: Record<Product["age"], string> = {
    дети: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    взрослые: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    универсальный: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden card-hover flex flex-col">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        {product.badge && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[var(--cyan)] text-background text-xs font-bold">
            {product.badge}
          </div>
        )}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full border text-xs font-medium ${ageBadgeColor[product.age]}`}>
          {product.age.charAt(0).toUpperCase() + product.age.slice(1)}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.brand}</div>
        <h3 className="font-display text-xl font-bold text-foreground mb-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3">{product.type}</p>
        <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="font-display text-2xl font-bold text-foreground">
            {product.price.toLocaleString()} <span className="text-[var(--cyan)]">₽</span>
          </div>
          <button
            onClick={handleBuy}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              added
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-[var(--cyan)] text-background hover:opacity-90 hover:scale-105"
            }`}
          >
            <Icon name={added ? "Check" : "ShoppingCart"} size={16} />
            {added ? "Добавлено" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
}