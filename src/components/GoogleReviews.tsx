import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google' | 'Manual';
}

// Real Google Reviews from actual customers
const reviews: Review[] = [
  {
    id: '1',
    author: 'C.O.',
    rating: 5,
    date: '2024-10-14', // 8 weeks ago from Dec 9, 2024
    text: 'Super pleased with the work and advice Andreina provided for our mortgage. She walked us through all potential options and answered our questions in detail. We will definitely be contacting Andreina for our renewal and for any of our future mortgage needs.',
    source: 'Google'
  },
  {
    id: '2',
    author: 'K.N.',
    rating: 5,
    date: '2024-09-16', // 12 weeks ago
    text: 'Andreina went above and beyond to help us understand what was best for us, and was so helpful to walk us through our options step by step. We highly recommend Andreina to anyone!',
    source: 'Google'
  },
  {
    id: '3',
    author: 'N.E.',
    rating: 5,
    date: '2024-08-05', // 18 weeks ago
    text: 'Andreina is an absolute pro! Her expertise, responsiveness, and dedication made the mortgage process smooth and stress-free. Highly recommend for anyone looking for a knowledgeable and trustworthy mortgage broker.',
    source: 'Google'
  }
];

export const GoogleReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const currentReview = reviews[currentIndex];
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-abril text-4xl md:text-5xl text-pure-white mb-4">
            Client Success Stories
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-light-azure">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-light-azure/70">
              (3 reviews)
            </span>
          </div>
          <a
            href="https://g.page/r/C03g9uljp/review"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-red hover:text-brand-red transition-colors underline"
          >
            View all reviews on Google
          </a>
        </div>

        <div className="relative">
          <div className="p-6 md:p-8 bg-light-crimson/50 backdrop-blur-md border border-light-crimson/20 rounded-2xl shadow-xl">
            <Quote className="w-10 h-10 text-light-crimson/40 mb-3" />
            
            <div className="mb-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentReview.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-base text-light-azure leading-relaxed mb-6">
                "{currentReview.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-pure-white">
                    {currentReview.author}
                  </p>
                  <p className="text-sm text-light-azure/60">
                    {new Date(currentReview.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-light-azure/60">
                  <img 
                    src="https://www.google.com/favicon.ico" 
                    alt="Google" 
                    className="w-4 h-4"
                  />
                  <span>Verified Google Review</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-muted-red w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};