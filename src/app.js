import onChange from 'on-change';
import i18next from 'i18next';
import { successInput, dangerInput, posts } from './view';
import validate from './controller';
import ru from './locales/index';

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
  // console.log(feedName, feedPosts)
  return { feedName, feedPosts };
  // return feedPosts
};

const runApp = async () => {
  const getRss = (url) => {
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
        return data.contents;
      })
      .catch((error) => state.message = error)
      .then((xml) => {
        parse(xml).feedPosts.map((i) => state.posts.push(i));
        Object.assign(state.postsName, parse(xml).feedName);
      })
      .then(() => posts(state));
  };

  const state = {
    form: {
      valid: true,
      processState: 'filling',
      processError: null,
      data: [],
    },
    elements: {
      form: document.querySelector('.rss-form'),
      input: document.querySelector('#url-input'),
      btn: document.querySelector('.h-100 '),
      feedBack: document.querySelector('.feedback'),
      posts: document.querySelector('.posts'),
      feeds: document.querySelector('.feeds'),
    },
    message: '',
    posts: [],
    postsName: {},

  };
  console.log('!!!!!!!!!!!!!!!!!!!!!', state.postsName.description);
  i18next.init({
    lng: 'ru',
    // debug: true,
    resources: { ru },
  }).then((t) => {
    const watchedState = onChange(state, () => {
      if (state.form.valid === true) {
        return successInput(state);
      }
      return dangerInput(state);
    });
    state.elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const url = data.get('url').trim();
      validate(i18next, watchedState, url);
      getRss(url);
    });
  });
};

export default runApp();
