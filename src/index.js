//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as yup from 'yup';
import onChange from 'on-change';

let schema = yup.object().shape({
    website: yup.string().url()
});
/*
const state = onChange({
    form: {
        valid: true,
        processState: 'filling',
        processError: null,
    }
});
*/
const errorMessages = {
    duplicateLink: 'RSS уже существует',
    fieldRequired: 'Не должно быть пустым',
    invalidURL: 'Ссылка должна быть валидным URL',
};


const validate = (fields) => {
    try {
        schema.validateSync(
            { website: fields },
            { abortEarly: false },
          );
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

//console.log(elements.input);

elements.input.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(input.value)
    // if(validate(121) !== "Valid") {
    //     e.textContent = errorMessages.invalidURL
    // }
})