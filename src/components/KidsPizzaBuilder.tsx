'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Trash2, Plus, ShoppingBag, Circle, Star, Heart, Trophy } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';

interface PlacedIngredient {
  id: string;
  type: 'pepperoni' | 'mushroom' | 'olive';
  x: number; // Percentage
  y: number; // Percentage
  rotation: number;
}

type PizzaShape = 'base' | 'star' | 'heart';

const INGREDIENTS = [
  { id: 'pepperoni', src: '/kids/pepperoni.png', size: 12 },
  { id: 'mushroom', src: '/kids/mushroom.png', size: 11 },
  { id: 'olive', src: '/kids/olive.png', size: 8 },
] as const;

export function KidsPizzaBuilder() {
  const t = useTranslations('Kids');
  const [placedIngredients, setPlacedIngredients] = useState<PlacedIngredient[]>([]);
  const [selectedShape, setSelectedShape] = useState<PizzaShape>('base');
  const [score, setScore] = useState(0);
  const pizzaRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  const handleDragEnd = (event: any, info: any, type: PlacedIngredient['type']) => {
    if (!pizzaRef.current) return;

    const pizzaRect = pizzaRef.current.getBoundingClientRect();
    
    // Calculate cursor position relative to the pizza container
    const x = info.point.x - pizzaRect.left;
    const y = info.point.y - pizzaRect.top;

    // Simple Box Check (Inspiration style): Is the drop somewhere inside the container?
    if (x > 0 && x < pizzaRect.width && y > 0 && y < pizzaRect.height) {
      const newIngredient: PlacedIngredient = {
        id: `ing-${Date.now()}-${Math.random()}`,
        type,
        x: (x / pizzaRect.width) * 100,
        y: (y / pizzaRect.height) * 100,
        rotation: Math.random() * 360,
      };
      setPlacedIngredients(prev => [...prev, newIngredient]);
      setScore(prev => prev + 10); // Reward the player!
    }
  };

  const handleClear = () => {
    setPlacedIngredients([]);
    setScore(0);
  };
  
  const handleRemoveItem = (id: string) => {
    setPlacedIngredients(prev => prev.filter(item => item.id !== id));
    setScore(prev => Math.max(0, prev - 10));
  };

  const handleAddToCart = () => {
    if (placedIngredients.length === 0) return;
    
    const toppingCounts = placedIngredients.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    addItem({
      recipeId: 'kids-custom-pizza',
      name: `${t(`shapes.${selectedShape}`)} Pizza (${score} Poäng!)`,
      basePrice: 85,
      totalPrice: 85 + (placedIngredients.length * 2),
      selectedIngredients: Object.entries(toppingCounts).map(([type, count]) => ({
        id: type,
        name: t(`ingredients.${type}`),
        price: 2 * count
      })),
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-6xl mx-auto p-4 font-sans text-brand-charcoal">
      
      {/* Game Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-brand-red flex items-center gap-3">
          {t('game_title')}
        </h1>
        <div className="flex items-center justify-center gap-4 text-2xl font-bold bg-white px-6 py-2 rounded-full shadow-lg border-2 border-brand-red/10">
          <Trophy className="text-amber-500 w-8 h-8" />
          {t('score')}: <span className="text-brand-red">{score}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 w-full justify-center">
        
        {/* Ingredients Toolbox */}
        <div className="flex lg:flex-col gap-4 items-center">
          <h2 className="text-sm font-black uppercase text-brand-charcoal/40 mb-2 vertical-text lg:rotate-180 hidden lg:block">Toppings</h2>
          <div className="flex lg:flex-row flex-wrap lg:flex-col gap-6 bg-white/60 p-6 rounded-[40px] shadow-xl border-t-4 border-brand-red">
            {INGREDIENTS.map((ing) => (
              <div key={ing.id} className="flex flex-col items-center gap-2">
                <motion.div
                  drag
                  dragSnapToOrigin
                  dragElastic={0.1}
                  onDragEnd={(e, info) => handleDragEnd(e, info, ing.id)}
                  whileHover={{ scale: 1.15 }}
                  whileDrag={{ scale: 1.3, zIndex: 1000 }}
                  className="relative w-20 h-20 bg-white rounded-3xl shadow-lg border-2 border-brand-red/5 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
                >
                  <div className="relative w-14 h-14 pointer-events-none">
                    <Image src={ing.src} alt={ing.id} fill className="object-contain" draggable={false} />
                  </div>
                </motion.div>
                <span className="text-[10px] font-black uppercase text-brand-charcoal/30">
                  {t(`ingredients.${ing.id}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The Pizza Studio (Drop Zone) */}
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white/40 p-4 rounded-full shadow-inner border-2 border-dashed border-brand-charcoal/10">
            <div 
              id="pizza"
              ref={pizzaRef}
              className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-[#f5d6a1] rounded-full shadow-2xl border-[15px] border-[#c48a3d] overflow-hidden"
            >
              {/* Custom Shaped Dough Layer */}
              <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply opacity-30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedShape}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="w-full h-full"
                  >
                    <Image 
                      src={`/kids/${selectedShape}.png`} 
                      alt="Dough Texture" 
                      fill 
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Toppings Container */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <AnimatePresence>
                  {placedIngredients.map((item) => {
                    const config = INGREDIENTS.find(i => i.id === item.type);
                    const size = config?.size || 10;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        style={{ 
                          position: 'absolute',
                          left: `${item.x}%`,
                          top: `${item.y}%`,
                          width: `${size}%`,
                          height: `${size}%`,
                          marginLeft: `-${size/2}%`,
                          marginTop: `-${size/2}%`,
                          pointerEvents: 'auto',
                        }}
                        className="cursor-pointer group"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Image src={`/kids/${item.type}.png`} alt={item.type} fill className="object-contain drop-shadow-md group-hover:scale-110 transition-transform" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-red-500/80 rounded-full p-1 shadow-lg">
                            <Trash2 className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Prompt */}
              {placedIngredients.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-brand-red/20 pointer-events-none z-0">
                  <Plus className="w-24 h-24 animate-pulse" />
                </div>
              )}
            </div>
          </div>

          {/* Shape Selector */}
          <div className="flex gap-4">
            {['base', 'star', 'heart'].map((shape) => (
              <button
                key={shape}
                onClick={() => setSelectedShape(shape as PizzaShape)}
                className={cn(
                  "px-6 py-2 rounded-full font-black uppercase text-xs transition-all shadow-md border-2",
                  selectedShape === shape ? "bg-brand-red text-white scale-105 border-brand-red" : "bg-white text-brand-charcoal border-transparent hover:border-brand-red/10"
                )}
              >
                {t(`shapes.${shape}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex lg:flex-col gap-4 self-center lg:self-start">
          <button
            onClick={handleClear}
            disabled={placedIngredients.length === 0}
            className="flex items-center gap-3 px-8 py-4 rounded-3xl bg-brand-charcoal text-white font-black uppercase tracking-tighter shadow-xl hover:bg-black transition-all disabled:opacity-20"
          >
            <Trash2 className="w-5 h-5" />
            {t('clear')}
          </button>
          <button
            onClick={handleAddToCart}
            disabled={placedIngredients.length === 0}
            className="flex items-center gap-3 px-8 py-4 rounded-3xl bg-brand-red text-white font-black uppercase tracking-tighter shadow-xl shadow-brand-red/20 disabled:opacity-30 hover:scale-105 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-6 h-6" />
            {t('add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
}
