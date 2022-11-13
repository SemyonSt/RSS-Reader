import onChange from 'on-change';
import i18next from 'i18next';

import {
  successInput, dangerInput, loadingProcess, openPost, openModal, addPost, work,
} from './view';
import getRss from './controller';
import ru from './locales/index';

const runApp = async () => {
  const state = {
    form: {
      statusForm: '',
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
      btnPost: document.querySelector('.btn'),
    },
    message: '',
    posts: [],
    postsName: [],
    clickPosts: [],
    modal: null,

  };

  i18next.init({
    lng: 'ru',
    debug: true,
    resources: { ru },
  }).then(() => {
    const watchedState = onChange(state, (path) => {
      if (path === 'modal') {
        openPost(state);
        openModal(state);
      }
      if (path === 'posts') {
        addPost(state, i18next);
      }
      if (state.form.statusForm === 'work') {
        work(state);
      }
      if (state.form.statusForm === 'loading') {
        return loadingProcess(state);
      }
      if (state.form.statusForm === true) {
        watchedState.message = i18next.t('validRss');
        loadingProcess(state);
        return successInput(state);
      }
      if (state.form.statusForm === false) {
        loadingProcess(state);
        return dangerInput(state);
      }
      return '';
    });
    state.elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const url = data.get('url').trim();
      getRss(url, state, watchedState, i18next);
    });
    state.elements.posts.addEventListener('click', (e) => {
      const { id } = e.target;
      if (id !== '') {
        watchedState.clickPosts.push(id);
        watchedState.modal = id;
      }
    });
  });
};

export default runApp();
