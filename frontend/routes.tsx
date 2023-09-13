import { createBrowserRouter } from 'react-router-dom';
import {MainPageView} from "Frontend/views/MainPageView";

const router = createBrowserRouter([
  { path: '/', element: <MainPageView/>},
]);
export default router;
