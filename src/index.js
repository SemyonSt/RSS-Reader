// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import onChange from 'on-change';
import { successInput, dangerInput } from './view';
import validate from './controller';

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
  message: {
    valid: 'RSS успешно загружен',
  },
  errorMessages: {
    duplicateLink: 'RSS уже существует',
    fieldRequired: 'Не должно быть пустым',
    invalidURL: 'Ссылка должна быть валидным URL',
  },
};
console.log(state.form.data);

const watchedState = onChange(state, () => {
  console.log(state);
  if (state.form.valid === true) {
    return successInput(state);
  }
  return dangerInput(state);
});

state.elements.form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const url = data.get('url');

  validate(watchedState, url);
});
