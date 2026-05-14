import { Link } from 'react-router-dom';
import { Calendar, ClipboardList, TrendingUp, Bell, ChevronRight, Sun, Moon, Apple, Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { weightHistory, nutritionPlan, upcomingAppointments, patientData } from '@/data/mockData';

function StatCard({ icon: Icon, title, value, subtitle, subtitleColor, link, linkTo }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          title === 'Próxima Consulta' ? 'bg-[rgba(248,201,216,0.2)]' :
          title === 'Plan Activo' ? 'bg-[rgba(39,174,96,0.1)]' :
          title === 'Peso Actual' ? 'bg-[rgba(212,163,115,0.1)]' :
          'bg-[rgba(243,156,18,0.1)]'
        }`}>
          <Icon className={`w-6 h-6 ${
            title === 'Próxima Consulta' ? 'text-nutri-primary' :
            title === 'Plan Activo' ? 'text-green-600' :
            title === 'Peso Actual' ? 'text-nutri-secondary' :
            'text-nutri-warning'
          }`} />
        </div>
      </div>
      <h3 className="text-sm text-[#636E72] mb-1">{title}</h3>
      <p className="text-xl font-semibold text-[#2D3436] mb-1">{value}</p>
      <p className={`text-sm ${subtitleColor || 'text-[#636E72]'}`}>{subtitle}</p>
      {link && (
        <Link to={linkTo} className="inline-flex items-center gap-1 text-nutri-primary text-sm mt-3 hover:underline">
          {link} <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

function ProgressChart() {
  const maxWeight = Math.max(...weightHistory.map(w => w.weight));
  const minWeight = Math.min(...weightHistory.map(w => w.weight));
  const range = maxWeight - minWeight;
  const points = weightHistory.map((w, i) => {
    const x = (i / (weightHistory.length - 1)) * 100;
    const y = 100 - ((w.weight - minWeight) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card">
      <h3 className="font-semibold text-lg text-[#2D3436] mb-6">Evolución de Peso</h3>
      <div className="relative h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(248,201,216,0.15)" strokeWidth="0.5" />
          ))}
          {/* Area */}
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="rgba(248,201,216,0.2)"
          />
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke="#4A7C59"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Points */}
          {weightHistory.map((w, i) => {
            const x = (i / (weightHistory.length - 1)) * 100;
            const y = 100 - ((w.weight - minWeight) / range) * 80 - 10;
            return (
              <circle key={i} cx={x} cy={y} r="1.5" fill="#4A7C59" />
            );
          })}
        </svg>
        {/* X axis labels */}
        <div className="flex justify-between text-xs text-[#B2BEC3] mt-2">
          {weightHistory.filter((_, i) => i % 2 === 0).map((w, i) => (
            <span key={i}>{w.week}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TodayMeals() {
  const today = nutritionPlan[0].days[0]; // Monday

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card">
      <h3 className="font-semibold text-lg text-[#2D3436] mb-4">Hoy - Menú</h3>
      <div className="space-y-3">
        {today.meals.map((meal, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgba(248,201,216,0.08)] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[rgba(248,201,216,0.2)] flex items-center justify-center shrink-0">
              {i === 0 ? <Sun className="w-5 h-5 text-nutri-primary" /> :
               i === today.meals.length - 1 ? <Moon className="w-5 h-5 text-nutri-primary" /> :
               <Apple className="w-5 h-5 text-nutri-primary" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#B2BEC3]">{meal.time}</p>
              <p className="text-sm font-medium text-[#2D3436] truncate">{meal.name}</p>
            </div>
            <button className="w-8 h-8 rounded-full border-2 border-[rgba(248,201,216,0.3)] flex items-center justify-center hover:bg-nutri-primary hover:border-nutri-primary group transition-all">
              <Check className="w-4 h-4 text-transparent group-hover:text-white transition-colors" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardPage() {
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-semibold text-2xl md:text-3xl text-[#2D3436]">
          Bienvenido, {patientData.name.split(' ')[0]}
        </h1>
        <p className="text-[#636E72] mt-1">Aquí tienes un resumen de tu progreso</p>
        <p className="text-sm text-[#B2BEC3] mt-1 capitalize">{today}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={Calendar}
          title="Próxima Consulta"
          value={upcomingAppointments[0].date}
          subtitle={`${upcomingAppointments[0].time} - ${upcomingAppointments[0].type}`}
          link="Ver detalles"
          linkTo="/dashboard/reservas"
        />
        <StatCard
          icon={ClipboardList}
          title="Plan Activo"
          value="Plan de Reducción de Peso"
          subtitle="Semana 3 de 12"
          subtitleColor="text-green-600"
        />
        <StatCard
          icon={TrendingUp}
          title="Peso Actual"
          value={`${patientData.currentWeight} kg`}
          subtitle={`-${(patientData.initialWeight - patientData.currentWeight).toFixed(1)} kg desde el inicio`}
          subtitleColor="text-green-600"
        />
        <StatCard
          icon={Bell}
          title="Próximo Recordatorio"
          value="Beber agua"
          subtitle="Cada 2 horas"
        />
      </div>

      {/* Charts & Meals */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ScrollReveal>
          <ProgressChart />
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <TodayMeals />
        </ScrollReveal>
      </div>
    </div>
  );
}
