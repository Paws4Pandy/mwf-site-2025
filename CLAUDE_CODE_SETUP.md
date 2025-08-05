# Claude Code Setup Guide

## Overview
Claude Code is an AI-powered coding assistant component that integrates Claude 3.5 Sonnet into your React application. It provides real-time coding help, code reviews, debugging assistance, and programming guidance.

## Installation

The Claude Code component has been installed and is ready to use. The following dependencies were added:

- `@anthropic-ai/sdk` - Official Anthropic SDK for API communication

## Setup Instructions

### 1. Get Your API Key
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up for an account (if you don't have one)
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the API key (it starts with `sk-ant-`)

### 2. Set Environment Variable
Create a `.env` file in your project root directory and add:

```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from step 1.

### 3. Restart Development Server
After adding the environment variable, restart your development server:

```bash
npm run dev
```

## Usage

### Demo Page
Visit `/claude-code` in your application to see the Claude Code assistant in action.

### Component Usage
You can also use the ClaudeCode component in your own pages:

```tsx
import ClaudeCode from '../components/ClaudeCode';

function MyPage() {
  return (
    <div>
      <h1>My Coding Assistant</h1>
      <ClaudeCode 
        placeholder="Ask me anything about coding!"
        className="my-custom-class"
      />
    </div>
  );
}
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiKey` | string | `process.env.VITE_ANTHROPIC_API_KEY` | Your Anthropic API key |
| `model` | string | `'claude-3-5-sonnet-20241022'` | Claude model to use |
| `placeholder` | string | `"Ask Claude to help you with code..."` | Placeholder text for input |
| `className` | string | `""` | Additional CSS classes |

## Features

- **Real-time Chat**: Interactive conversation with Claude
- **Message History**: View all previous messages in the session
- **Copy to Clipboard**: One-click copying of Claude's responses
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful error messages for API issues
- **Responsive Design**: Works on desktop and mobile devices

## Example Prompts

### Code Review
- "Review this React component for best practices"
- "Check this TypeScript code for type safety"
- "Optimize this JavaScript function"

### Learning & Debugging
- "Explain how async/await works in JavaScript"
- "Help me debug this error message"
- "Show me how to use React hooks"

### Architecture & Design
- "Design a REST API for a todo app"
- "How should I structure my React components?"
- "What's the best way to handle state in this scenario?"

## Security Notes

- Never commit your API key to version control
- The API key is only used client-side for this demo
- For production use, consider implementing server-side API calls
- Monitor your API usage to avoid unexpected charges

## Troubleshooting

### "Please set your Anthropic API key" message
- Check that your `.env` file exists in the project root
- Verify the environment variable name is exactly `VITE_ANTHROPIC_API_KEY`
- Restart your development server after adding the environment variable

### API errors
- Verify your API key is correct
- Check your Anthropic account has sufficient credits
- Ensure you're not hitting rate limits

### Component not loading
- Check the browser console for errors
- Verify all dependencies are installed
- Ensure the component is properly imported

## Support

For issues with the Claude Code component, check:
1. Your API key configuration
2. Network connectivity
3. Anthropic service status
4. Browser console for error messages 