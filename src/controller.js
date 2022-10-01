import * as yup from 'yup';
import { posts } from './view';

const uniq = (arr) => {
  const seen = {};
  return arr.filter((x) => {
    const key = JSON.stringify(x);
    return !(key in seen) && (seen[key] = x);
  });
};

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
  return { feedName, feedPosts };
};

const getRss = (url, state, watchedState, i18n) => {
  fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((response) => {
      console.log(response);
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.');
    })
    .then((data) => data.contents)
    .then((xml) => {
      parse(xml).feedPosts.map((i) => state.posts.push(i));
      Object.assign(state.postsName, parse(xml).feedName);
    })

    .then(() => validate(i18n, watchedState, url, state))
    .then(() => {
      watchedState.form.valid = true;
      watchedState.form.data.push(url);
      watchedState.message = i18n.t('validRss');
    })
    .then(() => posts(state))
    .catch((err) => {
      watchedState.form.valid = false;
      watchedState.message = err.message;
    });
};
export default getRss;
