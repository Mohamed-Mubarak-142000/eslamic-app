import AllGuran from "@components/quran/AllGuran";
import Layout from "@layout/Layout";
import Azkar from "@pages/Azkar/Azkar";
import LibraryItems from "@pages/Library/Library";
import Ahadith from "@pages/ahadith/Ahadith";
import Error from "@pages/error/Error";
import Home from "@pages/home/Home";
import Login from "@pages/login/Login";
import PrayerTiming from "@pages/prayerTiming/prayerTiming";
import Register from "@pages/register/Register";
import Surah from "@pages/surah/Surah";
import Tafser from "@pages/tafser/Tafser";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "ahadith",
          element: <Ahadith />,
        },
        {
          path: "tafser",
          element: <Tafser />,
        },
        {
          path: "azkar",
          element: <Azkar />,
        },
        {
          path: "surah/:number",
          element: <Surah />,
        },
        {
          path: "all-quran",
          element: <AllGuran />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "prayer-timing",
          element: <PrayerTiming />,
        },
        {
          path: "library",
          element: <LibraryItems />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
