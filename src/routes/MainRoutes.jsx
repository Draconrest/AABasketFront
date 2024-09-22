import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
//!import ProtectedRoute from "components/protected/ProtectedRoute";

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
/* const Param = Loadable(lazy(() => import("pages/param-cards/index")));
const ProjectSheet = Loadable(lazy(() => import("pages/project-sheet/index")));
const ProjectTable = Loadable(lazy(() => import("pages/project-table/index")));
const Assistant = Loadable(lazy(() => import("pages/assistant/index"))); */
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />, //<ProtectedRoute />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'users',
      children: [
        {
          path: 'new',
          element: <div>Nuevo usuario</div>
        },
        {
          path: 'view',
          element: <div>Vista de usuarios</div>
        }
      ]
    }
  ]
};

export default MainRoutes;
