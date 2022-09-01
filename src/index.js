// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import onChange from 'on-change';
import i18next from 'i18next';
import { successInput, dangerInput } from './view';
import validate from './controller';
import ru from './locales/index';

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
  // const i18n = i18next.createInstance();
  i18next.init({
    lng: 'ru',
    debug: true,
    resources: { ru },
  }).then(() => {
    const watchedState = onChange(state, () => {
      if (state.form.valid === true) {
        return successInput(state);
      }
      return dangerInput(state);
    });
    state.elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const url = data.get('url');
      validate(i18next, watchedState, url);
      // console.log(i18next.t('notValidUrl'));
    });
  });
};

runApp();
