import React from 'react';
import Article from './article';

function BlogSection({ title = 'untitled', id = 'undefined', list = [] })
{
  return (
    <div className='blog-section'>
      <h3 className='title'>{ title } #{ id }</h3>
      <div className='articles'>
        {
          list.length === 0 ?
            <EmptySectionLabel /> :
            <SectionList section={id} list={list} />
        }
      </div>
    </div>
  );
}

function EmptySectionLabel() {
  return <i>No articles in this section yet...</i>;
}

function SectionList({ list, section }) {
  return list.map((article, key) => <Article id={article} section={section} key={key} />);
}

export default BlogSection;