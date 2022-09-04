// const hamburgerBtn = document.getElementById('hamburgerBtn');
// const grid = document.querySelector('#grid');
// const featuresDiv = document.querySelector('#features');
// const animalsTag = document.querySelector('#animals');
// const natureTag = document.querySelector('#nature');
// const foodTag = document.querySelector('#food');
// const lifeStyleTag = document.querySelector('#lifeStyle');
// const travelTag = document.querySelector('#travel');
// const sportsTag = document.querySelector('#sports');
// const searchInput = document.querySelector('#search');
import { Post } from './factory.js';
import { fetchByTag, debounce } from './utils.js';
import { fetchData } from './factory.js';
import {
  grid,
  featuresDiv,
  animalsTag,
  hamburgerBtn,
  foodTag,
  lifeStyleTag,
  natureTag,
  searchInput,
  sportsTag,
  travelTag,
} from './constants.js';

hamburgerBtn.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

const filter = {
  query: '',
  tags: [],
};

document.addEventListener('DOMContentLoaded', async () => {
  fetchData.method = 'GET';
  fetchData.url = 'https://week-2-project.herokuapp.com/posts';
  const posts = await fetchData.getData();
  renderPosts(posts);
});

const renderPosts = (posts) => {
  featuresDiv.innerHTML = '<h1>Loading...<h1>';
  grid.innerHTML = '';
  featuresDiv.innerHTML = '';
  if (posts.length === 0) {
    featuresDiv.innerHTML = '<h1>No results..<h1>';
    return;
  }
  const features = posts.slice(0, 3);
  features.forEach((featured) => {
    const post = new Post(featured);
    const container = document.createElement('div');
    container.className = 'featured';
    container.addEventListener('click', () => {
      document.location.href = `http://127.0.0.1:5501/Post.html?id=${featured.id}`;
    });
    container.innerHTML = post.renderFeatured();
    featuresDiv.appendChild(container);
  });
  posts.slice(3).forEach((ele) => {
    const post = new Post(ele);
    post.body = `${ele.body.substring(0, 250)}...`;
    const container = document.createElement('div');
    container.className = 'grid__item';
    container.addEventListener('click', () => {
      document.location.href = `http://127.0.0.1:5501/Post.html?id=${ele.id}`;
    });
    container.innerHTML = post.renderGridItem();
    grid.appendChild(container);
  });
};

animalsTag.addEventListener('click', async () => {
  const TAG_ID = 1;
  try {
    const postsByTag = await fetchByTag(TAG_ID);
    renderPosts(postsByTag);
  } catch (error) {
    console.log(error);
  }
});
natureTag.addEventListener('click', async () => {
  const TAG_ID = 2;
  try {
    const postsByTag = await fetchByTag(TAG_ID);
    renderPosts(postsByTag);
  } catch (error) {
    console.log(error);
  }
});
foodTag.addEventListener('click', async () => {
  const TAG_ID = 3;
  try {
    const postsByTag = await fetchByTag(TAG_ID);
    renderPosts(postsByTag);
  } catch (error) {
    console.log(error);
  }
});
lifeStyleTag.addEventListener('click', async () => {
  const TAG_ID = 4;
  try {
    const postsByTag = await fetchByTag(TAG_ID);
    renderPosts(postsByTag);
  } catch (error) {
    console.log(error);
  }
});
travelTag.addEventListener('click', async () => {
  const TAG_ID = 5;
  try {
    const postsByTag = await fetchByTag(TAG_ID);
    renderPosts(postsByTag);
  } catch (error) {
    console.log(error);
  }
});
sportsTag.addEventListener('click', async () => {
  const TAG_ID = 6;
  try {
    const postsByTag = await fetchByTag(TAG_ID);
    renderPosts(postsByTag);
  } catch (error) {
    console.log(error);
  }
});

searchInput.addEventListener(
  'input',
  debounce(async (e) => {
    try {
      const value = e.target.value.trim();
      filter.query = value;
      if (filter.query) {
        fetchData.method = 'GET';
        fetchData.url = `https://week-2-project.herokuapp.com/posts/?title=${filter.query}`;
      } else {
        fetchData.method = 'GET';
        fetchData.url = `https://week-2-project.herokuapp.com/posts`;
      }
      const posts = await fetchData.getData();
      renderPosts(posts);
    } catch (error) {
      console.log(error);
    }
  }, 1000)
);
