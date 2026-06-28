# autonomiareal.com

Web de autoridad sobre la **autonomía real** de la micromovilidad eléctrica (bicis plegables y patines).
El catálogo promete el doble; aquí se publica lo que reportan reseñas y propietarios, con fuente.

## Cómo funciona

Todo sale de un único archivo de datos: [`src/data/ebikes.json`](src/data/ebikes.json).
Desde ahí, Astro genera automáticamente:

- La **home** con la tabla comparativa y la calculadora (`src/pages/index.astro`).
- Una **ficha por modelo** (`/bici/<slug>`), con fuentes citadas.
- Una **comparativa "A vs B"** por cada pareja de modelos (`/comparar/<a>-vs-<b>`).
  Con 6 modelos son 15 páginas; con 20 modelos serían 190, sin escribir ninguna a mano.

Añadir un modelo = añadir un objeto al JSON. Las páginas nuevas aparecen solas.

## Campos del dataset

| Campo | Qué es |
|---|---|
| `bateria_wh`, `peso_kg`, `motor_w`, `par_nm` | Specs verificadas |
| `autonomia_catalogo_km` | Lo que anuncia el fabricante |
| `autonomia_real_min_km` / `_max_km` | Rango real reportado (`null` si no hay dato fiable) |
| `calidad_dato` | De dónde sale el dato real (review pro, propietario, etc.) |
| `fuentes` | URLs para que el lector lo compruebe |
| `afiliado_url` | Enlace de afiliado (de momento `#`) |

## Comandos

```bash
npm install
npm run dev      # servidor local
npm run build    # genera el sitio estático en dist/
```

## Pendiente

- Rellenar más modelos en el dataset (el grueso del trabajo).
- Sustituir `afiliado_url: "#"` por enlaces reales (Awin / Tradedoubler / Amazon).
- Conectar dominio y desplegar (Cloudflare Pages o Vercel, gratis).
