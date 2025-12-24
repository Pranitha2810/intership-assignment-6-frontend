import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';

import { Home } from './pages/Home.jsx';
import { Page1 } from './pages/Page1.jsx';
import { Page2 } from './pages/Page2.jsx';
import { Navbar } from './components/Navbar.jsx';
import './App.css';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";


const App = ()=>{
  const queryClient = new QueryClient();

 const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navbar />
      <Home />
    </>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Page1 />
      </ProtectedRoute>
    )
  },
  {
    path: "/confirm",
    element: (
      <ProtectedRoute>
        <Navbar />
        <Page2 />
      </ProtectedRoute>
    )
  }
]);


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
};
export default App;
