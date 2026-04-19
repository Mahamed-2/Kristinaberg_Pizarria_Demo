import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Plus, Info, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import { CustomizerModal } from './CustomizerModal';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isPopular?: boolean;
}

// Mock ingredients for the demo/build phase
const MOCK_INGREDIENTS = [
  { id: 'i1', name: 'Lök', price: 10, type: 'TOPPING' },
  { id: 'i2', name: 'Oliver', price: 10, type: 'TOPPING' },
  { id: 'i3', name: 'Färsk Paprika', price: 10, type: 'TOPPING' },
  { id: 'i4', name: 'Bacon', price: 15, type: 'TOPPING' },
  { id: 'i5', name: 'Skinka', price: 15, type: 'TOPPING' },
];

export function MenuCard({ id, name, description, price, image, isPopular }: MenuCardProps) {
  const t = useTranslations('Menu');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-charcoal/5 flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image || '/pizza-placeholder.jpg'}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {isPopular && (
            <div className="absolute top-4 left-4 bg-brand-gold text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3 fill-white" />
              POPULÄR
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
             <p className="text-white text-sm font-medium leading-relaxed italic line-clamp-2">
               {description}
             </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-serif font-bold text-brand-charcoal group-hover:text-brand-red transition-colors">
              {name}
            </h3>
            <span className="text-lg font-bold text-brand-red">
              {formatCurrency(price)}
            </span>
          </div>
          
          <p className="text-brand-charcoal-light text-sm line-clamp-2 mb-6 flex-1">
            {description}
          </p>

          <div className="flex gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-brand-charcoal text-white py-3 rounded-2xl text-sm font-bold hover:bg-brand-red transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-red/30"
            >
              <Plus className="w-4 h-4" />
              {t('add_to_cart')}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-3 border border-brand-charcoal/10 rounded-2xl hover:bg-brand-charcoal/5 transition-all" title={t('customize')}
            >
              <Info className="w-4 h-4 text-brand-charcoal-light" />
            </button>
          </div>
        </div>
      </motion.div>

      <CustomizerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={{ id, name, basePrice: price, description }}
        availableIngredients={MOCK_INGREDIENTS}
        standardIngredientIds={[]} // Simplified for demo
      />
    </>
  );
}
