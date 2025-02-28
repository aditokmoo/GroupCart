import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={new QueryClient()}>
          <AppRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </Router>
  );
}

export default App;