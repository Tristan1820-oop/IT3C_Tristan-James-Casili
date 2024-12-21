import * as React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import MovieContextProvider from './context/MovieContext';
import { ButtonProvider } from './context/ButtonContext';
import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Register/Register';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import CastandCrew from './pages/Main/Movie/CastandCrew/CastandCrew'; 
import Photos from './pages/Main/Movie/Photos/Photos'; 
import Videos from './pages/Main/Movie/Videos/Videos';  
import Client from './pages/Client/Client';  
import Home from './pages/Client/Home/Home';  
import Movies from './pages/Client/Movies/Movies'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: 'movies',
        element: <Movie />,
        children: [
          {
            path: '',
            element: <Lists />,
          },
          {
            path: 'form/:movieId?',
            element: <Form />,
            children: [
              {
                path: 'cast-and-crews',
                element: <CastandCrew />,
              },
              {
                path: 'photos',
                element: <Photos />,
              },
              {
                path: 'videos',
                element: <Videos />,
              },
            ],
          },
        ],
      },
      {
        path: '/main/dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/home',
    element: <Client/>,
    children: [
        {
          path: '',
          element: <Home/>
        },{
          path: 'movies/:movieId',
          element: <Movies/>
        },
        {

      
        }
    ]
  }
]);

function App() {
  return (
    <MovieContextProvider>
      <UserProvider>
        <ButtonProvider>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </ButtonProvider>
      </UserProvider>
    </MovieContextProvider>
  );
}

export default App;
