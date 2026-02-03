# Auth System Frontend

Production-ready React authentication frontend with email verification, Google OAuth, and comprehensive user management.

## Features

- ✅ **Email/Password Authentication** - Traditional login with client-side validation
- ✅ **Google OAuth 2.0** - One-click social authentication
- ✅ **Email Verification** - OTP-based verification with resend functionality
- ✅ **Protected Routes** - Auth guard for secured pages
- ✅ **Auto Token Refresh** - Seamless session management with axios interceptors
- ✅ **Beautiful UI** - Modern, responsive design with Tailwind CSS
- ✅ **Form Validation** - Yup schema validation with react-hook-form
- ✅ **Toast Notifications** - User-friendly feedback system
- ✅ **TypeScript** - Fully typed for better development experience

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios
- **UI Components**: Custom components with Tailwind

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your backend API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

## Project Structure

```
src/
├── api/              # API client and endpoints
│   ├── axios.ts          # Axios instance with interceptors
│   ├── auth.api.ts       # Authentication API calls
│   └── email.api.ts      # Email verification API calls
├── app/              # Redux store configuration
│   ├── store.ts          # Redux store setup
│   └── hooks.ts          # Typed Redux hooks
├── auth/             # Authentication logic
│   ├── auth.slice.ts     # Redux auth slice
│   └── auth.guard.tsx    # Protected route component
├── components/       # Reusable UI components
│   ├── layout/           # Layout components
│   └── ui/               # UI primitives (Button, Input)
├── constants/        # App-wide constants
│   ├── api.constants.ts  # API endpoints
│   └── routes.constants.ts # Route paths
├── pages/            # Route pages
│   ├── Login.tsx         # Login page
│   ├── Register.tsx      # Registration page
│   ├── VerifyEmail.tsx   # Email verification page
│   └── Profile.tsx       # Protected profile page
├── router/           # React Router configuration
├── services/         # Business logic services
├── styles/           # Global styles
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## User Flows

### Registration & Email Verification
1. User fills out registration form
2. Backend creates account and sends OTP via email
3. User redirected to verify email page
4. Enter 6-digit OTP from email
5. Account verified → Redirect to login

### Login
1. User enters email and password
2. Backend validates and issues tokens (httpOnly cookies)
3. Redirect to profile page

### Google OAuth
1. User clicks "Sign in with Google"
2. Redirect to Google consent screen
3. Google redirects back with tokens
4. Auto-login → Profile page

### Protected Routes
- AuthGuard checks authentication state
- Unauthenticated users → Redirect to login
- Authenticated users → Access granted

### Auto Token Refresh
- Axios interceptor detects 401 errors
- Automatically calls refresh endpoint
- Retries original request with new token
- Seamless user experience

## Key Features Detail

### 🔐 Security
- **HttpOnly Cookies**: Tokens never exposed to JavaScript
- **CORS**: Credentials included in all requests
- **XSS Prevention**: React's built-in sanitization
- **Input Validation**: Client-side validation with Yup

### 🎨 UI/UX
- **Responsive Design**: Mobile-first approach
- **Loading States**: Visual feedback for all async operations
- **Error Handling**: Detailed validation errors displayed
- **Toast Notifications**: Success/error feedback
- **Clean Design**: Modern, professional interface

### ⚡ Performance
- **Code Splitting**: Route-based lazy loading
- **Optimized Builds**: Vite for fast builds
- **Small Bundle**: Tree-shaking and minification

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

See `.env.example` for required variables:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

For production:
```env
VITE_API_URL=https://your-api-domain.com/api/v1
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Build for Production
```bash
npm run build
```

The `dist/` folder will contain optimized production files.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured for your frontend URL
- Check `CLIENT_URL` in backend `.env`

### 401 Errors
- Clear browser cookies
- Check if backend is running
- Verify API_BASE_URL in `.env`

### Google OAuth Not Working
- Verify Google OAuth credentials in backend
- Check redirect URIs in Google Console

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT

## Author

Your Name
