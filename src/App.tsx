import { lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ShoppingList = lazy(() => import('./pages/ShoppingList'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const RestrictToAuth = lazy(() => import('./components/RestrictToAuth'));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <RestrictToAuth>
            <Login />
          </RestrictToAuth>
        }
        />
        <Route path="/register" element={
          <RestrictToAuth>
            <Register />
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
    </Router>
  )
}

export default App
