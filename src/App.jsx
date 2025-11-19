import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';

import { Home } from './pages/Home.jsx';
import { Page1 } from './pages/Page1.jsx';
import { Page2 } from './pages/Page2.jsx';
import { Navbar } from './components/Navbar.jsx';
import './App.css';

const App = ()=>{
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path : '/',
      element : <>
        <Navbar />
        <Home />
      </>
    },
    {
      path : '/products',
      element : <>
        <Navbar />
        <Page1 />
      </>
    },
    {
      path : '/confirm',
      element : <>
        <Navbar />
        <Page2 />
      </>
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
};
export default App;
