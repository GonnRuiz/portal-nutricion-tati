export type AdminTab = 'articulos' | 'pacientes' | 'turnos';
export type PatientStatus = 'activo' | 'inactivo';
export type AppointmentStatus = 'confirmada' | 'pendiente' | 'cancelada';

export interface ArticleForm {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  status: 'Publicado' | 'Borrador';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  height: number;
  weight: number;
  imc: number;
  condition: string;
  lastVisit: string;
  plan: string;
  status: PatientStatus;
}

export interface Appointment {
  id: string;
  patient: string;
  date: string;
  time: string;
  type: string;
  status: AppointmentStatus;
}

export interface WeightRecord { week: string; kg: number; }
export interface Study { id: string; name: string; date: string; result: string; file: string; }
export interface PlanMeal { time: string; name: string; description: string; calories: number; }

export interface PatientPlan {
  name: string;
  calorieTarget: number;
  meals: PlanMeal[];
}

export interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  height: number;
  weight: number;
  condition: string;
  plan: string;
}
