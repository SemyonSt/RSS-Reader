import * as yup from 'yup';
import axios from 'axios';
import * as _ from 'lodash';
import { uniqueId } from 'lodash';
import { renderNewPosts, renderFeeds } from './view';

const validate = async (i18n, watchedState, url) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'notValidDouble',
    },
    string: {
      url: 'notValidUrl',
    },
  });

  const schema = yup.string().url().required();
  return schema.notOneOf(watchedState.form.data).validate(url);
};

const parse = (data) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data, 'application/xml');
  const parseError = dom.querySelector('parsererror');
  if (parseError) {
    const error = new Error('notValidRss');
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
  return { feedName, feedPosts };
};

const getData = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((response) => response.data)
  .catch(() => { throw new Error('Network response was not ok.'); });

const uniq = (arr1, arr2) => _.differenceBy(arr1, arr2, 'titles');

const updatePost = (url, state, watchedState, i18n) => {
  getData(url)
    .then((data) => {
      const parsedData = parse(data.contents);
      const newPost = uniq(parsedData.feedPosts, watchedState.posts);
      if (newPost.length >= 1) {
        watchedState.form.valid = '';
        newPost.forEach((element) => {
          element.id = uniqueId();
          // watchedState.posts.push(element);
        });
        watchedState.posts = [newPost, ...watchedState.posts].flat();
      }
    })
    .then(setTimeout(() => { updatePost(url, state, watchedState, i18n); }, 5000));
};

const getRss = (url, state, watchedState, i18n) => {
  validate(i18n, watchedState, url, state)
    .then(() => {
      watchedState.form.processState = 'loading';
      return getData(url);
    })
    .then((data) => {
      parse(data.contents).feedPosts.forEach((i) => {
        state.posts.push(i);
        i.id = uniqueId();
      });

      watchedState.postsName.push(parse(data.contents).feedName);
      renderNewPosts(state, i18n);
      renderFeeds(state, i18n);
      updatePost(url, state, watchedState, i18n);
      watchedState.form.valid = true;
      watchedState.form.processState = 'work';
      watchedState.form.data.push(url);

      // watchedState.message = i18n.t('validRss');
    })
    .catch((err) => {
      watchedState.form.valid = false;
      switch (err.message) {
        case ('notValidDouble'):
          watchedState.message = i18n.t('notValidDouble');
          break;
        case ('notValidUrl'):
          watchedState.message = i18n.t('notValidUrl');
          break;
        case ('notValidRss'):
          watchedState.message = i18n.t('notValidRss');
          break;
        case ('Network response was not ok.'):
          watchedState.message = i18n.t('networkError');
          break;
        default:
          break;
      }
      // watchedState.message = err.message;
    });
};
export default getRss;
