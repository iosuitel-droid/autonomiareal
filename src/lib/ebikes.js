import data from '../data/ebikes.json';

export const productos = data;
export const ebikes = data;

export const CATEGORIAS = [
  { slug: 'bicis', nombre: 'Bicis eléctricas plegables', singular: 'bici', intro: 'El catálogo promete 100-130 km. Lo que reportan propietarios y reseñas: casi siempre la mitad.' },
  { slug: 'patines', nombre: 'Patines eléctricos', singular: 'patín', intro: 'Donde más se infla la autonomía: anuncian 35-70 km y la realidad ronda los 20-50.' },
];

export function categoriaInfo(slug) {
  return CATEGORIAS.find((c) => c.slug === slug);
}

export function porCategoria(cat) {
  return data.filter((p) => p.categoria === cat);
}

export function getProducto(slug) {
  return data.find((p) => p.slug === slug);
}

export function rangoReal(b) {
  if (b.autonomia_real_min_km == null || b.autonomia_real_max_km == null) return 'sin datos';
  if (b.autonomia_real_min_km === b.autonomia_real_max_km) return `~${b.autonomia_real_min_km} km`;
  return `~${b.autonomia_real_min_km}-${b.autonomia_real_max_km} km`;
}

export function realMedia(b) {
  if (b.autonomia_real_min_km == null || b.autonomia_real_max_km == null) return null;
  return (b.autonomia_real_min_km + b.autonomia_real_max_km) / 2;
}

export function porcentajeCumplido(b) {
  const media = realMedia(b);
  if (media == null || !b.autonomia_catalogo_km) return null;
  return Math.round((media / b.autonomia_catalogo_km) * 100);
}

export function motor(b) {
  return b.par_nm == null ? `${b.motor_w} W` : `${b.motor_w} W · ${b.par_nm} Nm`;
}

export function precio(b) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(b.precio_eur);
}

export function ordenadaPorReal(items) {
  return [...items].sort((a, b) => (b.autonomia_real_max_km ?? -1) - (a.autonomia_real_max_km ?? -1));
}

// Parejas únicas DENTRO de una categoría (no se comparan bicis con patines).
export function parejas(cat) {
  const items = porCategoria(cat);
  const out = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      out.push([items[i], items[j]]);
    }
  }
  return out;
}

export function todasParejas() {
  return CATEGORIAS.flatMap((c) => parejas(c.slug));
}

export const COLECCIONES = [
  { slug: 'mas-autonomia-real', nav: 'Por autonomía real', h1: 'autonomía real, de más a menos', intro: 'Ordenados por la autonomía real reportada, no por la del catálogo.' },
  { slug: 'mas-ligeras', nav: 'Por peso', h1: 'peso, de más ligero a más pesado', intro: 'Del modelo más ligero al más pesado. Clave si lo subes a casa o al transporte público.' },
  { slug: 'mas-baratas', nav: 'Por precio', h1: 'precio, de más barato a más caro', intro: 'Del más barato al más caro, con su autonomía real al lado para ver qué compensa.' },
];

export function ordenarColeccion(items, slug) {
  const arr = [...items];
  if (slug === 'mas-autonomia-real') return arr.sort((a, b) => (realMedia(b) ?? -1) - (realMedia(a) ?? -1));
  if (slug === 'mas-ligeras') return arr.sort((a, b) => a.peso_kg - b.peso_kg);
  if (slug === 'mas-baratas') return arr.sort((a, b) => a.precio_eur - b.precio_eur);
  return arr;
}

export function todasColecciones() {
  return CATEGORIAS.flatMap((c) => COLECCIONES.map((col) => ({ cat: c, col })));
}
