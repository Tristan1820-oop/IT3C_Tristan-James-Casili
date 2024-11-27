import { useEffect, useState } from 'react';
import Loading from './Problem5Components/Loading';

export default function Problem5() {
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isUserIdle, setIsUserIdle] = useState(true);

  // 1. Show the loading spinner for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  // 2. Detect idle or typing state
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      setIsUserIdle(true); // User is idle if there's no typing after 1 second
    }, 1000); // 1 second idle timeout

    setIsUserIdle(false); // User is typing

    return () => clearTimeout(idleTimer); // Cleanup the idle timer when user types
  }, [inputValue]); // Run this effect when the inputValue changes

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ display: 'block' }}>
          <label>
            Input: <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </label>
          <p>{isUserIdle ? 'User is idle...' : 'User is typing...'}</p>
        </div>
      )}
    </>
  );
}
