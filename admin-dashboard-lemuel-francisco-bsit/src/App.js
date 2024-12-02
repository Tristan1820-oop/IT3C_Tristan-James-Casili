import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Register/Register';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import MoviePage from './pages/Main/Movie/MoviePage';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import CastandCrew from './pages/Main/Movie/CastandCrew/CastandCrew';
import Photos from './pages/Main/Movie/Photos/Photos';
import Videos from './pages/Main/Movie/Videos/Videos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },{
    path: '/register',
    element: <Register />,
  },{
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      
      {
        path: '/main/movies',
        element: <MoviePage />,
        children: [
          {
            path: '/main/movies',
            element: <Lists />,
          },
          {
            path: '/main/movies/form/:movieId',
            element: <Form />,
            children: [
              {
                path: '/main/movies/form/:movieId',
                element: <CastandCrew />,

              },
              {
                path: '/main/movies/form/:movieId/castandcrew',
                element: <CastandCrew />,
                 
              },
              {
                path: '/main/movies/form/:movieId/photos',
                element: <Photos />,
                   
              },
              {
                path: '/main/movies/form/:movieId/videos',
                element: <Videos />,
                 
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
