import React from 'react';
import { motion } from 'framer-motion';
import AGlassCard from '@/components/ui/AGlassCard';
import { getTypographyClasses } from '@/lib/design-system';

const WhoIWorkFor = () => {
  const featuredCard = {
    title: "Contrarian Thinkers",
    quote: "You want what actually works",
    content: "You don't chase rates or go with what sounds good - you want what actually works. You explore the \"why\" behind your purchase first, then find financing that serves your bigger picture. You question conventional wisdom, value strategic thinking over quick closes, and expect a no-cookie-cutter approach based on probabilities, not sales pitches."
  };

  const cards = [
    {
      title: "Believers That Science + History = Finance",
      quote: "Data-driven decisions matter",
      content: "Your financial decisions are not left to chance. You understand the brain is a prediction engine, constantly testing assumptions against reality. You want a mortgage professional who applies a data-driven, scientific method - treating every market trend and loan structure as a hypothesis."
    },
    {
      title: "Complex Finances, Separations, Disabilities", 
      quote: "Your situation doesn't fit the mold",
      content: "Your situation doesn't fit the standard mold, and you need someone who doesn't quit after three no's. You want a mortgage professional who doesn't follow recipes or favor certain lenders - someone who builds custom solutions and sees opportunities where others see obstacles."
    },
    {
      title: "Those Who Demand High-Level Value",
      quote: "You recognize real expertise",
      content: "You're tired of professionals who think their time is more valuable than yours and make promises they can't keep. You want someone who operates on a different level - who won't tell you something will work if it won't, asks deeper questions, and challenges conventional thinking."
    },
    {
      title: "Lived Experience > Accolades",
      quote: "Real struggle, real understanding",
      content: "I've heard collection calls at the dinner table and felt money control my life instead of the other way around. You want someone who lived through financial struggle, not someone who studied it in a textbook. You need a mortgage professional who gets the shame, the fear, and the determination."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        
        {/* Featured Card - Contrarian Thinkers (Full Width) */}
        <AGlassCard className="hover:scale-105 transition-transform duration-300 mb-8 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={getTypographyClasses('contrarian', 'mb-4 text-center')}>{featuredCard.title}</h3>
          <p className="font-roboto-flex text-white/90 text-xl mb-4 text-center">
            "{featuredCard.quote}"
          </p>
          <p className="font-roboto-flex text-white/80 text-lg text-center max-w-3xl mx-auto">
            {featuredCard.content}
          </p>
        </motion.div>
        </AGlassCard>

        {/* Regular Cards Grid (2x2) */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <AGlassCard key={index} className="hover:scale-105 transition-transform duration-300">
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
            >
              <h3 className="font-anton text-2xl md:text-3xl text-white mb-4">{card.title}</h3>
              <p className="font-roboto-flex text-white/90 text-lg mb-4">
                "{card.quote}"
              </p>
              <p className="font-roboto-flex text-white/80 text-lg">
                {card.content}
              </p>
            </motion.div>
            </AGlassCard>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white text-2xl font-roboto-flex mt-12"
        >
          Because everyone deserves a fair shot at home
        </motion.p>
      </div>
    </section>
  );
};

export default WhoIWorkFor;