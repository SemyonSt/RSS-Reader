import * as yup from 'yup';
import axios from 'axios';
import * as _ from 'lodash';
import { posts, newPosts } from './view';

const validate = async (i18n, watchedState, url) => {
  yup.setLocale({
    mixed: {
      notOneOf: i18n.t('notValidDouble'),
    },
    string: {
      url: i18n.t('notValidUrl'),
    },
  });

  const schema = yup.string().url().required();
  return schema.notOneOf(watchedState.form.data).validate(url);
};

const parse = (data) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data, 'application/xml');
//console.log(data)
  const parseError = dom.querySelector('parsererror');
  if (parseError) {
    const error = new Error('Ресурс не содержит валидный RSS');
    error.isParsingError = true;
    throw error;
  }
  const feedName = {
    title: dom.querySelector('title').innerHTML,
    description: dom.querySelector('description').innerHTML,
  };

  const domItem = dom.querySelectorAll('item');
  const feedPosts = Array.from(domItem).map((item) => {
    const titles = item.querySelector('title').innerHTML;
    const links = item.querySelector('link').innerHTML;
    const descriptions = item.querySelector('description').innerHTML;
    return { titles, links, descriptions };
  });
  // console.log('feposts!!!', dom)
  return { feedName, feedPosts };
};

const getData = (url) =>
  // console.log(url)
  axios
    .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => response.data)
    .catch(() => { throw new Error('Network response was not ok.'); });

const uniq = (arr1, arr2) => _.differenceWith(arr2, arr1, _.isEqual);
// const uniqNewPost = (arr) => {
//   const seen = {};
//   return arr.filter((x) => {
//     const key = JSON.stringify(x);
//     return !(key in seen) && (seen[key] = x);
//   });
// };
const updatePost = (url, state, watchedState, i18n) => {
  getData(url)
    .then((data) => {
      const parsedData = parse(data.contents);
      const newPost = uniq(state.posts, parsedData.feedPosts);
      if (newPost.length >= 1) {
        newPost.forEach((element) => {
          state.posts.push(element);
        });
        newPosts(state, newPost);
      }
    })
    .then(setTimeout(() => { updatePost(url, state, watchedState, i18n); }, 5000));
};

const getRss = (url, state, watchedState, i18n) => {
  validate(i18n, watchedState, url, state)
    .then(() => {
      watchedState.form.valid = 'loading';
      return getData(url);
    })
    .then((data) => {
      // console.log(parse(data.contents));
      // console.log('STAAAATE', state.posts);
      // console.log('watchedState', watchedState.posts);

      parse(data.contents).feedPosts.forEach((i) => state.posts.push(i));
      Object.assign(state.postsName, parse(data.contents).feedName);
      posts(state);
      updatePost(url, state, watchedState, i18n);
      watchedState.form.valid = true;
      watchedState.form.data.push(url);
      watchedState.message = i18n.t('validRss');
    })
    .catch((err) => {
      watchedState.form.valid = false;
      watchedState.message = err.message;
    });
};
export default getRss;
