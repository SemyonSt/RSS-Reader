import onChange from 'on-change';
import i18next from 'i18next';
import * as _ from 'lodash';
import { successInput, dangerInput, loadingProcess } from './view';
import getRss from './controller';
import ru from './locales/index';

const runApp = async () => {
  const state = {
    form: {
      valid: '',
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
    postsName: {},

  };

  i18next.init({
    lng: 'ru',
    debug: true,
    resources: { ru },
  }).then(() => {
    const watchedState = onChange(state, () => {
      // console.log('STAAAAAAAATE', state)
      if (state.form.valid === 'loading') {
        return loadingProcess(state);
      }
      if (state.form.valid === true) {
        loadingProcess(state);
        return successInput(state);
      }
      loadingProcess(state);
      return dangerInput(state);
    });
    state.elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const url = data.get('url').trim();
      getRss(url, state, watchedState, i18next);
      // console.log(validate(i18next, watchedState, url));
      // getRss(url, state);
    });
  });
};

export default runApp();
