// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import onChange from 'on-change';
import i18next from 'i18next';
import { successInput, dangerInput } from './view';
import validate from './controller';
import lng from './locales/ru';

const runApp = async () => {
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
    },
    message: '',
  };
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: lng,
  }).then(() => {
    state;
  });

  const watchedState = onChange(state, () => {
    // console.log(state);
    if (state.form.valid === true) {
      return successInput(state);
    }
    return dangerInput(state);
  });
  state.elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = data.get('url');
    validate(i18n, watchedState, url);
  });
};

runApp();
