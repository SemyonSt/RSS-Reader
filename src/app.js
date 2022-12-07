import onChange from 'on-change';
import i18next from 'i18next';

import {
  successInput, dangerInput, loadingProcess, lookAtPost, openModal, renderPost,
} from './view';
import getRss from './controller';
import ru from './locales/index';

const runApp = async () => {
  const state = {
    form: {
      valid: false,
      loadingProcessState: 'initial',
      processError: null,
      links: [],
    },
    message: '',
    postsName: [],
    feedsName: [],
    clickPosts: [],
    modal: null,
  };
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    btn: document.querySelector('.h-100 '),
    feedBack: document.querySelector('.feedback'),
    posts: document.querySelector('.posts'),
    feeds: document.querySelector('.feeds'),
    btnPost: document.querySelector('.btn'),
  };

  i18next.init({
    lng: 'ru',
    debug: true,
    resources: { ru },
  }).then(() => {
    const watchedState = onChange(state, (path) => {
      loadingProcess(state, elements);

      if (path === 'modal') {
        lookAtPost(state);
        openModal(state);
      }
      if (path === 'posts') {
        renderPost(state, i18next);
        // renderNewPosts(state, i18next, elements);
        // renderFeeds(state, i18next, elements);
      }
      if (state.form.valid === true) {
        successInput(state, elements, i18next);
      }
      if (state.form.valid === false) {
        dangerInput(state, elements, i18next);
      }
      return '';
    });
    elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const url = data.get('url').trim();
      getRss(url, state, watchedState, i18next, elements);
    });
    elements.posts.addEventListener('click', (e) => {
      const { id } = e.target;
      if (id !== '') {
        watchedState.clickPosts.push(id);
        watchedState.modal = id;
      }
    });
  });
};

export default runApp();
