import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Logo size="small" />
            <p className="mt-4 text-text-muted text-sm leading-relaxed">
              L&apos;électricité en toute confiance. Votre partenaire de confiance pour tous vos travaux d&apos;électricité en Savoie.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://wa.me/33685565027" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-dark-lighter border border-dark-border flex items-center justify-center text-text-muted hover:text-green-400 hover:border-green-400/50 transition-all" aria-label="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
              <a href="https://instagram.com/2MKA_FR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-dark-lighter border border-dark-border flex items-center justify-center text-text-muted hover:text-pink-400 hover:border-pink-400/50 transition-all" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://tiktok.com/@2MKA_FR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-dark-lighter border border-dark-border flex items-center justify-center text-text-muted hover:text-text hover:border-text/50 transition-all" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.1a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.07z"/></svg>
              </a>
              <a href="mailto:2mka.73contact@gmail.com" className="w-10 h-10 rounded-lg bg-dark-lighter border border-dark-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-text font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-text-muted hover:text-primary transition-colors text-sm">Accueil</Link></li>
              <li><Link href="/services" className="text-text-muted hover:text-primary transition-colors text-sm">Services</Link></li>
              <li><Link href="/realisations" className="text-text-muted hover:text-primary transition-colors text-sm">Réalisations</Link></li>
              <li><Link href="/contact" className="text-text-muted hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-text font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-3">
              <li><span className="text-text-muted text-sm">Installation électrique</span></li>
              <li><span className="text-text-muted text-sm">Tableaux électriques</span></li>
              <li><span className="text-text-muted text-sm">Dépannage rapide</span></li>
              <li><span className="text-text-muted text-sm">Mise aux normes</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-text font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-text-muted text-sm">59 Avenue Jean Moulin,<br />73200 Albertville</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+33685565027" className="text-text-muted hover:text-primary transition-colors text-sm">+33 6 85 56 50 27</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:2mka.73contact@gmail.com" className="text-text-muted hover:text-primary transition-colors text-sm">2mka.73contact@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-xs">© 2024 2MKA — Électricité Générale. Tous droits réservés.</p>
            <p className="text-text-muted text-xs">59 Avenue Jean Moulin, 73200 Albertville, Savoie</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
