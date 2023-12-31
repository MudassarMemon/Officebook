import csrfFetch from "./csrf";
import { RECEIVE_USER } from "./users";
export const RECEIVE_POSTS = "/posts/receivePosts";
export const RECEIVE_POST = "/posts/receivePost";
export const REMOVE_POST = "/posts/removePost";

export const receivePosts = (data) => {
  return { type: RECEIVE_POSTS, data };
};

export const receivePost = (data) => {
  return { type: RECEIVE_POST, data };
};

export const removePost = (id) => {
  return { type: REMOVE_POST, id };
};

export const getPosts = (state) => {
  if (state.posts) return Object.values(state.posts);
  return [];
};

export const getPost = (postId) => (state) => {
  if (state.posts[postId]) {
    return state.posts[postId];
  }
  return null;
};

export const fetchPosts = () => async (dispatch) => {
  const res = await csrfFetch("/api/posts");

  if (res.ok) {
    let data = await res.json();
    dispatch(receivePosts(data));
    return data;
  }
};

export const createPost = (post) => async (dispatch) => {
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    let data = await res.json();
    dispatch(receivePost(data));
    return data;
  }
};

export const updatePost = (post) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${post.id}`, {
    method: "PATCH",
    body: JSON.stringify(post),
  });

  if (res.ok) {
    let data = await res.json();
    dispatch(receivePost(data));
    return data;
  }
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removePost(postId));
  }
};

export const likePost = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${id}/like`, {
    method: "POST",
  });

  if (res.ok) {
    const post = await res.json();
    dispatch(receivePost(post));
  }
};

export const uploadPost = (post) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts`, {
    method: "POST",
    body: post.newPost,
  });

  if (res.ok) {
    let data = await res.json();
    dispatch(receivePost(data));
    return data;
  }
};

const postsReducer = (state = [], action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_POSTS:
      const newState = [];
      action.data.posts.forEach(
        (post) => (newState[Object.values(post)[0].id] = Object.values(post)[0])
      );
      return { ...newState };
    case RECEIVE_POST:
      nextState[action.data.post.id] = action.data.post;
      return nextState;
    case REMOVE_POST:
      delete nextState[action.id];
      return nextState;
    case RECEIVE_USER:
      const usersPosts = [];
      Object.values(action.data.user.posts).forEach((post) => {
        usersPosts[Object.values(post)[0].id] = Object.values(post)[0];
      });
      return usersPosts;
    default:
      return state;
  }
};

export default postsReducer;
