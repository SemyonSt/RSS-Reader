//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';

let schema = yup.string().matches('rss').url().required()

const state = {
    form: {
        valid: true,
        processState: 'filling',
        processError: null,
        data: []
    }
};
const message = {
    valid: 'RSS успешно загружен'
}
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
    console.log(validate(url))

    for(let links of state.form.data) {
        if(links === url) {
            elements.feedBack.textContent = errorMessages.duplicateLink
            elements.input.classList.replace('text-success', 'text-danger')
        }
    }
    if(validate(url) !== 'Valid') {
        elements.feedBack.textContent = errorMessages.invalidURL
        elements.feedBack.classList.replace('text-success', 'text-danger')
        elements.input.classList.replace('is-valid', 'is-invalid')
        
    };
    console.log(state.form.data);
    if(validate(url) === 'Valid') {
        elements.feedBack.textContent = message.valid
        elements.feedBack.classList.replace('text-danger', 'text-success');
        elements.input.classList.add('is-valid')
        state.form.data.push(url)
        elements.form.reset();
        
    }
    elements.input.focus();
    
    
    
})