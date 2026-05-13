-- ============================================================
-- Portal Nutrición Tatí — Esquema de Base de Datos
-- ============================================================

-- 0. ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('patient', 'admin');
CREATE TYPE appointment_status AS ENUM ('pendiente', 'confirmada', 'cancelada', 'completada');
CREATE TYPE appointment_type AS ENUM ('primera_consulta', 'seguimiento', 'express');
CREATE TYPE blog_status AS ENUM ('borrador', 'publicado');
CREATE TYPE plan_status AS ENUM ('activo', 'inactivo', 'completado');
CREATE TYPE activity_level AS ENUM ('sedentario', 'ligero', 'moderado', 'activo', 'muy_activo');

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================

CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        user_role NOT NULL DEFAULT 'patient',
  name        TEXT NOT NULL,
  phone       TEXT,
  avatar_url  TEXT,
  birth_date  DATE,
  gender      TEXT,
  address     TEXT,
  height_cm   NUMERIC(5,1),              -- altura en cm
  weight_initial_kg NUMERIC(5,1),        -- peso inicial
  weight_target_kg  NUMERIC(5,1),        -- peso objetivo

  -- Preferencias alimentarias
  gluten_free    BOOLEAN NOT NULL DEFAULT false,  -- sin TACC / libre de gluten
  dairy_free     BOOLEAN NOT NULL DEFAULT false,
  vegetarian     BOOLEAN NOT NULL DEFAULT false,
  vegan          BOOLEAN NOT NULL DEFAULT false,
  allergies      TEXT,                              -- descripción libre de alergias
  conditions     TEXT[],                            -- condiciones médicas (array)

  -- Nivel de actividad física
  activity_level   activity_level DEFAULT 'sedentario',
  activity_notes   TEXT,              -- notas adicionales (ej. "entrena para media maratón")

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- trigger: updated_at
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_self_select"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_admin_select"
  ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "profiles_self_update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_admin_insert"
  ON profiles FOR INSERT
  WITH CHECK (
    auth.uid() = id
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================================
-- 2. BLOG POSTS
-- ============================================================

CREATE TABLE blog_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  category    TEXT NOT NULL,
  excerpt     TEXT,
  content     TEXT NOT NULL,
  image_url   TEXT,
  read_time   TEXT,              -- ej. "5 min"
  status      blog_status NOT NULL DEFAULT 'borrador',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_posts_public_select"
  ON blog_posts FOR SELECT
  USING (status = 'publicado');

CREATE POLICY "blog_posts_admin_all"
  ON blog_posts FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 3. APPOINTMENTS
-- ============================================================

CREATE TABLE appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  type            appointment_type NOT NULL DEFAULT 'seguimiento',
  price           NUMERIC(6,2),
  notes           TEXT,
  status          appointment_status NOT NULL DEFAULT 'pendiente',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);

CREATE TRIGGER trg_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "appointments_patient_select"
  ON appointments FOR SELECT
  USING (patient_id = auth.uid());

CREATE POLICY "appointments_admin_all"
  ON appointments FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "appointments_patient_insert"
  ON appointments FOR INSERT
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "appointments_patient_cancel"
  ON appointments FOR UPDATE
  USING (patient_id = auth.uid() AND status = 'pendiente')
  WITH CHECK (patient_id = auth.uid() AND status = 'cancelada');

-- ============================================================
-- 4. NUTRITION PLANS
-- ============================================================

CREATE TABLE nutrition_plans (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  description   TEXT,
  start_date    DATE,
  end_date      DATE,
  status        plan_status NOT NULL DEFAULT 'inactivo',
  daily_calorie_target INT,                     -- ej. 1500
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_nutrition_plans_patient ON nutrition_plans(patient_id);

CREATE TRIGGER trg_nutrition_plans_updated_at
  BEFORE UPDATE ON nutrition_plans
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE nutrition_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nutrition_plans_patient_select"
  ON nutrition_plans FOR SELECT
  USING (patient_id = auth.uid());

CREATE POLICY "nutrition_plans_admin_all"
  ON nutrition_plans FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 4b. PLAN WEEKS

CREATE TABLE nutrition_weeks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id       UUID NOT NULL REFERENCES nutrition_plans(id) ON DELETE CASCADE,
  week_number   INT NOT NULL CHECK (week_number >= 1),
  UNIQUE(plan_id, week_number)
);

ALTER TABLE nutrition_weeks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nutrition_weeks_read"
  ON nutrition_weeks FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM nutrition_plans WHERE id = plan_id AND patient_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "nutrition_weeks_admin_all"
  ON nutrition_weeks FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 4c. PLAN DAYS

CREATE TABLE nutrition_days (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id     UUID NOT NULL REFERENCES nutrition_weeks(id) ON DELETE CASCADE,
  day_name    TEXT NOT NULL CHECK (day_name IN ('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo')),
  UNIQUE(week_id, day_name)
);

ALTER TABLE nutrition_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nutrition_days_read"
  ON nutrition_days FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM nutrition_weeks w JOIN nutrition_plans p ON p.id = w.plan_id WHERE w.id = week_id AND p.patient_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "nutrition_days_admin_all"
  ON nutrition_days FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 4d. MEALS

CREATE TABLE nutrition_meals (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id        UUID NOT NULL REFERENCES nutrition_days(id) ON DELETE CASCADE,
  meal_time     TEXT NOT NULL,         -- ej. "7:00 AM"
  name          TEXT NOT NULL,
  description   TEXT,
  calories      INT,
  protein_g     NUMERIC(5,1),
  carbs_g       NUMERIC(5,1),
  fats_g        NUMERIC(5,1),
  sort_order    INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE nutrition_meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nutrition_meals_read"
  ON nutrition_meals FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM nutrition_days d
      JOIN nutrition_weeks w ON w.id = d.week_id
      JOIN nutrition_plans p ON p.id = w.plan_id
      WHERE d.id = day_id AND p.patient_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "nutrition_meals_admin_all"
  ON nutrition_meals FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 4e. MEAL COMPLETION TRACKING (by patient)

CREATE TABLE meal_completions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_id     UUID NOT NULL REFERENCES nutrition_meals(id) ON DELETE CASCADE,
  patient_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  completed_on DATE NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(meal_id, patient_id, completed_on)
);

ALTER TABLE meal_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "meal_completions_self"
  ON meal_completions FOR ALL
  USING (patient_id = auth.uid())
  WITH CHECK (patient_id = auth.uid());

-- ============================================================
-- 5. WEIGHT LOGS
-- ============================================================

CREATE TABLE weight_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  weight_kg   NUMERIC(5,1) NOT NULL,
  logged_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes       TEXT
);

CREATE INDEX idx_weight_logs_patient ON weight_logs(patient_id);
CREATE INDEX idx_weight_logs_date ON weight_logs(logged_at);

ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "weight_logs_patient_select"
  ON weight_logs FOR SELECT
  USING (patient_id = auth.uid());

CREATE POLICY "weight_logs_patient_insert"
  ON weight_logs FOR INSERT
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "weight_logs_admin_all"
  ON weight_logs FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 6. PHYSICAL ACTIVITY LOGS
-- ============================================================

CREATE TABLE activity_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,         -- ej. "carrera", "natación", "crossfit"
  duration_min  INT NOT NULL,
  intensity     TEXT,                  -- ej. "baja", "media", "alta"
  notes         TEXT,
  logged_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_logs_patient ON activity_logs(patient_id);
CREATE INDEX idx_activity_logs_date ON activity_logs(logged_at);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "activity_logs_patient_all"
  ON activity_logs FOR ALL
  USING (patient_id = auth.uid())
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "activity_logs_admin_all"
  ON activity_logs FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 7. TESTIMONIALS
-- ============================================================

CREATE TABLE testimonials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name        TEXT NOT NULL,
  text        TEXT NOT NULL,
  image_url   TEXT,
  rating      INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  visible     BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials_public_select"
  ON testimonials FOR SELECT
  USING (visible = true);

CREATE POLICY "testimonials_admin_all"
  ON testimonials FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- 8. HELPER: CREATE PROFILE ON SIGNUP (trigger on auth.users)
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, name)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'patient'),
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER trg_after_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
