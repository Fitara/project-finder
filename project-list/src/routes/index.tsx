import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../components/Layout';
import ProjectDetail from '../pages/ProjectDetail';

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/project/:username/:projectName',
        element: <ProjectDetail />
      }
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;