import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SharedLayout from "./layouts/SharedLayout";
import About from "./pages/About";
import Home from "./pages/Home";
import Books from "./components/Books";
import BookDetails from "./pages/BookDetails";
import NotFound from "./pages/NotFound";
import BookForm from "./pages/BookForm";
import RegistrationForm from "./pages/RegistrationForm";
import UserTable from "./pages/UserTable";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="books/:id/edit" element={<BookForm />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="users" element={<UserTable />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
