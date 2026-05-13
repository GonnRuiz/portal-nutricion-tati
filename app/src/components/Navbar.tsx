import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Menu, Calendar, LogIn, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/#servicios' },
    { label: 'Sobre Mí', path: '/#sobre-mi' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contacto', path: '/#contacto' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(247,245,240,0.95)] backdrop-blur-xl shadow-nav'
          : 'bg-[rgba(247,245,240,0.85)] backdrop-blur-md'
      }`}
      style={{ borderBottom: '1px solid rgba(74, 124, 89, 0.08)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="w-7 h-7 text-nutri-primary" strokeWidth={2} />
          <span className="font-display font-bold text-[22px] text-nutri-primary">NutriVida</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => scrollToSection(link.path)}
              className={`text-[15px] font-medium transition-colors duration-200 relative ${
                isActive(link.path) && !link.path.includes('#')
                  ? 'text-nutri-primary'
                  : 'text-[#636E72] hover:text-nutri-primary'
              }`}
            >
              {link.label}
              {isActive(link.path) && !link.path.includes('#') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-nutri-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                className="flex items-center gap-2 px-4 py-2.5 text-[14px] font-semibold text-nutri-primary border-2 border-nutri-primary rounded-xl hover:bg-nutri-primary hover:text-white transition-all duration-250"
              >
                <LayoutDashboard className="w-4 h-4" />
                {user?.role === 'admin' ? 'Panel Admin' : 'Portal'}
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2.5 text-[14px] font-semibold text-[#636E72] hover:text-nutri-primary hover:bg-[rgba(74,124,89,0.08)] rounded-xl transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-nutri-primary border-2 border-nutri-primary rounded-xl hover:bg-nutri-primary hover:text-white transition-all duration-250"
              >
                <LogIn className="w-4 h-4" />
                Portal Pacientes
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2.5 text-[14px] font-semibold text-white gradient-primary-btn rounded-xl shadow-btn hover:shadow-btn-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                Reservar
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <button className="p-2 text-[#636E72] hover:text-nutri-primary transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-nutri-background p-0">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-[rgba(74,124,89,0.1)]">
                <Link to="/" className="flex items-center gap-2">
                  <Leaf className="w-7 h-7 text-nutri-primary" />
                  <span className="font-display font-bold text-[22px] text-nutri-primary">NutriVida</span>
                </Link>
              </div>
              <nav className="flex-1 p-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      scrollToSection(link.path);
                      setMobileOpen(false);
                    }}
                    className="text-left px-4 py-3 text-[15px] font-medium text-[#636E72] hover:text-nutri-primary hover:bg-[rgba(74,124,89,0.08)] rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </button>
                ))}
                {isAuthenticated && (
                  <Link
                    to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                    className="flex items-center gap-2 px-4 py-3 text-[15px] font-medium text-nutri-primary hover:bg-[rgba(74,124,89,0.08)] rounded-xl transition-all duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {user?.role === 'admin' ? 'Panel Admin' : 'Mi Portal'}
                  </Link>
                )}
              </nav>
              <div className="p-6 border-t border-[rgba(74,124,89,0.1)]">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-semibold text-[#636E72] hover:text-nutri-primary border border-[rgba(74,124,89,0.2)] rounded-xl transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-semibold text-nutri-primary border-2 border-nutri-primary rounded-xl hover:bg-nutri-primary hover:text-white transition-all duration-250"
                    >
                      <LogIn className="w-4 h-4" />
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/registro"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-semibold text-white gradient-primary-btn rounded-xl transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      Crear Cuenta
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
