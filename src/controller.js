import * as yup from 'yup';
import { posts } from './view';

const parse = (data) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data, 'application/xml');

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
const uniq = (arr) => {
  const seen = {};
  return arr.filter((x) => {
    const key = JSON.stringify(x);
    return !(key in seen) && (seen[key] = x);
  });
};
const getRss = (url, state) => {
  // console.log(uniq(state.posts))
  fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.');
    })
    .then((data) => {
      if (data.contents === null) {
        const error = new Error('Ресурс не содержит валидный RSS');
        throw error;
      }
      // console.log(data.contents);
      return data.contents;
    })

    .then((xml) => {
      parse(xml).feedPosts.map((i) => state.posts.push(i));
      Object.assign(state.postsName, parse(xml).feedName);
      // return uniq(state.posts);
    })
    .then((q) => posts(state));
  // .catch((error) => {
  //   console.log(error);
  //   state.form.valid = false;
  //   state.message = error.message;
  //   console.log('1FFFFFFFASD', state.message.message, error.message);
  // });
};

const validate = async (i18n, watchedState, url, state) => {
  yup.setLocale({
    mixed: {
      notOneOf: i18n.t('notValidDouble'),
    },
    string: {
      url: i18n.t('notValidUrl'),
    },
  });

  const schema = yup.string().url().required();

  schema.notOneOf(watchedState.form.data).validate(url)
    .then(() => {
      watchedState.form.valid = true;
      watchedState.form.data.push(url);
      watchedState.message = i18n.t('validRss');
      getRss(url, state);
    })
    .catch((err) => {
      console.log(err);
      watchedState.form.valid = false;
      watchedState.message = err.message;
    });
};

export default validate;
