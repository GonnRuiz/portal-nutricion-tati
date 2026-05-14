import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

function scrollToSection(href: string, location: any, navigate: any) {
  if (href.startsWith('/#')) {
    const id = href.replace('/#', '');
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }
}

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="bg-nutri-primary-dark text-white">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Logo & Tagline */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-nutri-accent-leaf" strokeWidth={2} />
              <span className="font-display font-bold text-xl">Nutrición Tatí</span>
            </Link>
            <p className="text-[rgba(255,255,255,0.7)] text-sm leading-relaxed mb-6">
              Nutrición personalizada libre de gluten. Te acompaño a encontrar tu equilibrio.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/tatinutricion" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-nutri-primary-light transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/tatinutricion" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-nutri-primary-light transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@tatinutricion" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-nutri-primary-light transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', path: '/', isAnchor: false },
                { label: 'Servicios', path: '/#servicios', isAnchor: true },
                { label: 'Sobre Mí', path: '/#sobre-mi', isAnchor: true },
                { label: 'Blog', path: '/blog', isAnchor: false },
                { label: 'Contacto', path: '/#contacto', isAnchor: true },
                { label: 'Portal Pacientes', path: '/login', isAnchor: false },
                { label: 'Crear Cuenta', path: '/registro', isAnchor: false },
              ].map((link) => (
                <li key={link.path}>
                  {link.isAnchor ? (
                    <button
                      onClick={() => scrollToSection(link.path, location, navigate)}
                      className="text-[rgba(255,255,255,0.7)] hover:text-white text-sm transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link to={link.path} className="text-[rgba(255,255,255,0.7)] hover:text-white text-sm transition-colors duration-200">
                      {link.label}
                    </Link>
                  )}
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
                'Planes Personalizados Sin Gluten',
                'Seguimiento Continuo',
                'Talleres Nutricionales',
              ].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection('/#servicios', location, navigate)}
                    className="text-[rgba(255,255,255,0.7)] hover:text-white text-sm transition-colors duration-200 text-left"
                  >
                    {service}
                  </button>
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
                <span className="text-[rgba(255,255,255,0.7)] text-sm">tatiana@nutriciontati.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-nutri-accent-leaf shrink-0 mt-0.5" />
                <span className="text-[rgba(255,255,255,0.7)] text-sm">+54 11 2345 6789</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-nutri-accent-leaf shrink-0 mt-0.5" />
                <span className="text-[rgba(255,255,255,0.7)] text-sm">CABA, Argentina</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-nutri-accent-leaf shrink-0 mt-0.5" />
                <span className="text-[rgba(255,255,255,0.7)] text-sm">Lun - Vie: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.1)] pt-8">
          <p className="text-center text-[rgba(255,255,255,0.5)] text-sm">
            © 2025 Nutrición Tatí. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
