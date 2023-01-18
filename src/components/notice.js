import React from 'react';
import { Link } from 'react-router-dom';

function Notice() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found. <Link to='/'>Return to the homepage</Link>.</p>
    </div>
  )
}

export default Notice