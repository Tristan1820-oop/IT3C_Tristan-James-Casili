import { Outlet } from 'react-router-dom';
import { useButtonContext } from '../../../context/ButtonContext';

import './Movie.css';

const Movie = () => {
  const {title} = useButtonContext();

  return (
    <>
      <div className="movie-header">
        <h1>{title}</h1>
        <div className="create-container"></div>
      </div>
      <Outlet />
    </>
  );
};

export default Movie;
