import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Loading from "./components/ui/Loading";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={new QueryClient()}>
          <AppRoutes />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
    </Router>
  );
}

export default App;