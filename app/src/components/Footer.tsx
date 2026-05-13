import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-nutri-primary-dark text-white">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Logo & Tagline */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-nutri-accent-leaf" strokeWidth={2} />
              <span className="font-display font-bold text-xl">NutriVida</span>
            </Link>
            <p className="text-[rgba(255,255,255,0.7)] text-sm leading-relaxed mb-6">
              Tu camino hacia una vida más saludable comienza aquí. Nutrición personalizada y profesional.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-nutri-primary-light transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-nutri-primary-light transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-nutri-primary-light transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', path: '/' },
                { label: 'Servicios', path: '/#servicios' },
                { label: 'Blog', path: '/blog' },
                { label: 'Contacto', path: '/#contacto' },
                { label: 'Portal Pacientes', path: '/login' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[rgba(255,255,255,0.7)] hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Servicios</h4>
            <ul className="space-y-3">
              {[
                'Consultas Online',
                'Planes Personalizados',
                'Seguimiento Continuo',
                'Talleres Nutricionales',
              ].map((service) => (
                <li key={service}>
                  <span className="text-[rgba(255,255,255,0.7)] text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-nutri-accent-leaf shrink-0 mt-0.5" />
                <span className="text-[rgba(255,255,255,0.7)] text-sm">info@nutrivida.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-nutri-accent-leaf shrink-0 mt-0.5" />
                <span className="text-[rgba(255,255,255,0.7)] text-sm">+1 234 567 890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-nutri-accent-leaf shrink-0 mt-0.5" />
                <span className="text-[rgba(255,255,255,0.7)] text-sm">Av. Salud 123, Ciudad</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-nutri-accent-leaf shrink-0 mt-0.5" />
                <span className="text-[rgba(255,255,255,0.7)] text-sm">Lun - Vie: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(255,255,255,0.1)] pt-8">
          <p className="text-center text-[rgba(255,255,255,0.5)] text-sm">
            © 2025 NutriVida. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
