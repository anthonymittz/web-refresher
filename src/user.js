import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Article from './components/article/article';

import BlogContents from './components/blog/blog';
import Notice from './components/notice';

function App()
{
  return (
    <Routes>
      <Route path='/' >
        <Route index element={<BlogContents />} />
        <Route path='/blog/:section/:id' element={<Article />} />
        <Route path='*' element={<Notice />} />
      </Route>
    </Routes>
  )
}

export default App;