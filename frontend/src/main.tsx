import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext.tsx';
export const authService = `http://localhost:5000`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='386617764478-oakae2ejh56aoimh30q5b02k8nctk9v6.apps.googleusercontent.com'>
      <AppProvider>
        <App />
      </AppProvider>
      
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
