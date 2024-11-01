import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useNavigate,
  useParams
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import ContentDetails from "./components/ContentDetails";
import Favorites from "./pages/Favorites";
import AddContent from "./pages/addContent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { useAuth } from './contexts/AuthContext';

// Layout pour les pages protégées
const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

// Layout pour les pages publiques
const PublicLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "",
        element: <Navigate to="/login" replace />
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "home",
        element: <Home />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "movies",
        element: <Movies />
      },
      {
        path: "series",
        element: <Series />
      },
      {
        path: "favorites",
        element: <Favorites />
      },
      {
        path: "add",
        element: <AddContent />
      },
      {
        path: ":type/:slug",
        element: <ContentDetails />
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;