import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SignUp from './pages/signup';
import Nav from './pages/nav';
import View from './pages/view';
import Add from './pages/add';
import AddEntertainment from './pages/addEntertainment';
import AddFood from './pages/addFood';
import AddUtility from './pages/addUtility';
import Welcome from './pages/welcome';

// Define router configuration
const routerConfig = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "/expenselens/signup", element: <SignUp /> },
  { path: "/expenselens/nav", element: <Nav /> },
  { path: "/expenselens/view", element: <View /> },
  { path: "/expenselens/add", element: <Add /> },
  { path: "/expenselens/addEnt", element: <AddEntertainment /> },
  { path: "/expenselens/addFood", element: <AddFood /> },
  { path: "/expenselens/addUtil", element: <AddUtility /> }
]);

// Main App Component
function App() {
  return (
    <>
      <RouterProvider router={routerConfig} />
      <ToastContainer />
    </>
  );
}

export default App;
