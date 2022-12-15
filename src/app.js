import onChange from 'on-change';
import i18next from 'i18next';

import {
  successInput, dangerInput, loadingProcess, lookAtPost, openModal,
  renderNewPosts, renderFeeds,
} from './view';
import getRss from './controller';
import ru from './locales/index';

const app = async () => {
  const state = {
    form: {
      valid: false,
      loadingProcessState: 'initial',
    },
    messageError: '',
    dataPosts: [],
    dataFeeds: [],
    openedPosts: [],
    viewModal: null,
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
      // loadingProcess(state, elements);

      if (path === 'viewModal') {
        lookAtPost(state);
        openModal(state);
      }
      if (path === 'dataPosts') {
        renderNewPosts(state, i18next, elements);
      }
      if (path === 'dataFeeds') {
        renderFeeds(state, i18next, elements);
      }
      if (path === 'form.loadingProcessState') {
        loadingProcess(state, elements);
      }

      if (state.form.valid === true) {
        successInput(elements, i18next);
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
      watchedState.form.valid = false;
      watchedState.form.loadingProcessState = 'loading';
      getRss(url, state, watchedState, i18next, elements);
    });
    elements.posts.addEventListener('click', (e) => {
      const { id } = e.target;
      if (id !== '') {
        watchedState.openedPosts.push(id);
        watchedState.viewModal = id;
      }
    });
  });
};

export default app;
