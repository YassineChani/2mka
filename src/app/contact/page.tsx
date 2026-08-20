import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez 2MKA pour tous vos projets d’électricité à Albertville et en Savoie. Devis gratuit, intervention rapide.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6 animate-fade-in-up">
            <span className="gradient-text">Contactez-nous</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Une question ? Un projet ? N'hésitez pas à nous contacter pour un devis gratuit
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Contact Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
                  Envoyez-nous un message
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={200}>
              <div className="space-y-8">
                {/* Info Cards */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold mb-6">Nos coordonnées</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Adresse</h4>
                        <p className="text-text-muted text-sm">59 Avenue Jean Moulin<br />73200 Albertville, France</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Téléphone</h4>
                        <a href="tel:+33685565027" className="text-text-muted hover:text-primary transition-colors text-sm">+33 6 85 56 50 27</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                        <MessageCircle className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">WhatsApp</h4>
                        <a href="https://wa.me/33685565027" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-green-400 transition-colors text-sm">+33 6 85 56 50 27</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Email</h4>
                        <a href="mailto:2mka.73contact@gmail.com" className="text-text-muted hover:text-primary transition-colors text-sm">2mka.73contact@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text">Horaires</h4>
                        <p className="text-text-muted text-sm">Lundi - Samedi : 8h00 - 18h00</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="glass-card p-2 overflow-hidden">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=6.38%2C45.66%2C6.41%2C45.68&layer=mapnik&marker=45.6755%2C6.3928"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '0.75rem' }}
                    allowFullScreen
                    loading="lazy"
                    title="2MKA - Albertville"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
