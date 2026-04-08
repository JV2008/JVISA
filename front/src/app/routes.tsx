import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Dashboard } from "./components/Dashboard";
import { Extrato } from "./components/Extrato";
import { TransactionDetail } from "./components/TransactionDetail";
import AdminPage from "./(Pages)/admin/page";
import LoginPage from "./components/LoginPage";
import { AnalistaPage } from "./(Pages)/Analista/page";
import { RoleBased } from "./components/specify/ButtonAdmin";
import RegisterPage from "./components/Register";


export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },

  {
    path: "/register",
    Component: RegisterPage, 
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: (

          <Dashboard />

        ),
      },
      {
        path: "extrato",
        element: (
          <Extrato />
        ),
      },
      {
        path: "transacao/:id",
        element: (
          <TransactionDetail />
        ),
      },

      // 🔥 ROTA EXCLUSIVA ADMIN
      {
        path: "admin",
        element: (
          <RoleBased roles={["ADMIN"]} redirect>
            <AdminPage />
          </RoleBased>
        ),
      },
      {
        path: "analista",
        element: (
          <AnalistaPage />
        ),
      },
    ],
  },
]);