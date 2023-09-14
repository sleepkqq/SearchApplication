import router from 'Frontend/routes.js';
import { RouterProvider } from 'react-router-dom';
import AppBar from "Frontend/views/AppBar";

export default function App() {
  return (
      <div>
        <AppBar title="My App" />
        <RouterProvider router={router} />
      </div>
  );
}
