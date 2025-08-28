import React from 'react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import { Calculator, DollarSign, Home, Shield } from 'lucide-react';
import { CONTACT_CONFIG } from '@/assets/config/contact';

const calculatorOptions = [
  {
    id: 'payment',
    title: 'Quick Payment',
    description: 'Get instant mortgage payment estimates with principal and interest calculations.',
    icon: Calculator,
    href: '/calculator?tab=quick-payment',
    color: 'text-[#61d6c5]'
  },
  {
    id: 'gds-tds',
    title: 'GDS/TDS Ratios',
    description: 'Debt service ratio qualification calculator using CMHC standards and guidelines.',
    icon: DollarSign,
    href: '/calculator?tab=gds-tds',
    color: 'text-[#F7A279]'
  },
  {
    id: 'land-transfer',
    title: 'Land Transfer Tax',
    description: 'Calculate land transfer tax costs including first-time buyer rebates and municipal taxes.',
    icon: Home,
    href: '/calculator?tab=land-transfer',
    color: 'text-[#ED8071]'
  },
  {
    id: 'stress-test',
    title: 'Stress Test',
    description: 'Verify mortgage qualification with stress test rates and CMHC insurance calculations.',
    icon: Shield,
    href: '/calculator?tab=stress-test',
    color: 'text-design-gold'
  }
];

const CalculatorSelection = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-20">
        <h3 className="text-3xl font-serif italic text-white font-normal mb-6">
          Mortgage Calculators—Choose the Right Tool for Your Needs.
        </h3>
        <p className="text-xl text-white/90 max-w-3xl mx-auto font-body">
          Professional mortgage calculations with CMHC compliance and real-time results
        </p>
      </div>

      {/* Calculator Grid - Centered and Equal Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {calculatorOptions.map((calc, index) => {
          const IconComponent = calc.icon;
          
          return (
            <a 
              key={calc.id}
              href={calc.href}
              className={`relative h-full opacity-0 animate-fade-in-delay-${Math.min(index + 1, 4)} block`}
            >
              <div className="relative h-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 group flex flex-col cursor-pointer">
                
                {/* Icon */}
                <div className="mb-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-8 h-8 ${calc.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6 flex-grow text-center">
                  <h3 className="text-white text-xl font-display font-bold mb-4">
                    {calc.title}
                  </h3>
                  <p className="text-white/90 text-sm font-body leading-relaxed">
                    {calc.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20 opacity-0 animate-fade-in-delay-5">
        <p className="text-white/90 text-lg font-body mb-6 text-center">
          Need help choosing the right calculator or have questions about your mortgage qualification?
        </p>
        <div className="flex justify-center gap-4">
          <LiquidGlassButton
            href="/meet"
            variant="primary"
            size="md"
            className="font-display font-bold px-8 py-3 min-w-[200px]"
          >
            Talk to a Mortgage Expert
          </LiquidGlassButton>
          <LiquidGlassButton
            href={CONTACT_CONFIG.bookingUrl}
            external
            variant="secondary"
            size="md"
            className="font-display font-bold px-8 py-3 min-w-[200px]"
          >
            Book a Call
          </LiquidGlassButton>
        </div>
      </div>
    </div>
  );
};

export default CalculatorSelection;