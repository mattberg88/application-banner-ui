import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className='ui message'>
    <div className='header'>404 Not Found</div>
    <p>
      The page you are looking for does not exist.
      <Link to='/'>Click here</Link>
      to return to the main page.
    </p>
  </div>
);

export default NotFound;
