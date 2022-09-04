import { fetchData } from './factory.js';
export const fetchByTag = async (id) => {
  const postsByTag = [];
  try {
    fetchData.method = 'GET';
    fetchData.url = `https://week-2-project.herokuapp.com/posts/`;
    const data = await fetchData.getData();
    data.forEach((element) => {
      if (element.tags.includes(id)) {
        postsByTag.push(element);
      }
    });
  } catch (error) {
    console.log(error);
  }
  return postsByTag;
};

export const debounce = (cb, delay) => {
  let timeOut;
  return function (...arg) {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      cb(...arg);
    }, delay);
  };
};
