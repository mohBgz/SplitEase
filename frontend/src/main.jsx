import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

import Layout from "./components/Layout.jsx"; //layout component
import PageNotFound from "./components/PageNotFound.jsx";

import ItemsList from "./components/ItemsList.jsx";
import { ReceiptProvider } from "./contexts/ReceiptProvider.jsx"; // Ensure named import

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    errorElement: <PageNotFound />,
  },
  {
    path: "/items",
    element: (
      <Layout>
        <ItemsList />
      </Layout>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReceiptProvider>
      <RouterProvider router={router} />
    </ReceiptProvider>
  </StrictMode>
);
