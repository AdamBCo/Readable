import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {'Authorization': 'Adam Cool'}
});

export const fetchPosts = () =>
  instance.get('/posts').then(function (res) {
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
