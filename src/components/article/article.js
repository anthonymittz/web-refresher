import React, { useEffect, useRef } from 'react';
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
        <Contents data={data.articleHtml} />
      }
    </div>
  );
}

function Contents({ data })
{
  const container = useRef();
  const controller = new AbortController();

  useEffect(() => {
    const images = container.current.getElementsByTagName('img');

    for (let image of images) {
      const url = image.getAttribute('src');
      
      fetch(url.replace('-thumbnail', ''), { signal: controller.signal })
        .then(response => response.blob())
        .then(blob => {
          const imageObjectUrl = URL.createObjectURL(blob);
          image.setAttribute('src', imageObjectUrl);
          image.style.filter = 'none';
        })
        .catch(_ => {});
    }

    return () => controller.abort();
  }, []);

  return (
    <article className='article' ref={container} dangerouslySetInnerHTML={{__html: data}} />
  );
}

export default Article;