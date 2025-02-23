import { BrowserRouter as Router } from "react-router-dom";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={new QueryClient()}>
          <AppRoutes />
        </QueryClientProvider>
      </Suspense>
    </Router>
  );
}

export default App;