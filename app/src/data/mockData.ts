export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  image: string;
  rating: number;
}

export interface Meal {
  time: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  completed?: boolean;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}

export interface WeekPlan {
  week: number;
  days: DayPlan[];
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Laura Martínez',
    text: 'Cuando me diagnosticaron celiaquía pensé que no volvería a comer rico. Tatiana me demostró que estaba equivocada. Su plan no solo es libre de gluten, sino delicioso y variado.',
    image: '/images/testimonial-1.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    text: 'Dejé el gluten por recomendación médica y no sabía por dónde empezar. Tatiana me guió en todo el proceso, con mucha paciencia y conocimiento. Hoy me siento mejor que nunca.',
    image: '/images/testimonial-2.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: 'Ana Fernández',
    text: 'Además de celíaca, tengo problemas inflamatorios. Tatiana combinó ambas cosas en un plan antiinflamatorio sin gluten que cambió mi vida. Y encima entiende porque lo vive en primera persona.',
    image: '/images/testimonial-3.jpg',
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Superalimentos para Aumentar tu Energía',
    slug: 'superalimentos-energia',
    category: 'Nutrición',
    date: '15 de marzo, 2025',
    image: '/images/blog-article-1.jpg',
    excerpt: 'Descubre los alimentos que te ayudarán a mantenerte activo y lleno de energía durante todo el día...',
    readTime: '5 min',
    content: `
<h2>¿Qué son los superalimentos?</h2>
<p>Los superalimentos son alimentos naturales que concentran una cantidad excepcional de nutrientes beneficiosos para la salud. A diferencia de los suplementos sintéticos, estos alimentos proporcionan vitaminas, minerales, antioxidantes y compuestos bioactivos en su forma más biodisponible.</p>

<h2>1. Quinoa: El grano completo</h2>
<p>La quinoa es considerada uno de los granos más nutritivos del planeta. Contiene los nueve aminoácidos esenciales, lo que la convierte en una proteína completa ideal para vegetarianos y veganos. Además, es rica en fibra, magnesio, hierro y manganeso.</p>
<p>Una taza de quinoa cocida proporciona aproximadamente 8 gramos de proteína y 5 gramos de fibra, ayudando a mantener la saciedad y estabilizar los niveles de azúcar en sangre.</p>

<h2>2. Aguacate: La grasa saludable</h2>
<p>El aguacate es una fuente excepcional de grasas monoinsaturadas, similares a las del aceite de oliva. Estas grasas son fundamentales para la salud cardiovascular y cerebral. También contiene más potasio que los plátanos, vitamina K, vitamina E y vitaminas del complejo B.</p>

<h2>3. Arándanos: Antioxidantes en pequeño formato</h2>
<p>Los arándanos son conocidos por su alto contenido de antioxidantes, especialmente flavonoides. Estudios han demostrado que consumir arándanos regularmente puede mejorar la función cognitiva, reducir la inflamación y proteger contra el estrés oxidativo.</p>

<h2>4. Kale: El rey de las verduras de hoja verde</h2>
<p>La kale o col rizada es una de las verduras más nutritivas que existen. Es increíblemente rica en vitaminas A, C y K, así como en calcio, potasio y manganeso. Una taza de kale cruda contiene más vitamina C que una naranja.</p>

<h2>5. Chía: Pequeñas semillas, grandes beneficios</h2>
<p>Las semillas de chía son una excelente fuente de omega-3, fibra y proteína. Cuando se mezclan con líquido, forman un gel que ayuda a mantener la hidratación y proporciona una sensación de saciedad duradera.</p>

<h2>¿Cómo incorporarlos a tu dieta?</h2>
<ul>
<li><strong>Desayuno:</strong> Avena con arándanos, chía y nueces</li>
<li><strong>Almuerzo:</strong> Ensalada de quinoa con aguacate y kale</li>
<li><strong>Cena:</strong> Salmón con kale salteada y quinoa</li>
<li><strong>Colación:</strong> Batido de arándanos con chía</li>
</ul>

<blockquote>Recuerda que no existe un alimento mágico. La clave está en la variedad y el equilibrio de tu alimentación.</blockquote>
    `,
  },
  {
    id: '2',
    title: 'La Importancia de la Hidratación Diaria',
    slug: 'hidratacion-diaria',
    category: 'Hábitos Saludables',
    date: '10 de marzo, 2025',
    image: '/images/blog-article-2.jpg',
    excerpt: 'El agua es esencial para casi todas las funciones de nuestro cuerpo. Aprende cuánto necesitas y cómo lograrlo...',
    readTime: '4 min',
    content: `
<h2>¿Por qué es tan importante la hidratación?</h2>
<p>El agua constituye aproximadamente el 60% de nuestro cuerpo y participa en prácticamente todas las funciones vitales: desde la regulación de la temperatura corporal hasta el transporte de nutrientes y la eliminación de desechos.</p>

<h2>Señales de deshidratación</h2>
<p>Muchas personas viven en un estado crónico de deshidratación leve sin siquiera darse cuenta. Algunas señales incluyen:</p>
<ul>
<li>Fatiga persistente y falta de energía</li>
<li>Dolor de cabeza frecuente</li>
<li>Piel seca y opaca</li>
<li>Estreñimiento</li>
<li>Dificultad para concentrarse</li>
</ul>

<h2>¿Cuánta agua necesitas?</h2>
<p>Aunque la recomendación clásica es de 8 vasos al día (aproximadamente 2 litros), las necesidades individuales varían según el peso, la actividad física, el clima y otros factores. Una buena regla general es consumir entre 30-35 ml de agua por kilogramo de peso corporal.</p>

<h2>Tips para mantenerte hidratado</h2>
<ul>
<li>Comienza tu día con un vaso grande de agua</li>
<li>Lleva siempre contigo una botella reutilizable</li>
<li>Infunde tu agua con frutas y hierbas para darle sabor</li>
<li>Consume alimentos ricos en agua como sandía, pepino y tomate</li>
<li>Establece recordatorios en tu teléfono</li>
</ul>
    `,
  },
  {
    id: '3',
    title: 'Meal Prep: Organiza tus Comidas Semanales',
    slug: 'meal-prep-semanal',
    category: 'Meal Prep',
    date: '5 de marzo, 2025',
    image: '/images/blog-article-3.jpg',
    excerpt: 'La planificación de comidas es clave para mantener una alimentación saludable. Te enseño cómo empezar...',
    readTime: '6 min',
    content: `
<h2>¿Qué es el Meal Prep?</h2>
<p>El meal prep, o preparación de comidas, consiste en dedicar un bloque de tiempo (generalmente un par de horas en fin de semana) a preparar y organizar las comidas de la semana. Esta práctica no solo ahorra tiempo y dinero, sino que también facilita mantener una alimentación saludable.</p>

<h2>Beneficios del Meal Prep</h2>
<ul>
<li><strong>Ahorro de tiempo:</strong> Cocinar una vez para toda la semana</li>
<li><strong>Control porciones:</strong> Evitas comer de más</li>
<li><strong>Reducción de desperdicio:</strong> Compras solo lo necesario</li>
<li><strong>Ahorro económico:</strong> Menos comidas fuera de casa</li>
<li><strong>Menos estrés:</strong> No tienes que pensar qué cocinar cada día</li>
</ul>

<h2>Herramientas esenciales</h2>
<p>Para comenzar con el meal prep necesitarás:</p>
<ul>
<li>Recipientes de vidrio con tapa hermética</li>
<li>Bolsas reutilizables para congelar</li>
<li>Etiquetas para marcar fechas</li>
<li>Una balanza de cocina</li>
<li>Bandas elásticas para mantener todo organizado</li>
</ul>

<h2>Menú base para una semana</h2>
<p>Aquí te comparto un ejemplo de menú semanal equilibrado:</p>
<ul>
<li><strong>Desayunos:</strong> Avena overnight, huevos revueltos con vegetales, batidos verdes</li>
<li><strong>Almuerzos:</strong> Pollo con arroz y brócoli, salmón con quinoa, ensaladas de garbanzos</li>
<li><strong>Cenas:</strong> Sopas de verduras, wraps de pavo, pescado al horno</li>
</ul>
    `,
  },
  {
    id: '4',
    title: 'Entendiendo los Macronutrientes',
    slug: 'macronutrientes',
    category: 'Nutrición',
    date: '28 de febrero, 2025',
    image: '/images/blog-article-4.jpg',
    excerpt: 'Proteínas, carbohidratos y grasas: aprende qué son y cómo balancearlos en tu alimentación diaria...',
    readTime: '7 min',
    content: `<h2>¿Qué son los macronutrientes?</h2><p>Los macronutrientes son los nutrientes que el cuerpo necesita en grandes cantidades para funcionar correctamente: proteínas, carbohidratos y grasas.</p>`,
  },
  {
    id: '5',
    title: 'Recetas Saludables para el Desayuno',
    slug: 'desayunos-saludables',
    category: 'Recetas',
    date: '20 de febrero, 2025',
    image: '/images/blog-article-5.jpg',
    excerpt: 'Comienza tu día con energía con estas deliciosas y nutritivas opciones de desayuno...',
    readTime: '5 min',
    content: `<h2>El desayuno más importante del día</h2><p>Un buen desayuno establece el tono para el resto del día. Estas recetas son rápidas, nutritivas y deliciosas.</p>`,
  },
  {
    id: '6',
    title: 'Cómo Leer las Etiquetas Nutricionales',
    slug: 'etiquetas-nutricionales',
    category: 'Nutrición',
    date: '15 de febrero, 2025',
    image: '/images/blog-article-6.jpg',
    excerpt: 'Aprende a interpretar la información nutricional de los alimentos que consumes...',
    readTime: '6 min',
    content: `<h2>Descifrando las etiquetas</h2><p>Saber leer las etiquetas nutricionales te empodera para tomar decisiones informadas sobre tu alimentación.</p>`,
  },
  {
    id: '7',
    title: 'Alimentación Antiinflamatoria',
    slug: 'alimentacion-antiinflamatoria',
    category: 'Bienestar',
    date: '10 de febrero, 2025',
    image: '/images/blog-article-7.jpg',
    excerpt: 'Descubre cómo ciertos alimentos pueden ayudar a reducir la inflamación en tu cuerpo...',
    readTime: '5 min',
    content: `<h2>La inflamación crónica</h2><p>La inflamación crónica de bajo grado está relacionada con numerosas enfermedades. La alimentación juega un papel clave en su control.</p>`,
  },
  {
    id: '8',
    title: 'Snacks Saludables para la Oficina',
    slug: 'snacks-oficina',
    category: 'Hábitos Saludables',
    date: '5 de febrero, 2025',
    image: '/images/blog-article-7.jpg',
    excerpt: 'Mantén la energía durante la jornada laboral con estas opciones nutritivas y prácticas...',
    readTime: '4 min',
    content: `<h2>El desafío de la oficina</h2><p>El sedentarismo y el acceso fácil a alimentos ultraprocesados hacen que comer saludable en la oficina sea un reto.</p>`,
  },
  {
    id: '9',
    title: 'La Relación entre el Sueño y la Nutrición',
    slug: 'sueno-nutricion',
    category: 'Bienestar',
    date: '30 de enero, 2025',
    image: '/images/blog-article-8.jpg',
    excerpt: 'Descubre cómo la calidad de tu sueño afecta tu alimentación y viceversa...',
    readTime: '5 min',
    content: `<h2>Sueño y metabolismo</h2><p>La calidad del sueño tiene un impacto directo en las hormonas que regulan el hambre y la saciedad.</p>`,
  },
  {
    id: '10',
    title: 'Proteínas Vegetales: Guía Completa',
    slug: 'proteinas-vegetales',
    category: 'Nutrición',
    date: '25 de enero, 2025',
    image: '/images/blog-article-9.jpg',
    excerpt: 'Todas las opciones de proteína vegetal que necesitas para una dieta balanceada...',
    readTime: '6 min',
    content: `<h2>Fuentes vegetales de proteína</h2><p>Contrario a la creencia popular, es posible obtener proteínas completas de fuentes vegetales.</p>`,
  },
  {
    id: '11',
    title: 'Cómo Reducir el Azúcar en tu Dieta',
    slug: 'reducir-azucar',
    category: 'Hábitos Saludables',
    date: '20 de enero, 2025',
    image: '/images/blog-article-10.jpg',
    excerpt: 'Estrategias prácticas para disminuir el consumo de azúcar sin sacrificar el sabor...',
    readTime: '5 min',
    content: `<h2>El azúcar oculto</h2><p>El azúcar se encuentra en muchos alimentos procesados, incluso en aquellos que no sabemos dulces.</p>`,
  },
  {
    id: '12',
    title: 'Beneficios de la Dieta Mediterránea',
    slug: 'dieta-mediterranea',
    category: 'Bienestar',
    date: '15 de enero, 2025',
    image: '/images/blog-article-11.jpg',
    excerpt: 'Conoce por qué este estilo de alimentación es considerado uno de los más saludables del mundo...',
    readTime: '6 min',
    content: `<h2>Un estilo de vida, no una dieta</h2><p>La dieta mediterránea es mucho más que un plan de alimentación; es un estilo de vida que promueve la salud integral.</p>`,
  },
];

export const nutritionPlan: WeekPlan[] = [
  {
    week: 1,
    days: [
      {
        day: 'Lunes',
        meals: [
          { time: '7:00 AM', name: 'Avena con Frutas', description: '1 taza de avena cocida con leche de almendras, 1/2 plátano en rodajas, 10 fresas, 1 cda de nueces picadas y canela al gusto.', calories: 350, protein: 12, carbs: 55, fats: 10 },
          { time: '10:00 AM', name: 'Yogur Griego con Frutos Rojos', description: '1 taza de yogur griego natural sin azúcar, 1/2 taza de frutos rojos mixtos, 1 cdta de miel.', calories: 180, protein: 15, carbs: 22, fats: 4 },
          { time: '1:00 PM', name: 'Pollo con Quinoa y Vegetales', description: '150g de pechuga de pollo a la plancha, 1 taza de quinoa cocida, 1 taza de brócoli al vapor, 1/2 aguacate.', calories: 480, protein: 35, carbs: 45, fats: 18 },
          { time: '4:00 PM', name: 'Manzana con Almendras', description: '1 manzana mediana con 10 almendras enteras.', calories: 150, protein: 3, carbs: 25, fats: 8 },
          { time: '7:00 PM', name: 'Sopa de Verduras con Pan Integral', description: '1 tazón de sopa de verduras mixtas, 2 rebanadas de pan integral tostado con 1 cdta de aceite de oliva.', calories: 280, protein: 10, carbs: 42, fats: 8 },
        ],
      },
      {
        day: 'Martes',
        meals: [
          { time: '7:00 AM', name: 'Tostadas de Aguacate', description: '2 rebanadas de pan integral con 1/2 aguacate machacado, huevo pochado y semillas de chía.', calories: 380, protein: 14, carbs: 35, fats: 22 },
          { time: '10:00 AM', name: 'Batido Verde', description: 'Espinacas, plátano, leche de almendras, proteína en polvo y mantequilla de almendras.', calories: 220, protein: 18, carbs: 28, fats: 8 },
          { time: '1:00 PM', name: 'Ensalada de Atún', description: 'Atún en agua con mix de verduras, garbanzos, tomate cherry y aderezo de limón.', calories: 420, protein: 32, carbs: 38, fats: 14 },
          { time: '4:00 PM', name: 'Zanahorias con Hummus', description: '1 taza de zanahorias baby con 3 cdas de hummus.', calories: 140, protein: 5, carbs: 20, fats: 6 },
          { time: '7:00 PM', name: 'Salmón al Horno con Espárragos', description: '150g de salmón al horno con limón, 1 taza de espárragos asados, 1/2 taza de arroz integral.', calories: 450, protein: 30, carbs: 35, fats: 22 },
        ],
      },
      {
        day: 'Miércoles',
        meals: [
          { time: '7:00 AM', name: 'Panqueques de Plátano', description: '2 panqueques hechos con plátano machacado, huevos y avena, topping de arándanos.', calories: 340, protein: 12, carbs: 48, fats: 12 },
          { time: '10:00 AM', name: 'Puñado de Nueces Mixtas', description: '30g de nueces mixtas sin sal.', calories: 180, protein: 5, carbs: 6, fats: 16 },
          { time: '1:00 PM', name: 'Wrap de Pavo', description: 'Tortilla integral con pechuga de pavo, lechuga, tomate, mostaza y aguacate.', calories: 380, protein: 25, carbs: 35, fats: 16 },
          { time: '4:00 PM', name: 'Yogur con Granola', description: '1 taza de yogur natural con 2 cdas de granola sin azúcar.', calories: 160, protein: 10, carbs: 22, fats: 5 },
          { time: '7:00 PM', name: 'Pasta de Garbanzos con Vegetales', description: 'Pasta de garbanzos con salsa de tomate casera, espinacas y champiñones.', calories: 420, protein: 18, carbs: 55, fats: 12 },
        ],
      },
      {
        day: 'Jueves',
        meals: [
          { time: '7:00 AM', name: 'Bowl de Smoothie', description: 'Açaí con plátano, leche de coco, topping de granola y coco rallado.', calories: 360, protein: 8, carbs: 52, fats: 16 },
          { time: '10:00 AM', name: 'Huevo Duro con Fruta', description: '2 huevos duros con 1 naranja.', calories: 170, protein: 13, carbs: 15, fats: 8 },
          { time: '1:00 PM', name: 'Pollo al Curry con Arroz', description: '150g de pollo al curry ligero con 3/4 taza de arroz basmati y verduras.', calories: 490, protein: 32, carbs: 52, fats: 16 },
          { time: '4:00 PM', name: 'Edamames', description: '1 taza de edamames cocidos.', calories: 190, protein: 17, carbs: 14, fats: 8 },
          { time: '7:00 PM', name: 'Tacos de Pescado', description: '2 tacos de tortilla de maíz con pescado a la plancha, repollo morado y salsa de yogur.', calories: 360, protein: 28, carbs: 38, fats: 12 },
        ],
      },
      {
        day: 'Viernes',
        meals: [
          { time: '7:00 AM', name: 'Chía Pudding', description: 'Pudding de chía con leche de almendras, vainilla y topping de mango.', calories: 320, protein: 10, carbs: 38, fats: 16 },
          { time: '10:00 AM', name: 'Galletas de Arroz con Aguacate', description: '3 galletas de arroz integral con 1/4 aguacate y semillas de sésamo.', calories: 150, protein: 3, carbs: 18, fats: 8 },
          { time: '1:00 PM', name: 'Bowl de Quinoa Mediterráneo', description: 'Quinoa con pepino, tomate, aceitunas, feta, garbanzos y aderezo de limón.', calories: 450, protein: 18, carbs: 52, fats: 20 },
          { time: '4:00 PM', name: 'Proteína con Manzana', description: '1 scoop de proteína en polvo mezclada con agua y 1 manzana.', calories: 180, protein: 20, carbs: 22, fats: 2 },
          { time: '7:00 PM', name: 'Pechuga de Pavo con Puré de Coliflor', description: '150g de pechuga de pavo al horno con hierbas, 1 taza de puré de coliflor y espárragos.', calories: 380, protein: 35, carbs: 18, fats: 18 },
        ],
      },
      {
        day: 'Sábado',
        meals: [
          { time: '8:00 AM', name: 'Omelette de Vegetales', description: 'Omelette de 3 huevos con espinacas, tomate, champiñones y queso feta.', calories: 360, protein: 22, carbs: 12, fats: 26 },
          { time: '11:00 AM', name: 'Batido de Proteína', description: 'Batido de proteína con leche de almendras, plátano y mantequilla de maní.', calories: 240, protein: 25, carbs: 28, fats: 8 },
          { time: '2:00 PM', name: 'Hamburguesa de Salmón', description: 'Hamburguesa de salmón con pan integral, lechuga, tomate y alioli ligero, acompañada de ensalada.', calories: 520, protein: 32, carbs: 38, fats: 28 },
          { time: '5:00 PM', name: 'Palitos de Apio con Mantequilla de Almendras', description: '2 tazas de apio con 2 cdas de mantequilla de almendras.', calories: 190, protein: 6, carbs: 14, fats: 14 },
          { time: '8:00 PM', name: 'Pizza de Coliflor Casera', description: 'Base de coliflor con salsa de tomate, mozzarella ligera, champiñones y espinacas.', calories: 340, protein: 20, carbs: 28, fats: 20 },
        ],
      },
      {
        day: 'Domingo',
        meals: [
          { time: '8:00 AM', name: 'French Toast Saludable', description: '2 rebanadas de pan integral en french toast con huevo, canela y topping de frutas.', calories: 380, protein: 16, carbs: 48, fats: 14 },
          { time: '11:00 AM', name: 'Parfait de Yogur', description: 'Yogur griego con capas de granola, frutos rojos y un toque de miel.', calories: 200, protein: 12, carbs: 30, fats: 5 },
          { time: '2:00 PM', name: 'Pechuga de Pollo Rellena', description: 'Pechuga de pollo rellena de espinacas y queso ricotta con batatas al horno.', calories: 480, protein: 38, carbs: 35, fats: 20 },
          { time: '5:00 PM', name: 'Hummus con Vegetales', description: '1/2 taza de hummus con zanahorias, pepino y pimientos.', calories: 180, protein: 7, carbs: 22, fats: 8 },
          { time: '7:00 PM', name: 'Sopa de Lentejas con Ensalada', description: '1 tazón de sopa de lentejas con espinacas, acompañada de ensalada verde.', calories: 380, protein: 18, carbs: 52, fats: 10 },
        ],
      },
    ],
  },
];

export const weightHistory = [
  { week: 'Sem 1', weight: 75.0 },
  { week: 'Sem 2', weight: 74.2 },
  { week: 'Sem 3', weight: 73.8 },
  { week: 'Sem 4', weight: 73.1 },
  { week: 'Sem 5', weight: 72.5 },
  { week: 'Sem 6', weight: 71.9 },
  { week: 'Sem 7', weight: 71.4 },
  { week: 'Sem 8', weight: 70.8 },
  { week: 'Sem 9', weight: 70.2 },
  { week: 'Sem 10', weight: 69.7 },
  { week: 'Sem 11', weight: 69.1 },
  { week: 'Sem 12', weight: 68.5 },
];

export const upcomingAppointments = [
  { id: '1', date: '15 de Marzo, 2025', time: '10:00 AM', type: 'Seguimiento', status: 'Confirmada' as const },
  { id: '2', date: '22 de Marzo, 2025', time: '11:00 AM', type: 'Seguimiento', status: 'Pendiente' as const },
];

export const patientData = {
  name: 'Laura Martínez',
  email: 'laura@email.com',
  phone: '+54 11 2345 6789',
  birthDate: '15/04/1990',
  gender: 'Femenino',
  address: 'Calle Principal 123, CABA',
  height: 165,
  initialWeight: 75,
  targetWeight: 65,
  currentWeight: 72.5,
  conditions: ['Celiaquía'],
  allergies: 'Ninguna',
};

export const categories = ['Todos', 'Nutrición', 'Hábitos Saludables', 'Meal Prep', 'Recetas', 'Bienestar'];
