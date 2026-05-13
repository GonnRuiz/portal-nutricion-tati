import { useState } from 'react';
import { CalendarIcon, X, AlertCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { upcomingAppointments } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

const CONSULTATION_TYPES = [
  { label: 'Primera consulta', price: 50 },
  { label: 'Seguimiento', price: 35 },
  { label: 'Consulta express', price: 25 },
];

export function ReservasPage() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // March 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultType, setConsultType] = useState(CONSULTATION_TYPES[1]);
  const [notes, setNotes] = useState('');
  const [appointments, setAppointments] = useState(upcomingAppointments);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Mock unavailable days
  const isUnavailable = (day: number) => {
    return [5, 12, 15, 20, 25].includes(day);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast({ title: 'Selecciona fecha y hora', description: 'Por favor selecciona una fecha y hora para tu consulta.', variant: 'destructive' });
      return;
    }
    const dateStr = `${selectedDate} de ${monthName.split(' ')[0]}, ${year}`;
    const newAppt = {
      id: Date.now().toString(),
      date: dateStr,
      time: selectedTime,
      type: consultType.label,
      status: 'Pendiente' as const,
    };
    setAppointments([...appointments, newAppt]);
    toast({ title: '¡Reserva confirmada!', description: `Tu consulta ha sido agendada para el ${dateStr} a las ${selectedTime}.` });
    setSelectedDate(null);
    setSelectedTime(null);
    setNotes('');
  };

  const handleCancel = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
    toast({ title: 'Reserva cancelada', description: 'Tu consulta ha sido cancelada correctamente.' });
  };

  // Generate calendar grid
  const calendarDays: { day: number; type: 'prev' | 'current' | 'next' }[] = [];
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday start
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, type: 'prev' });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, type: 'current' });
  }
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({ day: i, type: 'next' });
  }

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl md:text-3xl text-[#2D3436] mb-2">
        Reservar Consulta
      </h1>
      <p className="text-[#636E72] mb-8">Selecciona una fecha y hora para tu próxima consulta</p>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        {/* Calendar */}
        <div className="space-y-6">
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              {/* Month header */}
              <div className="flex items-center justify-between mb-6">
                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-[#F7F5F0] transition-colors">
                  <CalendarIcon className="w-5 h-5 text-[#636E72]" />
                </button>
                <h3 className="font-semibold text-lg text-[#2D3436] capitalize">{monthName}</h3>
                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-[#F7F5F0] transition-colors">
                  <CalendarIcon className="w-5 h-5 text-[#636E72]" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-[#B2BEC3] py-2">
                    {d}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((item, i) => {
                  const isCurrent = item.type === 'current';
                  const isSelected = isCurrent && selectedDate === item.day;
                  const unavailable = isCurrent && isUnavailable(item.day);
                  const isToday = isCurrent && item.day === 5; // Mock today

                  return (
                    <button
                      key={i}
                      onClick={() => isCurrent && !unavailable && setSelectedDate(item.day)}
                      disabled={!isCurrent || unavailable}
                      className={`aspect-square rounded-xl text-sm font-medium transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-nutri-primary text-white'
                          : isToday
                          ? 'border-2 border-nutri-primary text-nutri-primary'
                          : unavailable && isCurrent
                          ? 'text-[#B2BEC3] line-through cursor-not-allowed'
                          : !isCurrent
                          ? 'text-[#D5DBDB]'
                          : 'text-[#2D3436] hover:bg-[rgba(74,124,89,0.08)]'
                      }`}
                    >
                      {item.day}
                      {isToday && <span className="text-[10px]">Hoy</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Time slots */}
          {selectedDate && (
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h4 className="font-semibold text-[#2D3436] mb-4">
                  Horarios disponibles para el {selectedDate} de marzo
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((time) => {
                    const occupied = time === '10:00 AM' || time === '2:30 PM';
                    return (
                      <button
                        key={time}
                        onClick={() => !occupied && setSelectedTime(time)}
                        disabled={occupied}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-nutri-primary text-white'
                            : occupied
                            ? 'bg-[#F7F5F0] text-[#B2BEC3] line-through cursor-not-allowed'
                            : 'border border-[rgba(74,124,89,0.15)] text-[#2D3436] hover:border-nutri-primary hover:text-nutri-primary'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Booking form */}
          {selectedTime && (
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h4 className="font-semibold text-[#2D3436] mb-4">Completa tu reserva</h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D3436] mb-1.5">Tipo de consulta</label>
                    <select
                      value={consultType.label}
                      onChange={(e) => setConsultType(CONSULTATION_TYPES.find(c => c.label === e.target.value) || CONSULTATION_TYPES[1])}
                      className="w-full px-4 py-3 bg-white border border-[#D5DBDB] rounded-xl text-[15px] focus:outline-none focus:border-nutri-primary focus:ring-2 focus:ring-[rgba(74,124,89,0.1)] transition-all"
                    >
                      {CONSULTATION_TYPES.map((type) => (
                        <option key={type.label} value={type.label}>
                          {type.label} - ${type.price}.00
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2D3436] mb-1.5">Notas (opcional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="¿Hay algo específico que quieras tratar?"
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-[#D5DBDB] rounded-xl text-[15px] focus:outline-none focus:border-nutri-primary focus:ring-2 focus:ring-[rgba(74,124,89,0.1)] transition-all resize-y"
                    />
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="w-full py-3 text-sm font-semibold text-white gradient-primary-btn rounded-xl shadow-btn hover:shadow-btn-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          {selectedDate && selectedTime && (
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h4 className="font-semibold text-[#2D3436] mb-4">Detalles de tu reserva</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#636E72]">Fecha</span>
                    <span className="font-medium text-[#2D3436]">{selectedDate} de marzo, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#636E72]">Hora</span>
                    <span className="font-medium text-[#2D3436]">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#636E72]">Tipo</span>
                    <span className="font-medium text-[#2D3436]">{consultType.label}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[rgba(74,124,89,0.1)]">
                    <span className="text-[#636E72]">Precio estimado</span>
                    <span className="font-semibold text-nutri-primary">${consultType.price}.00</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-[rgba(243,156,18,0.05)] rounded-xl flex gap-2">
                  <AlertCircle className="w-4 h-4 text-nutri-warning shrink-0 mt-0.5" />
                  <p className="text-xs text-[#636E72]">Puedes cancelar hasta 24 horas antes sin costo.</p>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Upcoming appointments */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h4 className="font-semibold text-[#2D3436] mb-4">Mis Próximas Consultas</h4>
              <div className="space-y-3">
                {appointments.map((appt) => (
                  <div key={appt.id} className="p-4 rounded-xl bg-[#F7F5F0] flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#2D3436]">{appt.date}</p>
                      <p className="text-xs text-[#636E72]">{appt.time} - {appt.type}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        appt.status === 'Confirmada'
                          ? 'bg-[rgba(39,174,96,0.1)] text-green-600'
                          : 'bg-[rgba(243,156,18,0.1)] text-amber-600'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCancel(appt.id)}
                      className="p-2 text-[#B2BEC3] hover:text-red-500 transition-colors"
                      title="Cancelar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <p className="text-sm text-[#636E72] text-center py-4">No tienes consultas agendadas</p>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
