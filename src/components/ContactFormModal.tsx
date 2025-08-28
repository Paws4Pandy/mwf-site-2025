import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { getFormType, getDefaultFormData, type FormType } from '@/assets/config/forms';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType?: string; // Default to 'contact'
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose, formType = 'contact' }) => {
  // Get form configuration
  const config = getFormType(formType);
  if (!config) {
    console.error(`Form type "${formType}" not found`);
    return null;
  }

  const [formData, setFormData] = useState(() => getDefaultFormData(config));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Build message from form data
      const messageLines = [];
      config.fields.forEach(field => {
        if (formData[field.name] && field.name !== 'name' && field.name !== 'email') {
          if (field.type === 'select' && field.options) {
            const selectedOption = field.options.find(opt => opt.value === formData[field.name]);
            messageLines.push(`${field.label}: ${selectedOption?.label || formData[field.name]}`);
          } else {
            messageLines.push(`${field.label}: ${formData[field.name]}`);
          }
        }
      });

      const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: config.id,
          message: messageLines.join('\n'),
          formType: config.id
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after 3 seconds
        setTimeout(() => {
          onClose();
          setTimeout(() => {
            setFormData(getDefaultFormData(config));
            setSubmitStatus('idle');
          }, 300);
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Unable to send your message. Please try again or call us directly.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderField = (field: FormType['fields'][0]) => {
    const baseClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent";
    
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            className={`${baseClasses} min-h-[80px] resize-y`}
            placeholder={field.placeholder}
            rows={3}
          />
        );
      
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            className={baseClasses}
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            required={field.required}
            className={baseClasses}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl">
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {submitStatus === 'idle' || submitStatus === 'error' ? (
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="font-anton text-3xl text-pure-black mb-2">{config.title}</h2>
                    <p className="text-gray-600">
                      {config.subtitle}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {config.fields.map((field) => (
                      <div key={field.name}>
                        <label 
                          htmlFor={field.name} 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {field.label} {field.required && '*'}
                        </label>
                        {renderField(field)}
                      </div>
                    ))}

                    {submitStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {errorMessage}
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-red hover:bg-muted-red text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {config.submitButtonText}
                        </>
                      )}
                    </button>
                  </form>

                  {config.privacyNote && (
                    <p className="text-xs text-gray-500 text-center mt-4">
                      {config.privacyNote}
                    </p>
                  )}
                </div>
              ) : (
                /* Success State */
                <div className="p-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h2 className="font-anton text-2xl text-pure-black text-center mb-2">Success!</h2>
                  <p className="text-gray-600 text-center">
                    {config.successMessage}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactFormModal;