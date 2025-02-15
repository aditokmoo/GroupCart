import { lazy } from "react";
import PrivateRoute from "../components/PrivateRoute";
import RestrictToAuth from "../components/RestrictToAuth";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const GroupList = lazy(() => import("../pages/GroupList"));
const Group = lazy(() => import("../pages/Group"));
const AuthLayout = lazy(() => import("../pages/auth/AuthLayout"));
const AppLayout = lazy(() => import("../layout/AppLayout"));

export const routes = [
  { path: "/", element: <Home />, restricted: false },
  {
    path: "/login",
    element: (
      <RestrictToAuth>
        <AuthLayout headerMessage="Welcome back">
          <Login />
        </AuthLayout>
      </RestrictToAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <RestrictToAuth>
        <AuthLayout headerMessage="Create your account">
          <Register />
        </AuthLayout>
      </RestrictToAuth>
    ),
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "shopping-list",
        element: (
          <PrivateRoute>
            <GroupList />
          </PrivateRoute>
        ),
      },
      {
        path: "shopping-list/:groupId",
        element: (
          <PrivateRoute>
            <Group />
          </PrivateRoute>
        ),
      },
    ],
  },
];
