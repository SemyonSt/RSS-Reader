import onChange from 'on-change';
import i18next from 'i18next';
import { successInput, dangerInput } from './view';
import validate from './controller';
import ru from './locales/index';

const parse = (data) => {
  const parser = new DOMParser();

  const doc1 = parser.parseFromString(data, "application/xml");
  return doc1;
};

const runApp = async () => {
  const getRss = (url) => {
    fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then((data) => console.log(data.contents));
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
    },
    message: '',
  };

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
      const url = data.get('url');
      validate(i18next, watchedState, url);
      // console.log(t('notValidUrl'));
      getRss(url);
      console.log(parse(getRss('https://ru.hexlet.io/lessons.rss')));
    });
  });
};

export default runApp();
