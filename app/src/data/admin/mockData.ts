import type { Patient, Appointment, WeightRecord, Study, PatientPlan } from '@/types/admin';

export const CATEGORIES = ['Nutrición', 'Hábitos Saludables', 'Meal Prep', 'Recetas', 'Bienestar'];

export const mockPatients: Patient[] = [
  { id: '1', name: 'Laura Martínez', email: 'laura@email.com', phone: '+54 11 2345 6789', age: 34, height: 165, weight: 72.5, imc: 26.6, condition: 'Celiaquía', lastVisit: '10/05/2026', plan: 'Sin Gluten', status: 'activo' },
  { id: '2', name: 'Carlos Rodríguez', email: 'carlos@email.com', phone: '+54 11 3456 7890', age: 42, height: 178, weight: 88.0, imc: 27.8, condition: 'Sobrepeso, Celiaquía', lastVisit: '08/05/2026', plan: 'Antiinflamatorio', status: 'activo' },
  { id: '3', name: 'Ana Fernández', email: 'ana@email.com', phone: '+54 11 4567 8901', age: 28, height: 160, weight: 58.0, imc: 22.7, condition: 'Sensibilidad al gluten', lastVisit: '05/05/2026', plan: 'Sin Gluten', status: 'activo' },
  { id: '4', name: 'Martín López', email: 'martin@email.com', phone: '+54 11 5678 9012', age: 50, height: 175, weight: 95.0, imc: 31.0, condition: 'Diabetes tipo 2, Celiaquía', lastVisit: '28/04/2026', plan: 'Reducción + Sin Gluten', status: 'activo' },
  { id: '5', name: 'Sofía García', email: 'sofia@email.com', phone: '+54 11 6789 0123', age: 38, height: 168, weight: 63.0, imc: 22.3, condition: 'Ninguna', lastVisit: '20/04/2026', plan: 'Mantenimiento', status: 'inactivo' },
];

export const mockWeightHistory: Record<string, WeightRecord[]> = {
  '1': [
    { week: 'Sem 1', kg: 75.0 }, { week: 'Sem 2', kg: 74.2 }, { week: 'Sem 3', kg: 73.8 },
    { week: 'Sem 4', kg: 73.1 }, { week: 'Sem 5', kg: 72.5 }, { week: 'Sem 6', kg: 71.9 },
  ],
  '2': [
    { week: 'Sem 1', kg: 91.0 }, { week: 'Sem 2', kg: 90.2 }, { week: 'Sem 3', kg: 89.5 },
    { week: 'Sem 4', kg: 88.8 }, { week: 'Sem 5', kg: 88.0 }, { week: 'Sem 6', kg: 87.5 },
  ],
};

export const mockStudies: Record<string, Study[]> = {
  '1': [
    { id: 's1', name: 'Anticuerpos Transglutaminasa', date: '10/05/2026', result: 'Negativo (< 7 U/mL)', file: 'analisis-mayo-26.pdf' },
    { id: 's2', name: 'Hemograma Completo', date: '10/05/2026', result: 'Dentro de parámetros normales', file: 'analisis-mayo-26.pdf' },
    { id: 's3', name: 'Vitamina D', date: '12/02/2026', result: '28 ng/mL (bajo)', file: 'analisis-feb-26.pdf' },
  ],
};

export const mockPlans: Record<string, PatientPlan> = {
  '1': {
    name: 'Plan Sin Gluten',
    calorieTarget: 1600,
    meals: [
      { time: '8:00', name: 'Tostadas de pan sin gluten con palta y huevo', description: '2 rebanadas pan sin gluten, 1/2 palta, 1 huevo revuelto', calories: 380 },
      { time: '10:30', name: 'Mix de frutos secos', description: '30g nueces y almendras + 1 manzana', calories: 180 },
      { time: '13:00', name: 'Pechuga de pollo con quinoa y verduras', description: '150g pollo a la plancha, 1 taza quinoa, brócoli al vapor', calories: 450 },
      { time: '16:00', name: 'Yogur de coco con frutos rojos', description: '1 pote yogur de coco sin TACC + frutos rojos', calories: 150 },
      { time: '20:00', name: 'Salmón al horno con espárragos', description: '150g salmón, espárragos, batata al horno', calories: 420 },
    ],
  },
};

export const mockAppointments: Appointment[] = [
  { id: '1', patient: 'Laura Martínez', date: '15/05/2026', time: '10:00', type: 'Seguimiento', status: 'confirmada' },
  { id: '2', patient: 'Carlos Rodríguez', date: '16/05/2026', time: '11:00', type: 'Primera consulta', status: 'confirmada' },
  { id: '3', patient: 'Ana Fernández', date: '17/05/2026', time: '14:30', type: 'Seguimiento', status: 'pendiente' },
  { id: '4', patient: 'Martín López', date: '18/05/2026', time: '09:00', type: 'Express', status: 'pendiente' },
  { id: '5', patient: 'Sofía García', date: '12/05/2026', time: '16:00', type: 'Seguimiento', status: 'cancelada' },
];
