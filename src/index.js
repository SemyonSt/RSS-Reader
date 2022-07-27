//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';

let schema = yup.string().url().required()

const state = {
    form: {
        valid: true,
        processState: 'filling',
        processError: null,
        data: []
    }
};

const errorMessages = {
    duplicateLink: 'RSS уже существует',
    fieldRequired: 'Не должно быть пустым',
    invalidURL: 'Ссылка должна быть валидным URL',
};


const validate = (fields) => {
    try {
        schema.validateSync(fields);
      return 'Valid';
    } catch (e) {
      return 'error'
    }
  };

const elements ={
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    btn: document.querySelector('.h-100 '),
    feedBack: document.querySelector('.feedback'),
}



elements.form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target);
    const url = data.get('url');
    //console.log(validate(url))
    if(validate(url) !== 'Valid') {
        elements.feedBack.textContent = errorMessages.invalidURL
        elements.input.classList.add('is-invalid')
        state.form.data.push(url)
        console.log(state.form.data);
    }
    
})