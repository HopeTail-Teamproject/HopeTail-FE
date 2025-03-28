import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/navbar/Navbar";
import Footer from "./components/common/footer/Footer";
import MainPage from "./routes/mainPage/mainPage";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <div className="layout">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
        <Footer />
      </div>
    ),
    children: [{ index: true, element: <MainPage /> }],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
