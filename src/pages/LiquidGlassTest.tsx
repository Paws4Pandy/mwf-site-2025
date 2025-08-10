import React from 'react';
import LiquidGlassDemo from '../components/LiquidGlassDemo';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LiquidGlassTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Liquid Glass Effect Testing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This page demonstrates the liquid glass refraction effect that can be integrated 
            into your mortgage website for premium UI elements.
          </p>
        </div>
        
        <LiquidGlassDemo />
        
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Integration Instructions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Start
              </h3>
              <ol className="space-y-3 text-gray-600">
                <li>1. The LiquidGlass component is now available in your project</li>
                <li>2. Import it: <code className="bg-gray-100 px-2 py-1 rounded">import {`{ LiquidGlass }`} from './liquid-glass-react/src'</code></li>
                <li>3. Wrap any element: <code className="bg-gray-100 px-2 py-1 rounded">{`<LiquidGlass mode="standard">...</LiquidGlass>`}</code></li>
                <li>4. Customize with props: intensity, scale, mode</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Use Cases
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Mortgage calculator buttons</li>
                <li>• Rate comparison cards</li>
                <li>• Contact form submit buttons</li>
                <li>• Navigation menu items</li>
                <li>• Call-to-action sections</li>
                <li>• Modal overlays</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Note:</h4>
            <p className="text-blue-800">
              The liquid glass effect works best on elements with contrasting backgrounds. 
              For optimal results, ensure your target elements have sufficient visual separation 
              from their surroundings.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiquidGlassTest;
