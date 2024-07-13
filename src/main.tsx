import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from "react-query";
import { AppContextProvider } from './contexts/contextApp.tsx';
import { SearchContextProvider } from './contexts/searchContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
        <App />
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
