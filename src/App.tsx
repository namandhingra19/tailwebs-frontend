import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import SignupPage from "./pages/SignUpPage";
import { Teacherpage } from "./pages/Teacherpage";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: <SignupPage />,
      },
      {
        path: "/",
        element: <Teacherpage />,
      },
    ].map((route) => {
      return {
        ...route,
        element: <>{route.element}</>,
      };
    })
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
