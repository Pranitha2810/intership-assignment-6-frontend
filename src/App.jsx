import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';

import { Page1 } from './pages/Page1.jsx';
import { Page2 } from './pages/Page2.jsx';

const App = ()=>{
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      "path" : '/',
      "element" : <Page1 />
    },
    {
      "path" : '/confirm',
      "element" : <Page2 />
    }
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
export default App;