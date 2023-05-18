import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import PuppyRoute, {
  loader as puppyRouteLoader,
  action as puppyRouteAction,
} from './routes/PuppyRoute';
import IndexRoute, { action as indexRouteAction } from './routes/IndexRoute';
import RootRoute, { loader as rootRouteLoader } from './routes/RootRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" id="root" loader={rootRouteLoader} element={<RootRoute />}>
      <Route index action={indexRouteAction} element={<IndexRoute />} />
      <Route
        path=":id"
        loader={puppyRouteLoader}
        action={puppyRouteAction}
        element={<PuppyRoute />}
      />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
