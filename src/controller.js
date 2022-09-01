import * as yup from 'yup';

const validate = async (i18n, state, url) => {
  yup.setLocale({
    mixed: {
      notOneOf: i18n.t('notValidDouble'),
    },
    string: {
      url: i18n.t('notValidUrl'),
    },
  });

  const schema = yup.string().url().required();

  try {
    await schema.notOneOf(state.form.data).validate(url);
    state.form.valid = true;
    state.form.data.push(url);
    state.message = i18n.t('validRss');
  } catch (err) {
    state.form.valid = false;
    state.message = err.errors;
    // console.log(err.errors.map((err) => i18n.t(err.key)));
  }
};

export default validate;
