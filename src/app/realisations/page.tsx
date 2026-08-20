import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Nos Réalisations',
  description: 'Découvrez nos réalisations en électricité générale à Albertville et en Savoie. Installation, rénovation, dépannage.',
};

const placeholderItems = [
  { id: '1', title: 'Installation tableau électrique', description: 'Mise en place d’un tableau électrique moderne aux normes NF C 15-100', category: 'Tableau électrique', image_url: '/portfolio-1.jpg' },
  { id: '2', title: 'Rénovation électrique complète', description: 'Rénovation intégrale de l’installation électrique d’un appartement', category: 'Rénovation', image_url: '/portfolio-2.jpg' },
  { id: '3', title: 'Installation professionnelle', description: 'Équipement électrique complet pour locaux commerciaux', category: 'Professionnel', image_url: '/portfolio-3.jpg' },
  { id: '4', title: 'Éclairage extérieur', description: 'Installation d’éclairage LED extérieur pour une résidence', category: 'Éclairage', image_url: '/portfolio-4.jpg' },
  { id: '5', title: 'Domotique & maison connectée', description: 'Installation d’un système domotique pour le contrôle de l’éclairage et des volets', category: 'Domotique', image_url: '/portfolio-5.jpg' },
  { id: '6', title: 'Dépannage d’urgence', description: 'Intervention rapide pour une panne électrique dans une résidence', category: 'Dépannage', image_url: '/portfolio-6.jpg' },
];

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6 animate-fade-in-up">
            <span className="gradient-text">Nos Réalisations</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Découvrez quelques-uns de nos projets récents en électricité générale
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderItems.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 100}>
                <div className="glass-card glass-card-hover overflow-hidden group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm text-text-muted">{item.description}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-lg font-semibold text-text mt-1">{item.title}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
