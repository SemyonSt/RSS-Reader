import * as yup from 'yup';

const schema = yup.string().url('Ссылка должна быть валидным URL').required();

const validate = async (state, url) => {
  // yup.setLocale({
  //   mixed: {
  //     default: 'RSS уже существует',
  //   },
  //   string: {
  //     url: 'Ссылка должна быть валидным URL',
  //   },
  // });
  try {
    await schema.notOneOf(state.form.data, 'RSS уже существует').validate(url);
    state.form.valid = true;
    state.form.data.push(url);
    state.message= 'RSS успешно загружен'

  } catch (err) {
    state.form.valid = false;
    state.message = err.errors[0];
  }
};

export default validate;
