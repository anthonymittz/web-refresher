import React from 'react';
import { Link } from 'react-router-dom';

function BlogArticle({ id, section })
{
  return (
    <article className='blog-article'>
      <Link to={`/blog/${section}/${id}`} className='title'>Article: { id }</Link>
    </article>
  )
}

export default BlogArticle;