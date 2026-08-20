import Link from 'next/link';
import { Zap, Shield, AlertTriangle, Wrench, Award, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import Logo from '@/components/Logo';

const services = [
  {
    icon: Zap,
    title: 'Installation électrique',
    subtitle: 'Neuf & Rénovation',
    description: 'Installation complète pour constructions neuves et rénovations. Nous assurons un travail soigné et conforme aux normes en vigueur.',
  },
  {
    icon: Shield,
    title: 'Tableaux électriques',
    subtitle: 'Mise en conformité',
    description: 'Vérification, mise à jour et remplacement de vos tableaux électriques pour garantir la sécurité de votre installation.',
  },
  {
    icon: AlertTriangle,
    title: 'Dépannage rapide',
    subtitle: 'Toutes installations',
    description: 'Intervention rapide pour tous vos problèmes électriques. Diagnostic précis et réparation efficace.',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    subtitle: 'Mise aux normes',
    description: 'Entretien préventif et mise aux normes de vos installations électriques pour une sécurité optimale.',
  },
];

const strengths = [
  {
    icon: Award,
    title: 'Expertise & Savoir-faire',
    description: 'Une équipe qualifiée avec une expérience solide dans tous les domaines de l’électricité générale.',
  },
  {
    icon: Clock,
    title: 'Réactivité garantie',
    description: 'Intervention rapide et devis gratuit. Nous nous adaptons à vos contraintes de planning.',
  },
  {
    icon: ShieldCheck,
    title: 'Normes & Sécurité',
    description: 'Travaux conformes à la norme NF C 15-100. Votre sécurité est notre priorité absolue.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <Logo size="large" className="mx-auto mb-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text">L&apos;électricité en toute confiance</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Votre partenaire de confiance pour tous vos travaux d&apos;électricité à Albertville et en Savoie.
            Installation, rénovation, dépannage et mise aux normes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Link href="/services" className="btn-secondary flex items-center gap-2">
              Nos Services
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-primary flex items-center gap-2 animate-pulse-glow">
              <Zap className="w-5 h-5" />
              Demander un devis
            </Link>
          </div>
        </div>
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Services Overview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
                <span className="gradient-text">Nos Services</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                Des solutions électriques complètes pour les particuliers et les professionnels
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={service.title} delay={index * 150}>
                <div className="glass-card glass-card-hover p-6 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-1">{service.title}</h3>
                  <p className="text-sm text-primary mb-3">{service.subtitle}</p>
                  <p className="text-sm text-text-muted leading-relaxed">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={600}>
            <div className="text-center mt-12">
              <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
                Découvrir tous nos services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* Why Choose Us */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
                Pourquoi choisir <span className="gradient-text">2MKA</span> ?
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">
                La confiance et la qualité au cœur de chaque intervention
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengths.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 200}>
                <div className="glass-card glass-card-hover p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-3">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg, #EA580C, #F97316, #EAB308)' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
              Besoin d&apos;un électricien de confiance ?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour un devis gratuit et sans engagement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all"
            >
              <Zap className="w-5 h-5" />
              Nous contacter
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
