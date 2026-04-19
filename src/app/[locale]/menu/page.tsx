'use client';

import { useTranslations } from 'next-intl';
import { MenuCard } from '@/components/MenuCard';
import { motion } from 'framer-motion';
import { use } from 'react';

const categories = [
  { id: 'cat1', nameKey: 'pizzas' },
  { id: 'cat2', nameKey: 'kebab' },
  { id: 'cat3', nameKey: 'premium' },
];

const recipes = [
  {
    id: 'rec1',
    categoryId: 'cat1',
    name: 'Margherita',
    description: 'Tomatsås, premium mozzarella, färsk basilika.',
    price: 70,
    image: '/pizzas/margherita.png',
    isPopular: false
  },
  {
    id: 'rec2',
    categoryId: 'cat1',
    name: 'Vesuvio',
    description: 'Klassisk tomatsås, ost och handskivad skinka.',
    price: 75,
    image: '/pizzas/margherita.png', 
    isPopular: false
  },
  {
    id: 'rec3',
    categoryId: 'cat1',
    name: 'Capricciosa',
    description: 'Skinka, färska champinjoner, marinerade kronärtskockor och oliver.',
    price: 85,
    image: '/pizzas/capricciosa.png',
    isPopular: true
  },
  {
    id: 'rec4',
    categoryId: 'cat2',
    name: 'Kebabpizza',
    description: 'Kebabkött (nöt), lök, feferoni och vår legendariska kebabsås.',
    price: 95,
    image: '/pizzas/kebab-pizza.png',
    isPopular: true
  }
];

export default function MenuPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations('Menu');

  return (
    <div className="flex-1 bg-brand-cream/10 pb-20">
      <section className="bg-brand-charcoal py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-red/5 opacity-50" />
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 uppercase tracking-tighter">
            {t('title')}
          </h1>
          <p className="text-brand-cream/60 max-w-xl mx-auto px-4 italic font-light">
            Välj bland våra klassiker eller skapa din egen favorit.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {categories.map((category) => {
          const categoryRecipes = recipes.filter(r => r.categoryId === category.id);
          
          return (
            <div key={category.id} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-charcoal">
                  {t(`categories.${category.nameKey}`)}
                </h2>
                <div className="h-[2px] flex-1 bg-brand-red/10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryRecipes.map((recipe) => (
                  <MenuCard
                    id={recipe.id}
                    key={recipe.id}
                    name={recipe.name}
                    description={recipe.description}
                    price={recipe.price}
                    image={recipe.image}
                    isPopular={recipe.isPopular}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
