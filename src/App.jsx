import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Package, Wrench, Truck, Shield, Clock, PhoneCall, CheckCircle2, ChevronRight, Star } from "lucide-react";

const BRAND = {
  name: "Proyecto Flatpack",
  whatsappNumber: "59162137080",
  email: "",
  primary: "#000000",
  secondary: "#dd0000",
  accent: "#ffcc00",
  cityDefault: "Santa Cruz de la Sierra",
};

const USD_TO_BOB = 6.96;
const SHIPPING_RATES_BOB = {
  "Santa Cruz de la Sierra": 60,
  "La Paz": 75,
  "Cochabamba": 70,
  "El Alto": 75,
  "Tarija": 85,
  "Oruro": 80,
  "Potosí": 95,
  "Chuquisaca (Sucre)": 85,
  "Beni (Trinidad)": 90,
  "Pando (Cobija)": 110,
  "Otra ciudad": 120,
};

const PRODUCTS = [
  { id: "kit-ropero-120", name: "Ropero Flatpack 120 cm", subtitle: "2 puertas, multiuso, listo para armar", priceUSD: 179, img: "https://images.unsplash.com/photo-1582582621959-2c0e2b2a51a4?q=80&w=1200&auto=format&fit=crop", features: ["Melamina 18mm premium", "Correderas metálicas", "Manual y tornillería inclusos"], badge: "Más vendido" },
  { id: "kit-closet-180", name: "Closet Flatpack 180 cm", subtitle: "3 puertas, cajones internos", priceUSD: 239, img: "https://images.unsplash.com/photo-1598300042247-3691643eb22d?q=80&w=1200&auto=format&fit=crop", features: ["Optimizador de espacio", "Bisagras soft-close", "Acabado alto brillo"], badge: "Nuevo" },
  { id: "kit-cocina-modular", name: "Módulo de Cocina 80 cm", subtitle: "Base con 2 puertas + cajón", priceUSD: 165, img: "https://images.unsplash.com/photo-1598300175460-fd616f38f5a0?q=80&w=1200&auto=format&fit=crop", features: ["Resistente a humedad", "Patas niveladoras", "Compatible sistema VB16"], badge: "Stock limitado" },
  { id: "kit-rack-tv", name: "Rack TV 150 cm", subtitle: "Moderno, con gestión de cables", priceUSD: 149, img: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=1200&auto=format&fit=crop", features: ["Estilo minimalista", "Montaje rápido", "Acabado anti-rayas"] },
];

const FAQ = [
  { q: "¿Qué incluye cada kit?", a: "Cada kit incluye todas las piezas pre-cortadas, tornillería, herrajes y manual de armado paso a paso." },
  { q: "¿Hacen envíos a todo Bolivia?", a: "Sí. Enviamos a todo el país. El costo varía por ciudad y se calcula en el cotizador." },
  { q: "¿Puedo solicitar armado?", a: "Sí. Ofrecemos servicio de armado opcional en ciudades principales." },
  { q: "¿Qué métodos de pago aceptan?", a: "Transferencia, QR y tarjeta (según disponibilidad en tu ciudad)." },
];

function currency(valueUSD, inUSD) {
  return inUSD ? `$${valueUSD.toFixed(2)} USD` : `${Math.round(valueUSD * USD_TO_BOB)} Bs`;
}

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [qty, setQty] = useState(1);
  const [city, setCity] = useState(BRAND.cityDefault);
  const [assembly, setAssembly] = useState(false);
  const [showUSD, setShowUSD] = useState(true);

  const product = useMemo(() => PRODUCTS.find((p) => p.id === selectedProductId), [selectedProductId]);

  const shippingBOB = (SHIPPING_RATES_BOB[city] ?? SHIPPING_RATES_BOB["Otra ciudad"]);
  const shippingUSD = shippingBOB / USD_TO_BOB;
  const subtotalUSD = product.priceUSD * qty;
  const assemblyUSD = assembly ? subtotalUSD * 0.15 : 0;
  const totalUSD = subtotalUSD + assemblyUSD + shippingUSD;

  const whatsappText = encodeURIComponent(
    `Hola ${BRAND.name}! Quiero cotizar:\n` +
    `Producto: ${product.name}\n` +
    `Cantidad: ${qty}\n` +
    `Ciudad: ${city}\n` +
    `Armado: ${assembly ? "Sí" : "No"}\n` +
    `Subtotal: ${currency(subtotalUSD, true)}\n` +
    `Envío estimado: ${currency(shippingUSD, true)}\n` +
    `Total estimado: ${currency(totalUSD, true)}\n` +
    `¿Me ayudas a coordinar?`
  );
  const whatsappHref = `https://wa.me/${BRAND.whatsappNumber}?text=${whatsappText}`;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="h-1 w-full" style={{ backgroundColor: BRAND.primary }} />
      <div className="h-1 w-full" style={{ backgroundColor: BRAND.secondary }} />
      <div className="h-1 w-full" style={{ backgroundColor: BRAND.accent }} />

      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="w-9 h-9 rounded-xl object-contain bg-white" />
            <div className="font-bold text-lg">{BRAND.name}</div>
            <span className="ml-2 hidden md:inline text-sm text-neutral-500">Landing</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#catalogo" className="px-3 py-2 text-sm rounded-xl hover:bg-neutral-100">Catálogo</a>
            <a href="#como-funciona" className="px-3 py-2 text-sm rounded-xl hover:bg-neutral-100">Cómo funciona</a>
            <a href="#faq" className="px-3 py-2 text-sm rounded-xl hover:bg-neutral-100">FAQ</a>
            <a href={whatsappHref} target="_blank" className="ml-2 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white shadow" style={{ backgroundColor: BRAND.secondary }}>
              <PhoneCall className="w-4 h-4" /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(600px 200px at 20% 0%, ${BRAND.accent}, transparent), radial-gradient(600px 200px at 80% 100%, ${BRAND.secondary}, transparent)` }} />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-4 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-neutral-900 text-white">
              <CheckCircle2 className="w-3.5 h-3.5" /> Stock disponible • Entrega 48–72 h
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              Muebles en caja (Flatpack) listos para armar
            </h1>
            <p className="mt-4 text-neutral-600 text-lg">
              Ahorra tiempo y dinero con diseños modernos, resistentes y fáciles de montar. Compra, recibe y arma. Así de simple.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={whatsappHref} target="_blank" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white shadow-lg" style={{ backgroundColor: BRAND.secondary }}>
                Cotizar ahora <ChevronRight className="w-4 h-4" />
              </a>
              <a href="#catalogo" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold border border-neutral-300 hover:bg-white">
                Ver catálogo
              </a>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-neutral-700">
              <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Garantía 12 meses</li>
              <li className="flex items-center gap-2"><Truck className="w-4 h-4" /> Envíos a todo Bolivia</li>
              <li className="flex items-center gap-2"><Wrench className="w-4 h-4" /> Manual y herrajes incluidos</li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> Armado en 30–90 min</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img src={PRODUCTS[0].img} alt="Kit flatpack" className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-2 rounded-xl text-sm shadow flex items-center gap-2">
                <Package className="w-4 h-4" /> Listo para envío
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="cotizador" className="border-y bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-4 py-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Cotizador rápido</h2>
            <p className="mt-2 text-neutral-600">Elige un modelo, tu ciudad y si deseas servicio de armado. Verás el total estimado al instante.</p>

            <div className="mt-6 grid gap-4">
              <label className="text-sm font-semibold">Modelo</label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PRODUCTS.map((p) => (
                  <button key={p.id} onClick={() => setSelectedProductId(p.id)} className={`text-left rounded-2xl border p-3 transition shadow-sm hover:shadow ${selectedProductId === p.id ? "border-neutral-900" : "border-neutral-200"}`}>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-neutral-500">{p.subtitle}</div>
                    <div className="mt-2 text-sm font-bold">{currency(p.priceUSD, showUSD)}</div>
                    {p.badge && (<span className="mt-2 inline-flex text-[10px] font-semibold px-2 py-1 rounded-full bg-neutral-900 text-white">{p.badge}</span>)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold">Cantidad</label>
                  <input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold">Ciudad</label>
                  <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2">
                    {Object.keys(SHIPPING_RATES_BOB).map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
              </div>

              <label className="inline-flex items-center gap-2 mt-2">
                <input type="checkbox" checked={assembly} onChange={(e) => setAssembly(e.target.checked)} />
                <span>Agregar servicio de armado (+15%)</span>
              </label>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-neutral-600">Moneda:</span>
                <button onClick={() => setShowUSD(true)} className={`px-3 py-1 rounded-full text-sm border ${showUSD ? "bg-neutral-900 text-white" : "bg-white"}`}>USD</button>
                <button onClick={() => setShowUSD(false)} className={`px-3 py-1 rounded-full text-sm border ${!showUSD ? "bg-neutral-900 text-white" : "bg-white"}`}>Bs</button>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sticky top-24">
              <h3 className="text-lg font-bold">Resumen</h3>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between"><span>Producto</span><span>{product.name}</span></div>
                <div className="flex justify-between"><span>Cantidad</span><span>{qty}</span></div>
                <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotalUSD, showUSD)}</span></div>
                <div className="flex justify-between"><span>Armado</span><span>{assembly ? currency(assemblyUSD, showUSD) : "—"}</span></div>
                <div className="flex justify-between"><span>Envío</span><span>{currency(shippingUSD, showUSD)}</span></div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg"><span>Total estimado</span><span>{currency(totalUSD, showUSD)}</span></div>
              </div>
              <a href={whatsappHref} target="_blank" className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white shadow-lg" style={{ backgroundColor: BRAND.secondary }}>
                <PhoneCall className="w-4 h-4" /> Solicitar cotización por WhatsApp
              </a>
              <p className="mt-3 text-xs text-neutral-500">*Precios referenciales. Confirmaremos disponibilidad, colores y tiempos de entrega.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogo" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold">Catálogo destacado</h2>
          <p className="mt-2 text-neutral-600">Modelos listos para entrega rápida. Más diseños disponibles bajo pedido.</p>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="rounded-3xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-md transition">
                <div className="relative aspect-[4/3]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  {p.badge && (<span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] font-semibold px-2 py-1 rounded-full">{p.badge}</span>)}
                </div>
                <div className="p-4">
                  <div className="font-bold">{p.name}</div>
                  <div className="text-sm text-neutral-500">{p.subtitle}</div>
                  <div className="mt-2 text-sm font-bold">{currency(p.priceUSD, showUSD)}</div>
                  <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                    {p.features.map((f, idx) => (<li key={idx} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {f}</li>))}
                  </ul>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setSelectedProductId(p.id)} className="flex-1 rounded-xl border px-3 py-2 text-sm">Calcular</button>
                    <a href={whatsappHref} target="_blank" className="flex-1 text-center rounded-xl px-3 py-2 text-sm text-white" style={{ backgroundColor: BRAND.secondary }}>Comprar</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold">¿Por qué elegir Flatpack?</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-6">
            <div className="rounded-3xl bg-white p-6 border border-neutral-200 shadow-sm">
              <Truck className="w-6 h-6" />
              <h3 className="mt-3 font-bold">Entrega rápida</h3>
              <p className="text-sm text-neutral-600 mt-1">Envíos a todo Bolivia. Optimizado para transportar sin daños.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-neutral-200 shadow-sm">
              <Wrench className="w-6 h-6" />
              <h3 className="mt-3 font-bold">Armado sencillo</h3>
              <p className="text-sm text-neutral-600 mt-1">Manual claro y herrajes incluidos. Opcional: servicio de armado.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-neutral-200 shadow-sm">
              <Shield className="w-6 h-6" />
              <h3 className="mt-3 font-bold">Durabilidad real</h3>
              <p className="text-sm text-neutral-600 mt-1">Melaminas premium y herrajes confiables como sistema VB16.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-neutral-200 shadow-sm">
              <Package className="w-6 h-6" />
              <h3 className="mt-3 font-bold">Costo eficiente</h3>
              <p className="text-sm text-neutral-600 mt-1">Mejor precio por logística optimizada y producción CNC.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold">Cómo funciona</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-6">
            {["Elige tu modelo", "Confirmamos colores y medidas", "Pago y envío", "Arma y disfruta"].map((step, i) => (
              <div key={i} className="rounded-3xl border border-neutral-200 p-6 bg-neutral-50">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: BRAND.secondary }}>{i+1}</div>
                <h3 className="mt-3 font-bold">{step}</h3>
                <p className="text-sm text-neutral-600 mt-1">Acompañamos todo el proceso para que sea simple, rápido y seguro.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold">Clientes felices</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="rounded-3xl bg-white p-6 border border-neutral-200 shadow-sm">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (<Star key={j} className="w-4 h-4 fill-neutral-900 text-neutral-900" />))}
                </div>
                <p className="mt-3 text-sm text-neutral-700">“Excelente calidad y el armado fue más fácil de lo que imaginé. Llegó rápido y en perfecto estado.”</p>
                <div className="mt-3 text-xs text-neutral-500">María G., Bolivia</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-bold">Preguntas frecuentes</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {FAQ.map((item, idx) => (
              <div key={idx} className="rounded-3xl border border-neutral-200 p-6 bg-neutral-50">
                <div className="font-bold">{item.q}</div>
                <p className="text-sm text-neutral-700 mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-neutral-900 text-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-bold text-lg">{BRAND.name}</div>
            <p className="text-sm text-neutral-400 mt-2">Muebles listos para armar, con envío a todo el país.</p>
          </div>
          <div>
            <div className="font-bold">Contacto</div>
            <ul className="mt-2 text-sm">
              <li>WhatsApp: <a className="underline" href={whatsappHref} target="_blank">+{BRAND.whatsappNumber}</a></li>
              {BRAND.email && <li>Email: <a className="underline" href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>}
            </ul>
          </div>
          <div>
            <div className="font-bold">Links</div>
            <ul className="mt-2 text-sm">
              <li><a className="underline" href="#catalogo">Catálogo</a></li>
              <li><a className="underline" href="#cotizador">Cotizador</a></li>
              <li><a className="underline" href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="text-xs text-neutral-500 text-center pb-6">© {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}
