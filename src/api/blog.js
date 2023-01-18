import { useState, useEffect } from 'react';
import { unified } from 'unified';
import axios from 'axios';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import rehypeStringify from 'rehype-stringify';

const mapUrl = "https://raw.githubusercontent.com/anthonymittz/web-refresher/articles/map.json";
const articleUrl = "https://raw.githubusercontent.com/anthonymittz/web-refresher/articles/articles/";

export function useBlogData()
{
  const [data, setData] = useState(null);
  const [error, setError] = useState('No error');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios
      .get(mapUrl)
      .then(response => {
        if (response.data.sections)
          setData(response.data.sections);
      })
      .catch(error => {
        setError(error); 
        console.error(error);
      })
      .finally(() => setReady(true));
  }, []);

  return {list: data, error, ready};
}

export function useArticleData(sectionId, articleId)
{
  const [articleHtml, setArticleHtml] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState('No error');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios
      .get(articleUrl + '/' + sectionId + '/' + articleId)
      .then(res => {
        unified()
          .use(remarkParse)
          .use(remarkFrontmatter)
          .use(remarkParseFrontmatter)
          .use(remarkRehype)
          .use(rehypeStringify)
          .process(res.data)
          .then(result => {
            setArticleHtml(() => result.value); 
            setMetadata(() => result.data.frontmatter)})
          .finally(() => setReady(true));
      })
      .catch(err => setError(err));
  }, []);

  return {articleHtml, metadata, error, ready};
}