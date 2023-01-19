import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles/main.css';

const UserApp = lazy(() => import(/* webpackChunkName: "user" */ './user.js'));
const AdminApp = lazy(() => import(/* webpackChunkName: "admin" */ './admin.js'));

function Client()
{
  return(
    <HashRouter basename='/'>
      <App />
    </HashRouter>
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