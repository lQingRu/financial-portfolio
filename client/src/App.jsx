import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import PageNotFound from './pages/general/PageNotFound';
import routes from './components/routes/routes';
// https://codesandbox.io/p/sandbox/routing-layer-react-h4yfvl?file=%2Fsrc%2Findex.css

// Here will be all the other components
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: routes,
    errorElement: <PageNotFound />,
  },
]);

function App() {
  // cannot just do <MyRoutes/>
  return <RouterProvider router={router} />;
}

export default App;
