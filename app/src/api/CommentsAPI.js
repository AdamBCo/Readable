import axios from 'axios';
import uuid  from 'uuid';

const instance = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {'Authorization': 'Adam Cool'}
});

export const fetchComments = (id) =>
  instance.get('/posts/'+ id + '/comments').then(function (res) {
    if (res.data.cod && res.data.message) {
      throw new Error(res.data.message);
    } else {
      console.log(res);
      return res.data;
    }
  }, function (res) {
    console.log(res);
    throw new Error(res.data.message);
  });

export const postComment = (comment) =>
  instance.post('/comments', comment).then(function (res) {
    if (res.data.cod && res.data.message) {
      throw new Error(res.data.message);
    } else {
      console.log(res);
      return res.data;
    }
  }, function (res) {
    console.log(res);
    throw new Error(res.data.message);
  });

export const updateComment = (id, body) =>
  instance.put('/comments/' + id, {
    body
  }).then(function (res) {
    if (res.data.cod && res.data.message) {
      throw new Error(res.data.message);
    } else {
      console.log(res.data);
      return res.data;
    }
  }, function (res) {
    console.log(res);
    throw new Error(res.data.message);
  });

export const deleteComment = (id) =>
  instance.delete('/comments/' + id).then(function (res) {
    if (res.data.cod && res.data.message) {
      throw new Error(res.data.message);
    } else {
      console.log(res.data);
      return res.data;
    }
  }, function (res) {
    console.log(res);
    throw new Error(res.data.message);
  });

export const upVoteComment = (id) =>
  instance.post('/comments/' + id, {
    option: "upVote"
  }).then(function (res) {
    if (res.data.cod && res.data.message) {
      throw new Error(res.data.message);
    } else {
      console.log(res.data);
      return res.data;
    }
  }, function (res) {
    console.log(res);
    throw new Error(res.data.message);
  });

export const downVoteComment = (id) =>
  instance.post('/comments/' + id, {
    option: "downVote"
  }).then(function (res) {
    if (res.data.cod && res.data.message) {
      throw new Error(res.data.message);
    } else {
      console.log(res.data);
      return res.data;
    }
  }, function (res) {
    console.log(res);
    throw new Error(res.data.message);
  });
