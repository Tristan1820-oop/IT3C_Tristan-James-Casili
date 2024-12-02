import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  const getMovies = async () => {
    try {
      const response = await axios.get('/movies');
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    console.log(lists);
    getMovies();
  }, [lists]);

  const handleDelete = async (id) => {
    const isConfirm = window.confirm(
      'Are you sure that you want to delete this data?'
    );
    if (isConfirm) {
      try {
        await axios.delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Update the state directly or fetch the updated list
        setLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
        // Optional: Uncomment this to refresh the list from the API
        // getMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <div className='lists-container'>
      <div className='create-container'>

        <button
          type='button'
          onClick={() => {
            navigate('/main/movies/form');
          }}
        >
          Create new
        </button>
      </div>
      <div className='movie-grid'>

        {lists.map((mv, index) => (
          <div className='movie-card' key={'${mv.id}-${index}'}>
            <div className='movie-card-inner'>
              <div className='movie-card-front'>
                ...
                <img
                  src={`https://image.tmdb.org/t/p/w200${mv.posterPath}`}
                  alt={mv.title}
                  className='movie-image'
                />
              </div>
              <div className='movie-card-back'>
                <div className='movie-info'>
                    <h3>{mv.title}</h3>
                  <div className='movie-actions'>

                    <button
                      onClick={() => {
                        navigate(`/main/movies/form/${mv.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(mv.id)}>
                      Delete
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  };
  
  export default Lists;
  