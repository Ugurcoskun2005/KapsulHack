import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import UserPage from "./Components/Kullanici/kullanici";
import AdminPage from "./Components/Yonetici/Yonetici";

import PaymentPage from "./Components/Kullanici/Kullanici_sayfalari/odemeler";
import SurveyPage from "./Components/Kullanici/Kullanici_sayfalari/anketler";

import PaymentPage1 from "./Components/Yonetici/Yonetici_sayfalari/odemeler1";
import SurveyPage1 from "./Components/Yonetici/Yonetici_sayfalari/anketler1";

import SurveyAdd from "./Components/Yonetici/Yonetici_sayfalari/anket_ekle";
import ProfilPage from "./Components/Yonetici/Yonetici_sayfalari/profil_ekle_sil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/kullanici",
    element: <UserPage />,
  },
  {
    path: "/yonetici",
    element: <AdminPage />,
  },
  {
    path: "/odemeler",
    element: <PaymentPage />,
  },
  {
    path: "/anket",
    element: <SurveyPage />,
  },
  {
    path: "/odemeler1",
    element: <PaymentPage1 />,
  },
  {
    path: "/anket1",
    element: <SurveyPage1 />,
  },
  {
    path: "/anket_ekle",
    element: <SurveyAdd />,
  },
  {
    path: "/profil_ekle_sil",
    element: <ProfilPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
