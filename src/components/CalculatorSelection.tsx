import React from 'react';
import LiquidGlassButton from '@/components/ui/LiquidGlassButton';
import { Calculator, DollarSign, Home, Shield } from 'lucide-react';

const calculatorOptions = [
  {
    id: 'payment',
    title: 'Payment Calculator',
    description: 'See how much your payments could be if you make weekly, bi-weekly or monthly payments.',
    icon: Calculator,
    href: '/calculator',
    color: 'text-brand-red'
  },
  {
    id: 'affordability',
    title: 'Affordability Calculator',
    description: 'Get a sense of how much you can afford to borrow and what makes sense for you.',
    icon: DollarSign,
    href: '/calculator?tab=affordability',
    color: 'text-light-crimson'
  },
  {
    id: 'land-transfer',
    title: 'Land Transfer Tax Calculator',
    description: 'Calculate the amount you will have to pay in land transfer tax depending on your location.',
    icon: Home,
    href: '/calculator?tab=land-transfer',
    color: 'text-gray-orange'
  },
  {
    id: 'cmhc',
    title: 'CMHC Insurance Calculator',
    description: 'Determine how much your CMHC insurance will be based on the percentage of your down payment.',
    icon: Shield,
    href: '/calculator?tab=cmhc',
    color: 'text-light-azure'
  }
];

const CalculatorSelection = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-anton text-4xl md:text-5xl lg:text-6xl text-[#ED8071] leading-[0.85] mb-4">
          Start Here to
          <br />
          <span className="text-white">Run Some Numbers</span>
        </h2>
        <p className="text-xl md:text-2xl font-roboto-flex text-white/90 max-w-3xl mx-auto leading-relaxed">
          Choose the calculator that best fits your needs
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {calculatorOptions.map((calc, index) => {
          const IconComponent = calc.icon;
          
          return (
            <div 
              key={calc.id}
              className={`relative rounded-3xl overflow-hidden opacity-0 animate-fade-in-delay-${Math.min(index + 1, 4)}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 blur-xl" />
              <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:shadow-2xl hover:bg-white/15 transition-all duration-300 group">
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-8 h-8 ${calc.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="font-anton text-white text-2xl md:text-3xl mb-4 leading-tight">
                    {calc.title}
                  </h3>
                  <p className="text-white/90 font-roboto-flex text-base md:text-lg leading-relaxed">
                    {calc.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-start">
                  <LiquidGlassButton
                    href={calc.href}
                    variant="primary"
                    size="lg"
                    className="bg-[#ED8071] hover:bg-[#ED8071]/90 text-white font-roboto-flex font-bold text-lg px-8 py-4"
                  >
                    Calculate Now
                  </LiquidGlassButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <div className="relative rounded-3xl overflow-hidden opacity-0 animate-fade-in-delay-5">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 via-transparent to-light-crimson/20 blur-xl" />
          <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
            <p className="text-white/90 font-roboto-flex text-lg mb-6 max-w-2xl mx-auto">
              Need help choosing the right calculator or have questions about your results?
            </p>
            <LiquidGlassButton
              href="/meet"
              variant="secondary"
              size="lg"
              className="font-roboto-flex font-bold text-lg px-8 py-4"
            >
              Talk to a Mortgage Expert
            </LiquidGlassButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorSelection;