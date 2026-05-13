# Portal Nutrición Tatí

Portal de paciente para consultas nutricionales con panel de administración, blog y reservas online.

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + RLS)
- **Deploy:** GitHub Pages (automático via GitHub Actions)

## Estructura

```
portal-nutricion-tati/
├── app/                    # Frontend (Vite + React)
│   ├── src/
│   │   ├── components/     # Componentes UI y layout
│   │   ├── contexts/       # AuthContext
│   │   ├── data/           # Mock data (ejemplos)
│   │   └── pages/          # Páginas del portal
│   ├── .env                # Credenciales (NO se sube)
│   └── .env.example        # Template de credenciales
├── supabase/
│   ├── migrations/         # Migraciones SQL
│   └── seed.sql            # Datos de prueba
└── .github/workflows/      # CI/CD
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

### Migraciones

Las migraciones se aplican desde la consola SQL de Supabase o usando la CLI:

```bash
supabase link --project-ref cffcsmyllefepggpcozv
supabase db push
```

O simplemente copiá el contenido de `supabase/migrations/` al editor SQL de tu proyecto Supabase.

### Seed data

Ejecutá `supabase/seed.sql` en el editor SQL de Supabase para cargar datos de demostración.

### Usuarios de prueba

Crearlos desde **Authentication > Users > Add User** en el dashboard de Supabase:

| Email | Contraseña | Rol |
|---|---|---|
| admin@nutrivida.com | admin123 | admin |
| paciente@demo.com | demo123 | patient |

## Deploy a GitHub Pages

El deploy es automático. Cada push a `main` ejecuta el workflow `.github/workflows/deploy-gh-pages.yml`.

**Requisito:** Ir a Settings > Pages > Source: **GitHub Actions** en el repo.

El sitio queda disponible en:
```
https://gonnruiz.github.io/portal-nutricion-tati/
```

## Demo credentials (mock local)

Mientras no conectes Supabase Auth, podés usar estos usuarios hardcodeados:

- **Paciente:** paciente@demo.com / demo123
- **Admin:** admin@nutrivida.com / admin123
