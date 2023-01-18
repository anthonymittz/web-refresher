import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const UserApp = lazy(() => import(/* webpackChunkName: "user" */ './user.js'));
const AdminApp = lazy(() => import(/* webpackChunkName: "admin" */ './admin.js'));

function Client()
{
  return(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

function App() {
  return (
    <>
      <h1>App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserApp />
      </Suspense>
    </>    
  )
}

ReactDOM.createRoot(document.getElementById('root'))
  .render(<Client />);