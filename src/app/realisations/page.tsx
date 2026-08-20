import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import { PortfolioItem } from '@/types';

export const metadata: Metadata = {
  title: 'Nos Réalisations',
  description: 'Découvrez nos réalisations en électricité générale à Albertville et en Savoie. Installation, rénovation, dépannage.',
};

export const dynamic = 'force-dynamic';

const defaultPlaceholders: PortfolioItem[] = [
  { id: '1', title: 'Installation tableau électrique', description: 'Mise en place d’un tableau électrique moderne aux normes NF C 15-100', category: 'Tableau électrique', image_url: '/portfolio-1.jpg', display_order: 1, created_at: '' },
  { id: '2', title: 'Rénovation électrique complète', description: 'Rénovation intégrale de l’installation électrique d’un appartement', category: 'Rénovation', image_url: '/portfolio-2.jpg', display_order: 2, created_at: '' },
  { id: '3', title: 'Installation professionnelle', description: 'Équipement électrique complet pour locaux commerciaux', category: 'Professionnel', image_url: '/portfolio-3.jpg', display_order: 3, created_at: '' },
  { id: '4', title: 'Éclairage extérieur', description: 'Installation d’éclairage LED extérieur pour une résidence', category: 'Éclairage', image_url: '/portfolio-4.jpg', display_order: 4, created_at: '' },
  { id: '5', title: 'Domotique & maison connectée', description: 'Installation d’un système domotique pour le contrôle de l’éclairage et des volets', category: 'Domotique', image_url: '/portfolio-5.jpg', display_order: 5, created_at: '' },
  { id: '6', title: 'Dépannage d’urgence', description: 'Intervention rapide pour une panne électrique dans une résidence', category: 'Dépannage', image_url: '/portfolio-6.jpg', display_order: 6, created_at: '' },
];

async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return defaultPlaceholders;
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/portfolio_items?select=*&order=display_order.asc,created_at.desc`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      return defaultPlaceholders;
    }

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return defaultPlaceholders;
  } catch (err) {
    console.error('Error fetching realisations:', err);
    return defaultPlaceholders;
  }
}

export default async function RealisationsPage() {
  const items = await getPortfolioItems();

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
            Découvrez nos projets récents en électricité générale et rénovation
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 80}>
                <div className="glass-card glass-card-hover overflow-hidden group flex flex-col h-full">
                  <div className="relative aspect-[4/3] overflow-hidden bg-dark-lighter">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      {item.description && (
                        <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {item.category && (
                        <span className="text-xs text-primary font-medium uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-text mt-2">{item.title}</h3>
                    </div>
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
