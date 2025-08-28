# 📧 Centralized Contact Form System

## Overview

All contact forms now use a single, centralized component and configuration system. No more hardcoding forms on each page!

## ✅ What's Been Implemented

### 1. **Centralized Configuration**
- **File**: `src/assets/config/forms.ts`
- **Contains**: All form types, fields, validation, and email templates
- **Form Types Available**: 
  - `contact` - General contact form
  - `consultation` - Consultation booking
  - `quickQuote` - Quick mortgage quote
  - `newsletter` - Newsletter signup

### 2. **Universal Form Component** 
- **File**: `src/components/ContactFormModal.tsx`
- **Usage**: One component handles ALL form types
- **Features**: Dynamic field rendering, validation, submission

### 3. **Smart API Handler**
- **File**: `api/send-email.js`
- **Features**: Handles all form types, dynamic email templates, Gmail integration

## 🚀 How to Use

### Basic Usage (Contact Form)
```tsx
import ContactFormModal from '@/components/ContactFormModal';

const [showContactForm, setShowContactForm] = useState(false);

// Default contact form
<ContactFormModal 
  isOpen={showContactForm}
  onClose={() => setShowContactForm(false)}
/>
```

### Different Form Types
```tsx
// Consultation booking form
<ContactFormModal 
  isOpen={showConsultationForm}
  onClose={() => setShowConsultationForm(false)}
  formType="consultation"
/>

// Quick quote form
<ContactFormModal 
  isOpen={showQuoteForm}
  onClose={() => setShowQuoteForm(false)}
  formType="quickQuote"
/>

// Newsletter signup
<ContactFormModal 
  isOpen={showNewsletterForm}
  onClose={() => setShowNewsletterForm(false)}
  formType="newsletter"
/>
```

## ⚙️ Adding New Form Types

### 1. Add Configuration
Edit `src/assets/config/forms.ts`:

```typescript
FORM_TYPES: {
  // ... existing forms
  
  newFormType: {
    id: 'newFormType',
    title: "New Form Title",
    subtitle: "Form description",
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your name',
        required: true
      },
      {
        name: 'customField',
        label: 'Custom Field',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Choose...' },
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' }
        ]
      }
    ],
    submitButtonText: 'Submit Form',
    apiEndpoint: '/api/send-email',
    successMessage: "Form submitted successfully!",
    privacyNote: "Your info is secure.",
    emailTemplate: 'new-form-template',
    confirmationEmail: true
  }
}
```

### 2. Use Immediately
```tsx
<ContactFormModal 
  formType="newFormType"
  isOpen={showForm}
  onClose={() => setShowForm(false)}
/>
```

### 3. No Additional Code Needed!
- Form renders automatically
- API handles it automatically  
- Emails sent automatically
- Validation works automatically

## 📝 Available Field Types

- **text** - Text input
- **email** - Email input with validation
- **tel** - Phone number input
- **textarea** - Multi-line text area
- **select** - Dropdown with options
- **number** - Numeric input

## 🎨 Form Features

- **Dynamic Field Rendering** - Fields based on config
- **Smart Validation** - Required/optional fields
- **Professional Styling** - Consistent design
- **Loading States** - Submit button animations
- **Error Handling** - User-friendly error messages
- **Success States** - Confirmation messages
- **Email Integration** - Dual emails (admin + user)

## 📧 Email System

### Admin Notifications
- **To**: `andreina@mortgagewithford.ca`
- **Subject**: Dynamic based on form type
- **Content**: All form fields, professional formatting

### User Confirmations  
- **From**: "Andreina Ford Mortgage Agent"
- **Content**: Thank you message, next steps, contact info
- **Branding**: Professional HTML template

## 🔧 Benefits

✅ **No Code Duplication** - One component for all forms
✅ **Easy to Maintain** - Change config, not code
✅ **Consistent UX** - Same look and behavior
✅ **Type Safe** - TypeScript interfaces
✅ **Flexible** - Add new forms in minutes
✅ **Scalable** - Handles unlimited form types

## 📍 Current Implementation

The contact form is already live on the main page using the centralized system:
- **URL**: https://mortgage-with-ford-august-2025-job94k8fv.vercel.app
- **Form Type**: `contact`
- **Location**: Main page "Contact Me" button

Ready to add more forms anywhere on the site using the same system!

## 🔥 Quick Examples

```tsx
// Different buttons, same component system
<button onClick={() => setShowContactForm(true)}>
  Contact Me
</button>

<button onClick={() => setShowConsultationForm(true)}>
  Book Consultation  
</button>

<button onClick={() => setShowQuoteForm(true)}>
  Get Quick Quote
</button>

// All use the same ContactFormModal component with different formType props
```

**Result**: Professional, consistent forms with zero code duplication! 🎉