import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import { useAuthListener } from "./hooks/useAuthListener";

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/auth/Login'));
const AuthLayout = lazy(() => import('@/pages/auth/AuthLayout'));
const Register = lazy(() => import('@/pages/auth/Register'));
const ShoppingList = lazy(() => import('@/pages/ShoppingList'));
const PrivateRoute = lazy(() => import('@/components/PrivateRoute'));
const RestrictToAuth = lazy(() => import('@/components/RestrictToAuth'));

function App() {
  useAuthListener() // Check if user is logged in

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <RestrictToAuth>
              <AuthLayout headerMessage="Welcome back">
                <Login />
              </AuthLayout>
            </RestrictToAuth>
          }
          />
          <Route path="/register" element={
            <RestrictToAuth>
              <AuthLayout headerMessage="Create your account">
                <Register />
              </AuthLayout>
            </RestrictToAuth>
          }
          />
          <Route path="/shopping-list" element={
            <PrivateRoute>
              <ShoppingList />
            </PrivateRoute>
          }
          />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
