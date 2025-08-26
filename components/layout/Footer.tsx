// =============================================================================
// MEUPORTALFIT - COMPONENTE FOOTER
// =============================================================================

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// INTERFACE
// -----------------------------------------------------------------------------
interface FooterProps {
  className?: string;
}

// -----------------------------------------------------------------------------
// COMPONENTE FOOTER PRINCIPAL
// -----------------------------------------------------------------------------
const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-gray-900 text-white', className)}>
      {/* Main Footer Content */}
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <span className="font-display text-xl font-bold">
                MeuPortalFit
              </span>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Plataforma de wellness personalizada para brasileiros nos Estados Unidos. 
              Descubra os melhores produtos para sua saúde e bem-estar.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <SocialLink 
                href="https://instagram.com/meuportalfit" 
                aria-label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>
              
              <SocialLink 
                href="https://facebook.com/meuportalfit" 
                aria-label="Facebook"
              >
                <FacebookIcon />
              </SocialLink>
              
              <SocialLink 
                href="https://youtube.com/@meuportalfit" 
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </SocialLink>
              
              <SocialLink 
                href="https://tiktok.com/@meuportalfit" 
                aria-label="TikTok"
              >
                <TikTokIcon />
              </SocialLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/quiz">Fazer Quiz</FooterLink>
              </li>
              <li>
                <FooterLink href="/produtos">Produtos</FooterLink>
              </li>
              <li>
                <FooterLink href="/sobre">Sobre Nós</FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">Blog</FooterLink>
              </li>
              <li>
                <FooterLink href="/contato">Contato</FooterLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Suporte</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/ajuda">Central de Ajuda</FooterLink>
              </li>
              <li>
                <FooterLink href="/faq">FAQ</FooterLink>
              </li>
              <li>
                <FooterLink href="/como-funciona">Como Funciona</FooterLink>
              </li>
              <li>
                <FooterLink href="/garantia">Garantia</FooterLink>
              </li>
              <li>
                <FooterLink href="/devolucoes">Devoluções</FooterLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/privacidade">Privacidade</FooterLink>
              </li>
              <li>
                <FooterLink href="/termos">Termos de Uso</FooterLink>
              </li>
              <li>
                <FooterLink href="/cookies">Política de Cookies</FooterLink>
              </li>
              <li>
                <FooterLink href="/afiliados">Programa de Afiliados</FooterLink>
              </li>
              <li>
                <FooterLink href="/disclaimer">Disclaimer</FooterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-responsive py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} Portal Solutions LLC. Todos os direitos reservados.
            </div>

            {/* Additional Info */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>🇺🇸 Feito nos EUA para brasileiros</span>
              <span>🌱 Produtos naturais e seguros</span>
              <span>📦 Amazon Prime elegível</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <NewsletterSection />

      {/* Disclaimer */}
      <div className="bg-gray-800 py-4">
        <div className="container-responsive">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <strong>Importante:</strong> As informações fornecidas neste site são apenas para fins educacionais e não constituem aconselhamento médico. 
            Sempre consulte um profissional de saúde antes de iniciar qualquer suplementação. 
            Os resultados podem variar de pessoa para pessoa. 
            * Este site contém links de afiliado da Amazon e pode receber comissões por compras qualificadas.
          </p>
        </div>
      </div>
    </footer>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE NEWSLETTER SECTION
// -----------------------------------------------------------------------------
const NewsletterSection: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' })
      });

      if (response.ok) {
        setMessage('✅ Inscrito com sucesso! Verifique seu email.');
        setEmail('');
      } else {
        setMessage('❌ Erro ao se inscrever. Tente novamente.');
      }
    } catch (error) {
      setMessage('❌ Erro ao se inscrever. Tente novamente.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="bg-gray-800 border-t border-gray-700">
      <div className="container-responsive py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            📧 Fique por dentro das novidades
          </h3>
          <p className="text-gray-300 mb-6">
            Receba dicas de wellness, novos produtos e ofertas exclusivas direto no seu email.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor email"
              required
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Inscrevendo...' : 'Inscrever'}
            </button>
          </form>

          {message && (
            <p className="mt-3 text-sm text-center">
              {message}
            </p>
          )}

          <p className="mt-4 text-xs text-gray-400">
            Sem spam. Cancele a qualquer momento. Enviamos no máximo 1 email por semana.
          </p>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE FOOTER LINK
// -----------------------------------------------------------------------------
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ 
  href, 
  children, 
  external = false 
}) => {
  const linkProps = external 
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors text-sm"
      {...linkProps}
    >
      {children}
    </Link>
  );
};

// -----------------------------------------------------------------------------
// COMPONENTE SOCIAL LINK
// -----------------------------------------------------------------------------
interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  'aria-label': string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ 
  href, 
  children, 
  'aria-label': ariaLabel 
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

// -----------------------------------------------------------------------------
// ÍCONES SOCIAIS
// -----------------------------------------------------------------------------
const InstagramIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C8.396 0 7.954.01 6.748.048 2.938.092.092 2.938.048 6.748.01 7.954 0 8.396 0 12.017c0 3.62.01 4.062.048 5.268.092 3.81 2.938 6.656 6.748 6.7 1.206.038 1.648.048 5.268.048 3.62 0 4.062-.01 5.268-.048 3.81-.092 6.656-2.938 6.7-6.748.038-1.206.048-1.648.048-5.268 0-3.62-.01-4.062-.048-5.268C23.092 2.938 20.246.092 16.436.048 15.23.01 14.788 0 11.167 0h.85zm-.033 1.967c3.584 0 4.005.014 5.42.052 2.981.043 4.514 1.973 4.557 4.557.038 1.415.052 1.836.052 5.42 0 3.584-.014 4.005-.052 5.42-.043 2.584-1.576 4.514-4.557 4.557-1.415.038-1.836.052-5.42.052-3.584 0-4.005-.014-5.42-.052-2.981-.043-4.514-1.973-4.557-4.557-.038-1.415-.052-1.836-.052-5.42 0-3.584.014-4.005.052-5.42.043-2.584 1.576-4.514 4.557-4.557 1.415-.038 1.836-.052 5.42-.052z"/>
    <path d="M12.017 5.838a6.179 6.179 0 1 0 0 12.359 6.179 6.179 0 0 0 0-12.359zm0 1.967a4.212 4.212 0 1 1 0 8.424 4.212 4.212 0 0 1 0-8.424zm6.406-3.845a1.44 1.44 0 1 1 0 2.881 1.44 1.44 0 0 1 0-2.881z"/>
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YouTubeIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon: React.FC = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export default Footer;