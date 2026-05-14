# Nutrición Tatí

Portal profesional para la Lic. Tatiana Castel. Sistema de gestión de pacientes, turnos, planes alimentarios y blog, especializado en alimentación **libre de gluten** y **antiinflamatoria**.

**Sitio en vivo:** https://gonnruiz.github.io/tati-nutricion-singluten/

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS (paleta pastel rosa/menta)
- **Backend:** Supabase (PostgreSQL + Auth + RLS)
- **Router:** HashRouter (compatible con GitHub Pages SPA)
- **Gráficos:** Recharts (evolución de peso)
- **Deploy:** GitHub Pages (automático via GitHub Actions)

## Funcionalidades

### Público
- Landing page con hero, servicios, sobre mí, blog, testimonios y CTA
- Blog con artículos, categorías y paginación
- Registro e inicio de sesión

### Paciente (dashboard)
- Resumen con estadísticas, evolución de peso y menú del día
- Plan nutricional semanal con comidas y macros
- Reserva de turnos con calendario
- Datos personales y de salud

### Administrador
- **Gestión de pacientes**: alta, visualización, activación/desactivación y eliminación. Tabla con IMC y categoría.
- **Ficha clínica**: peso, altura, IMC, cálculos antropométricos (peso ideal, rangos saludables), **gráfico de evolución de peso** y **estudios/análisis**.
- **Plan alimentario**: asignación de plan con calorías y desglose de comidas.
- **Gestión de turnos**: lista de turnos con estados (pendiente, confirmada, cancelada).
- **Gestión de blog**: CRUD completo de artículos.

## Estructura del proyecto

```
tati-nutricion-singluten/
├── app/                        # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/         # Componentes UI (Navbar, Footer, Layout)
│   │   ├── contexts/           # AuthContext (login mock)
│   │   ├── data/               # Mock data
│   │   │   ├── mockData.ts     # Blog, testimonios, planes
│   │   │   └── admin/          # Datos del panel admin
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utilidades (cn, img, adminHelpers)
│   │   ├── pages/              # Páginas del portal
│   │   └── types/              # Tipos TypeScript compartidos
│   ├── public/images/          # Imágenes del sitio
│   ├── .env.example            # Template de credenciales
│   └── tailwind.config.js      # Config de colores pastel
├── supabase/
│   ├── migrations/             # Migraciones SQL individuales
│   └── setup-completo.sql      # Setup todo-en-uno (recomendado)
└── .github/workflows/          # CI/CD (deploy a GitHub Pages)
```

## Setup local

```bash
# 1. Instalar dependencias
cd app
npm install

# 2. Configurar credenciales
cp .env.example .env
# Editar .env con tus valores reales

# 3. Iniciar dev server
npm run dev
# Abre http://localhost:3000
```

## Supabase (base de datos)

### Setup rápido (recomendado)

1. Andá a **SQL Editor** en tu proyecto Supabase
2. Copiá y ejecutá el contenido de `supabase/setup-completo.sql`
3. Eso crea: 11 tablas con RLS, 2 usuarios de prueba, datos demo (blog, testimonios, peso)

### Esquema de tablas

| Tabla | Propósito |
|---|---|
| `profiles` | Extiende auth.users: datos personales, salud, preferencias alimentarias (gluten_free), nivel de actividad |
| `blog_posts` | Artículos del blog con slug, categoría y estado |
| `appointments` | Turnos con tipo, precio, estado |
| `nutrition_plans` | Planes alimentarios por paciente |
| `nutrition_weeks/days/meals` | Desglose semanal de comidas con macros |
| `meal_completions` | Tracking de comidas cumplidas |
| `weight_logs` | Histórico de peso |
| `activity_logs` | Registro de actividad física |
| `testimonials` | Testimonios públicos |

### Usuarios de prueba

| Email | Contraseña | Rol |
|---|---|---|
| admin@nutrivida.com | admin123 | Administradora |
| paciente@demo.com | demo123 | Paciente |

## Deploy a GitHub Pages

El deploy es automático. Cada push a `main` ejecuta el workflow `.github/workflows/deploy-gh-pages.yml`.

**Requisito:** Settings > Pages > Source: **GitHub Actions**

## Demo credentials (sin Supabase)

Mientras no conectes Supabase Auth, usá estos usuarios hardcodeados:

- **Admin:** `admin@nutrivida.com` / `admin123` → Panel admin en `/#/admin`
- **Paciente:** `paciente@demo.com` / `demo123` → Dashboard en `/#/dashboard`
