import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import ClientLayout from "./layout/ClientLayout";
import HomePage from "./pages/client/HomePage";
import ProductPage from "./pages/client/ProductPage";
import ProductDetail from "./pages/client/ProductDetail";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/product/ProductList";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import ProductAdd from "./pages/admin/product/ProductAdd";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import CategoryAdd from "./pages/admin/category/CategoryAdd";
import CartPage from "./pages/cart/CartPage";
import ContactPage from "./pages/client/ContactPage";
import NewsPage from "./pages/client/NewsPage";
import CheckoutPage from "./pages/cart/CheckoutPage";
import BillDetail from "./pages/cart/BillDetailPage";
import AboutPage from "./pages/client/AboutPage";
import SigninPage from "./pages/auth/SigninPage";
import SignupPage from "./pages/auth/SignupPage";
import UserList from "./pages/admin/user/UserList";
import UserUpdate from "./pages/admin/user/UserUpdate";
import CommentList from "./pages/admin/comment/CommentList";
import BillList from "./pages/admin/Bill/BillList";
import BillUpdate from "./pages/admin/Bill/BillUpdate";
import NotfoundPage from "./pages/client/NotfoundPage";
import PrivateRoute from "./utils/privateRoute";
import LoginAdmin from "./utils/LoginAdmin";

export const routes = createBrowserRouter([
    {
        path: "/", // client
        element: <ClientLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "/products",
                children: [
                    { index: true, element: <ProductPage /> },
                    { path: ":id", element: <ProductDetail /> },
                ],
            },
            { path: "cart", element: <CartPage /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "bills/detail", element: <BillDetail /> },
            { path: "signin", element: <SigninPage /> },
            { path: "signup", element: <SignupPage /> },

            { path: "contact", element: <ContactPage /> },
            { path: "news", element: <NewsPage /> },
            { path: "about", element: <AboutPage /> },
        ],
    },
    { path: "checkAdmin", element: <LoginAdmin /> },
    {
        path: "/admin", // redirect /admin/dashboard
        element: <PrivateRoute isAuth={true} />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    { index: true, element: <Navigate to="dashboard" /> },
                    { path: "dashboard", element: <Dashboard /> },
                    {
                        path: "products",
                        children: [
                            { index: true, element: <ProductList /> },
                            { path: ":id/update", element: <ProductUpdate /> },
                            { path: "add", element: <ProductAdd /> },
                        ],
                    },
                    {
                        path: "categories",
                        children: [
                            { index: true, element: <CategoryList /> },
                            { path: ":id/update", element: <CategoryUpdate /> },
                            { path: "add", element: <CategoryAdd /> },
                        ],
                    },
                    {
                        path: "users",
                        children: [
                            { index: true, element: <UserList /> },
                            { path: ":id/update", element: <UserUpdate /> },
                        ],
                    },
                    { path: "comments", element: <CommentList /> },
                    {
                        path: "bills",
                        children: [
                            { index: true, element: <BillList /> },
                            { path: ":id/update", element: <BillUpdate /> },
                        ],
                    },
                ],
            }
        ]
    },
    { path: "*", element: <NotfoundPage /> },
])