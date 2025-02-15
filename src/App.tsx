import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { useAuthListener } from "./hooks/useAuthListener";
import { routes } from "./routes";

function App() {
  useAuthListener();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routes.map(({ path, element, children }) => (
            <Route key={path} path={path} element={element}>
              {children &&
                children.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;