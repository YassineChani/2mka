import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Wrench, Shield, AlertTriangle, Users, CheckCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Nos Services',
  description: 'Découvrez nos services d’électricité générale à Albertville : installation, dépannage, mise en conformité, maintenance et solutions professionnelles.',
};

const services = [
  {
    icon: Wrench,
    title: 'Maintenance & Dépannage',
    description: 'Notre équipe intervient rapidement pour diagnostiquer et réparer toutes vos pannes électriques. Nous assurons également la maintenance préventive de vos installations pour éviter les désagréments.',
    features: [
      'Diagnostic rapide et précis',
      'Réparation de pannes électriques',
      'Maintenance préventive planifiée',
      'Remplacement de composants défaillants',
      'Intervention d’urgence 6j/7',
    ],
  },
  {
    icon: Zap,
    title: 'Installation Électrique',
    description: 'Que ce soit pour une construction neuve ou une rénovation complète, nous réalisons l’ensemble de votre installation électrique dans le respect des normes NF C 15-100.',
    features: [
      'Installation complète neuf et rénovation',
      'Câblage et mise en service',
      'Éclairage intérieur et extérieur',
      'Prises, interrupteurs et domotique',
      'Certification de conformité',
    ],
  },
  {
    icon: Shield,
    title: 'Mise en Conformité',
    description: 'Nous mettons vos tableaux électriques et installations aux normes actuelles. Indispensable pour votre sécurité et pour la vente ou location de votre bien.',
    features: [
      'Diagnostic de conformité',
      'Mise à jour tableau électrique',
      'Mise à la terre',
      'Différentiels et disjoncteurs',
      'Rapport de conformité NF C 15-100',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Solutions Professionnelles',
    description: 'Nous proposons des solutions électriques adaptées aux professionnels : bureaux, commerces, locaux industriels. Un accompagnement sur mesure pour vos projets.',
    features: [
      'Étude et dimensionnement',
      'Installation tertiaire et industrielle',
      'Éclairage professionnel LED',
      'Réseaux électriques spécifiques',
      'Contrat de maintenance',
    ],
  },
  {
    icon: Users,
    title: 'Partenaire Électricité',
    description: 'Nous accompagnons les particuliers et les professionnels dans la durée. Un interlocuteur unique pour tous vos besoins en électricité.',
    features: [
      'Conseil personnalisé',
      'Devis gratuit et détaillé',
      'Suivi de chantier rigoureux',
      'Garantie sur les travaux',
      'Service après-vente réactif',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-24 px-4 hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6 animate-fade-in-up">
            <span className="gradient-text">Nos Services</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Des solutions électriques complètes et professionnelles pour répondre à tous vos besoins
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Services Detail */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {services.map((service, index) => (
            <ScrollReveal key={service.title}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                {/* Icon & Title Side */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-text">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-text-muted leading-relaxed text-lg mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features Side */}
                <div className="flex-1 w-full">
                  <div className="glass-card p-8">
                    <ul className="space-y-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-text-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {index < services.length - 1 && <div className="section-divider mt-20" />}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto rounded-2xl p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg, #EA580C, #F97316, #EAB308)' }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
              Demandez votre devis gratuit
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Un projet électrique ? Contactez-nous pour une étude personnalisée et un devis sans engagement.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-dark px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all">
              <Zap className="w-5 h-5" />
              Nous contacter
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
