import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

// Auth pages
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";

// Vendor pages
import VendorDashboard from "../pages/vendor/Dashboard";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import Settings from "../pages/admin/Settings";

// Public pages
import Welcome from "../pages/Welcome";
import Home from "../pages/Home";

// User pages
import Profile from "../pages/Profile";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Favorite from "../pages/Favorite";
import Product from "../pages/Product";


const Routes = () => {

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          // View single product, el id del producto se pasa como parametro
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/favorite",
          element: <Favorite />,
        },
      ],
    },
  ];

  const vendorRoutes = [
    {
      path: "/",
      element: <ProtectedRoute roles={["VENDOR"]} />,
      children: [
        {
          path: "/vendor/dashboard",
          element: <VendorDashboard />,
        },
      ],
    },
  ];

  const adminRoutes = [
    {
      path: "/",
      element: <ProtectedRoute roles={["ADMIN"]} />,
      children: [
        {
          path: "/admin/dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "/admin/settings",
          element: <Settings />,
        },
      ],
    },
  ];

  const publicRoutes = [
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "/",
          element: <Welcome />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ]
    }
  ];



  const router = createBrowserRouter([
    ...publicRoutes,
    ...adminRoutes,
    ...vendorRoutes,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
