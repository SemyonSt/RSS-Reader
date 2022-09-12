import onChange from 'on-change';
import i18next from 'i18next';
import { successInput, dangerInput, posts } from './view';
import validate from './controller';
import ru from './locales/index';

const parse = (data) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data, 'application/xml');
  // console.log(dom);
  const domItem = dom.querySelectorAll('item');
  return Array.from(domItem).map((item) => {
    const titles = item.querySelector('title').innerHTML;
    const links = item.querySelector('link').innerHTML;
    const descriptions = item.querySelector('description').innerHTML;
    return { titles, links, descriptions };
  });
};

const runApp = async () => {
  const getRss = (url) => {
    fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then((data) => data.contents)
      .then((xml) => parse(xml).map((i) => state.posts.push(i)))
      .then(() => posts(state.posts));
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
    },
    message: '',
    posts: [],
    postsUrl: [],

  };
  console.log('!!!!!!!!!!!!!!!!!!!!!', state.posts);

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
      //posts(state);
    });
  });
};

export default runApp();
