// =============================================================================
// MEUPORTALFIT - COMPONENTE HEADER
// =============================================================================

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, OutlineButton } from '@/components/ui/Button';

// -----------------------------------------------------------------------------
// INTERFACE
// -----------------------------------------------------------------------------
interface HeaderProps {
  className?: string;
}

// -----------------------------------------------------------------------------
// COMPONENTE HEADER PRINCIPAL
// -----------------------------------------------------------------------------
const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Detecta scroll para efeito no header
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha menu ao redimensionar
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm' 
          : 'bg-white',
        className
      )}
    >
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <span className="font-display text-xl font-bold text-gray-900">
                MeuPortalFit
              </span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/quiz">
              Fazer Quiz
            </NavLink>
            <NavLink href="/produtos">
              Produtos
            </NavLink>
            <NavLink href="/sobre">
              Sobre
            </NavLink>
            <NavLink href="/blog">
              Blog
            </NavLink>
            <NavLink href="/contato">
              Contato
            </NavLink>
          </nav>

          {/* CTA Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <OutlineButton size="sm" asChild>
              <Link href="/login">
                Entrar
              </Link>
            </OutlineButton>
            
            <Button size="sm" asChild>
              <Link href="/quiz">
                Começar Quiz
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Menu principal"
          >
            <span className="sr-only">Abrir menu principal</span>
            {isMenuOpen ? (
              <XMarkIcon />
            ) : (
              <Bars3Icon />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
          <MobileNavLink 
            href="/quiz" 
            onClick={() => setIsMenuOpen(false)}
          >
            Fazer Quiz
          </MobileNavLink>
          
          <MobileNavLink 
            href="/produtos" 
            onClick={() => setIsMenuOpen(false)}
          >
            Produtos
          </MobileNavLink>
          
          <MobileNavLink 
            href="/sobre" 
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre
          </MobileNavLink>
          
          <MobileNavLink 
            href="/blog" 
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </MobileNavLink>
          
          <MobileNavLink 
            href="/contato" 
            onClick={() => setIsMenuOpen(false)}
          >
            Contato
          </MobileNavLink>

          {/* Mobile CTA Buttons */}
          <div className="pt-4 flex flex-col space-y-2">
            <OutlineButton 
              fullWidth 
              size="sm" 
              asChild
            >
              <Link 
                href="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            </OutlineButton>
            
            <Button 
              fullWidth 
              size="sm" 
              asChild
            >
              <Link 
                href="/quiz"
                onClick={() => setIsMenuOpen(false)}
              >
                Começar Quiz
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE NAV LINK DESKTOP
// -----------------------------------------------------------------------------
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  href, 
  children, 
  className 
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors',
        'relative py-2',
        'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0',
        'after:bg-primary-500 after:transition-all after:duration-200',
        'hover:after:w-full',
        className
      )}
    >
      {children}
    </Link>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE NAV LINK MOBILE
// -----------------------------------------------------------------------------
interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ 
  href, 
  children, 
  onClick,
  className 
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors',
        className
      )}
    >
      {children}
    </Link>
  );
};

// -----------------------------------------------------------------------------
// ÍCONES
// -----------------------------------------------------------------------------
const Bars3Icon: React.FC = () => (
  <svg 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
    />
  </svg>
);

const XMarkIcon: React.FC = () => (
  <svg 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="1.5" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

// -----------------------------------------------------------------------------
// COMPONENTE DE ANNOUNCEMENT BAR (OPCIONAL)
// -----------------------------------------------------------------------------
export const AnnouncementBar: React.FC<{
  message: string;
  ctaText?: string;
  ctaLink?: string;
  onClose?: () => void;
}> = ({ message, ctaText, ctaLink, onClose }) => {
  return (
    <div className="relative bg-gradient-primary">
      <div className="container-responsive">
        <div className="flex items-center justify-between py-3 px-4">
          <div className="flex-1 flex items-center justify-center text-sm font-medium text-white">
            <span>{message}</span>
            {ctaText && ctaLink && (
              <Link 
                href={ctaLink}
                className="ml-3 font-semibold underline hover:no-underline"
              >
                {ctaText}
              </Link>
            )}
          </div>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 p-1 text-white hover:text-gray-200"
              aria-label="Fechar anúncio"
            >
              <XMarkIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// HOOK PARA CONTROLAR VISIBILITY DO HEADER
// -----------------------------------------------------------------------------
export const useHeaderVisibility = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Mostra header quando scrolling up ou no topo
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return isVisible;
};

// -----------------------------------------------------------------------------
// HEADER ALTERNATIVO COM HIDE/SHOW
// -----------------------------------------------------------------------------
export const AutoHideHeader: React.FC<HeaderProps> = ({ className }) => {
  const isVisible = useHeaderVisibility();

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm',
        'transition-transform duration-300',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        className
      )}
    >
      <Header />
    </header>
  );
};

export default Header;