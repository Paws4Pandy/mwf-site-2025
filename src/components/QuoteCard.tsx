
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const QuoteCard: React.FC = () => {
  return <div className="max-w-2xl mx-auto opacity-0 animate-fade-in-delay-1">
      <Card className="overflow-hidden border-hunter-green/30 bg-pure-white bg-opacity-70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="md:w-1/2 flex justify-center md:justify-start">
              <Avatar className="w-40 h-40 border-2 border-hunter-green aspect-square">
                <AvatarImage src="/lovable-uploads/59838530-0c06-4b13-8800-ce90bc56d60e.png" alt="Andreina Ford" className="object-cover" />
                <AvatarFallback className="bg-hunter-green text-pure-white">AF</AvatarFallback>
              </Avatar>
            </div>
            <div className="md:w-1/2 flex flex-col items-center text-center mt-4 md:mt-0">
              <p className="font-semibold text-2xl text-hunter-green">Andreina Ford</p>
              <p className="text-base text-hunter-green/70 mb-4">Mortgage Agent Level 2<br />Powered by BRX Mortgage #13463</p>
              <p className="text-hunter-green/80 italic">Navigating the mortgage process doesn't have to be complicated, Check out our resources & tools to help you make it make sense.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};

export default QuoteCard;
