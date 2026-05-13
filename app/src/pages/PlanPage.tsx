import { useState } from 'react';
import { Download, Sun, Moon, Apple, Check } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { nutritionPlan } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const DAYS_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export function PlanPage() {
  const { toast } = useToast();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedMeals, setCompletedMeals] = useState<Set<string>>(new Set());

  const week = nutritionPlan[selectedWeek];
  const dayPlan = week.days[selectedDay];

  const toggleMeal = (mealIndex: number) => {
    const key = `${selectedWeek}-${selectedDay}-${mealIndex}`;
    setCompletedMeals((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const totalCalories = dayPlan.meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = dayPlan.meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = dayPlan.meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFats = dayPlan.meals.reduce((sum, m) => sum + m.fats, 0);
  const targetCalories = 1500;

  const handleDownload = () => {
    toast({ title: 'Descargando plan', description: 'Tu plan nutricional se está descargando en PDF.' });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-[#2D3436]">
            Plan Nutricional
          </h1>
          <p className="text-[#636E72] mt-1">Plan de Reducción de Peso - Semana {selectedWeek + 1}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-[rgba(39,174,96,0.1)] text-green-600 text-xs font-medium">
            Activo
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-nutri-primary border-2 border-nutri-primary rounded-xl hover:bg-nutri-primary hover:text-white transition-all"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Week selector */}
      <ScrollReveal>
        <div className="bg-white rounded-2xl p-4 shadow-card mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            {nutritionPlan.map((w, i) => (
              <button
                key={i}
                onClick={() => { setSelectedWeek(i); setSelectedDay(0); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedWeek === i
                    ? 'bg-nutri-primary text-white'
                    : 'text-[#636E72] hover:bg-[rgba(74,124,89,0.08)]'
                }`}
              >
                Semana {w.week}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Day selector */}
      <ScrollReveal>
        <div className="bg-white rounded-2xl p-4 shadow-card mb-6">
          <div className="flex items-center gap-1 overflow-x-auto">
            {DAYS_SHORT.map((day, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                className={`flex-1 min-w-[60px] py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedDay === i
                    ? 'bg-nutri-primary text-white'
                    : 'text-[#636E72] hover:bg-[rgba(74,124,89,0.08)]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Day content */}
      <ScrollReveal>
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card mb-6">
          <h3 className="font-display font-semibold text-xl text-[#2D3436] mb-6">
            {DAYS[selectedDay]}
          </h3>

          <div className="space-y-6">
            {dayPlan.meals.map((meal, i) => {
              const isCompleted = completedMeals.has(`${selectedWeek}-${selectedDay}-${i}`);
              return (
                <div
                  key={i}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    isCompleted
                      ? 'border-green-200 bg-[rgba(39,174,96,0.03)]'
                      : 'border-transparent bg-[#F7F5F0]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                      {i === 0 ? <Sun className="w-6 h-6 text-nutri-secondary" /> :
                       i === dayPlan.meals.length - 1 ? <Moon className="w-6 h-6 text-nutri-primary" /> :
                       <Apple className="w-6 h-6 text-nutri-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-[#B2BEC3] font-medium uppercase tracking-wider">
                          {meal.time}
                        </p>
                        <button
                          onClick={() => toggleMeal(i)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : 'border-2 border-[rgba(74,124,89,0.2)] hover:border-nutri-primary'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                      <h4 className="font-semibold text-[#2D3436] mb-1">{meal.name}</h4>
                      <p className="text-sm text-[#636E72] mb-3">{meal.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-[#636E72]">
                        <span className="px-2 py-1 bg-white rounded-lg">{meal.calories} kcal</span>
                        <span className="px-2 py-1 bg-white rounded-lg">P: {meal.protein}g</span>
                        <span className="px-2 py-1 bg-white rounded-lg">C: {meal.carbs}g</span>
                        <span className="px-2 py-1 bg-white rounded-lg">G: {meal.fats}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Daily Summary */}
      <ScrollReveal>
        <div className="bg-nutri-cream rounded-2xl p-6 md:p-8">
          <h3 className="font-semibold text-lg text-[#2D3436] mb-4">Resumen Diario</h3>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#636E72]">Calorías</span>
                <span className="text-sm font-medium text-[#2D3436]">{totalCalories} / {targetCalories} kcal</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-nutri-primary rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl">
              <p className="text-xs text-[#636E72] mb-1">Proteínas</p>
              <p className="text-lg font-semibold text-[#2D3436]">{totalProtein}g</p>
              <div className="h-1.5 bg-[#F7F5F0] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-nutri-secondary rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl">
              <p className="text-xs text-[#636E72] mb-1">Carbohidratos</p>
              <p className="text-lg font-semibold text-[#2D3436]">{totalCarbs}g</p>
              <div className="h-1.5 bg-[#F7F5F0] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-nutri-primary rounded-full" style={{ width: '55%' }} />
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl">
              <p className="text-xs text-[#636E72] mb-1">Grasas</p>
              <p className="text-lg font-semibold text-[#2D3436]">{totalFats}g</p>
              <div className="h-1.5 bg-[#F7F5F0] rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
