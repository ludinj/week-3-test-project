import { Post, fetchData } from './factory.js';

import { Comment } from './factory.js';
import {
  postDiv,
  likeIcon,
  likesNumber,
  postImage,
  deleteIcon,
  editIcon,
  title,
  subTitle,
  body,
  author,
  date,
  commentInput,
  commentsDiv,
  selectInput,
  commentButton,
  BASE_URL,
} from './constants.js';

let liked = false;
// let post;
const post = new Post({});
const comment = new Comment({});
const url = document.location.href;
const postId = parseInt(url.split('?')[1].split('=')[1]);

document.addEventListener('DOMContentLoaded', async () => {
  comment.postId = postId;
  comment.user = parseInt(selectInput.options[selectInput.selectedIndex].value);
  console.log(comment);
  try {
    fetchData.url = `${BASE_URL}/posts/${postId}?_embed=comments`;
    const res = await fetchData.getData();
    post.id = res.id;
    post.author = res.author;
    post.image = res.image;
    post.createDate = res.createDate;
    post.body = res.body;
    post.comments = res.comments;
    post.tags = res.tags;
    post.title = res.title;
    post.subTitle = res.subTitle;
    post.likes = res.likes;
    renderPost();
    renderComments();
    setAuthor();
  } catch (error) {
    console.log(error);
  }
});

const setAuthor = async () => {
  fetchData.url = `${BASE_URL}/authors/${post.author}`;
  const data = await fetchData.getData();
  const authorText = `${data.name} ${data.lastName}`;
  author.innerText = authorText;
};

const renderPost = () => {
  postImage.src = post.image;
  title.innerText = post.title;
  subTitle.innerText = post.subTitle;
  likesNumber.innerText = post.likes;
  body.innerText = post.body;
  date.innerText = post.createDate;
};

const renderComments = async () => {
  fetchData.url = `${BASE_URL}/users`;
  const users = await fetchData.getData();
  console.log(users);
  post.comments.forEach((ele) => {
    let userName = '';
    users.forEach((user) => {
      if (user.id === ele.user) {
        userName = `${user.name} ${user.lastName}`;
      }
    });
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `<h5>${userName}:</h5>
    <p>${ele.comment}</p>`;
    commentsDiv.appendChild(comment);
  });
};

selectInput.addEventListener('change', async () => {
  const value = parseInt(selectInput.options[selectInput.selectedIndex].value);
  comment.user = value;
  console.log(comment);
});

commentInput.addEventListener('input', (e) => {
  const value = e.target.value;
  if (value !== '') {
    commentButton.classList.add('open');
  } else {
    commentButton.classList.remove('open');
  }
  comment.comment = e.target.value;
  console.log(comment);
});

commentButton.addEventListener('click', async () => {
  fetchData.url = `${BASE_URL}/comments`;
  fetchData.method = 'POST';
  fetchData.body = comment;
  commentInput.value = '';
  commentButton.classList.remove('open');
  await fetchData.setData();
});

likeIcon.addEventListener('click', async () => {
  if (!liked) {
    liked = true;
    post.likes += 1;
    likesNumber.innerText = post.likes;
    console.log(post.likes);
    fetchData.method = 'PUT';
    fetchData.url = `${BASE_URL}/posts/${post.id}`;
    fetchData.body = { ...post };
    console.log(fetchData);
    const data = await fetchData.setData();
    console.log(data);
  }
});

deleteIcon.addEventListener('click', async () => {
  if (window.confirm('Delete post?')) {
    fetchData.method = 'DELETE';
    fetchData.url = `${BASE_URL}/posts/${post.id}`;
    await fetchData.setData();
    window.location.href = 'http://127.0.0.1:5501/';
  }
});
