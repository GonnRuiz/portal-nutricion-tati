-- ============================================================
-- SEED: Datos de demostración
-- ============================================================
-- NOTA: Los usuarios de auth.users deben crearse desde
-- el dashboard de Supabase (Authentication > Users > Add User)
-- o mediante la API de Supabase Management.
--
-- Crear estos usuarios manualmente:
--   1. admin@nutrivida.com / admin123   (rol: admin)
--   2. paciente@demo.com / demo123      (rol: patient)
--
-- Luego de crearlos, reemplazar los UUID de abajo con los IDs reales.
-- ============================================================

-- ----------------------------------------
-- BLOG POSTS
-- ----------------------------------------
INSERT INTO blog_posts (id, author_id, title, slug, category, excerpt, content, image_url, read_time, status) VALUES
  ('b0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', '5 Superalimentos para Aumentar tu Energía', 'superalimentos-energia', 'Nutrición', 'Descubre los alimentos que te ayudarán a mantenerte activo y lleno de energía durante todo el día...', '<h2>¿Qué son los superalimentos?</h2><p>Los superalimentos son alimentos naturales que concentran una cantidad excepcional de nutrientes.</p>', '/images/blog-article-1.jpg', '5 min', 'publicado'),
  ('b0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'La Importancia de la Hidratación Diaria', 'hidratacion-diaria', 'Hábitos Saludables', 'El agua es esencial para casi todas las funciones de nuestro cuerpo.', '<h2>¿Por qué es importante la hidratación?</h2><p>El agua constituye aproximadamente el 60% de nuestro cuerpo.</p>', '/images/blog-article-2.jpg', '4 min', 'publicado'),
  ('b0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'Meal Prep: Organiza tus Comidas Semanales', 'meal-prep-semanal', 'Meal Prep', 'La planificación de comidas es clave para mantener una alimentación saludable.', '<h2>¿Qué es el Meal Prep?</h2><p>El meal prep consiste en dedicar tiempo a preparar las comidas de la semana.</p>', '/images/blog-article-3.jpg', '6 min', 'publicado');

-- ----------------------------------------
-- TESTIMONIALS
-- ----------------------------------------
INSERT INTO testimonials (id, patient_id, name, text, image_url, rating, visible) VALUES
  ('t0000000-0000-0000-0000-000000000001', NULL, 'Laura Martínez', 'María cambió completamente mi relación con la comida. Perdí 12 kilos en 6 meses de forma saludable.', '/images/testimonial-1.jpg', 5, true),
  ('t0000000-0000-0000-0000-000000000002', NULL, 'Carlos Rodríguez', 'Llevaba años luchando con mi peso y nada funcionaba. El plan de María fue el primero que realmente se adaptó a mi vida.', '/images/testimonial-2.jpg', 5, true),
  ('t0000000-0000-0000-0000-000000000003', NULL, 'Ana Fernández', 'Como persona con intolerancias alimentarias, encontrar una nutricionista que entienda fue un alivio.', '/images/testimonial-3.jpg', 5, true);

-- ----------------------------------------
-- WEIGHT HISTORY (demo data for patient)
-- ----------------------------------------
-- INSERT INTO weight_logs (patient_id, weight_kg, logged_at) VALUES
--   ('<patient_uuid>', 75.0, '2025-01-06'),
--   ('<patient_uuid>', 74.2, '2025-01-13'),
--   ('<patient_uuid>', 73.8, '2025-01-20'),
--   ('<patient_uuid>', 73.1, '2025-01-27'),
--   ('<patient_uuid>', 72.5, '2025-02-03'),
--   ('<patient_uuid>', 71.9, '2025-02-10'),
--   ('<patient_uuid>', 71.4, '2025-02-17'),
--   ('<patient_uuid>', 70.8, '2025-02-24');
