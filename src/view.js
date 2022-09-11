export const dangerInput = (state) => {
  state.elements.feedBack.textContent = state.message;
  state.elements.feedBack.classList.replace('text-success', 'text-danger');
  state.elements.input.classList.add('is-invalid');
  state.elements.input.classList.replace('is-valid', 'is-invalid');
};

export const successInput = (state) => {
  state.elements.feedBack.textContent = state.message;
  state.elements.feedBack.classList.replace('text-danger', 'text-success');
  state.elements.input.classList.add('is-valid');
  state.elements.input.classList.replace('is-invalid', 'is-valid');
  state.elements.form.reset();
  state.elements.form.focus();
};

export const posts = (state) => {
  state.posts.forEach(({ titles, links, descriptions }) => {
    state.elements.posts.innerHTML = `<li>${titles}</li>`;
  });
  // state.elements.posts.innerHTML = `<li>123</li>`
};
