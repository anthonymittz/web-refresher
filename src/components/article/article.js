import React from 'react';
import { useParams } from 'react-router-dom';
import { useArticleData } from '../../api/blog';

function Article() {
  const {section, id} = useParams();
  const data = useArticleData(section, id);
  
  return (
    <div>
      <h1>An Article</h1>
      <small>{ JSON.stringify(data.metadata) }</small>
      { 
        data.ready && 
        <div dangerouslySetInnerHTML={{__html: data.articleHtml}} />
      }
    </div>
  );
}

export default Article;