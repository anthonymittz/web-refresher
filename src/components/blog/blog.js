import React from 'react';
import Section from './section';

import { useBlogData } from '../../api/blog';

function BlogContents()
{
  const data = useBlogData();
  return data.ready ? 
    <BlogList data={data.list} /> : 
    <BlogLoader />;
}

function BlogLoader()
{
  return (
    <div className='blog-loader'>Loading sections...</div>
  )
}

function BlogList({ data })
{
  return (
    <div className='blog-list'>
      <h2 className='title'>Blog</h2>
      <ul className='list'>
        { 
          data.map(section => 
            <Section title={section.title} id={section.id} key={section.id} list={section.articles} />)
        }
      </ul>
    </div>
  );
}

export default BlogContents;