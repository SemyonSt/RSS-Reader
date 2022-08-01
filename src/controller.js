import * as yup from 'yup';

const schema = yup.string().url().required();

const validate = (state, url) => {
  try {
    schema.notOneOf(state.form.data).validateSync(url);
    state.form.valid = true;
    state.form.data.push(url);
  } catch (err) {
    state.form.valid = false;
  }
};

export default validate;
