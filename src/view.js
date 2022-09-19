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
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  state.elements.posts.append(ul);

  state.posts.forEach(({ titles, links }) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.textContent = titles;
    a.setAttribute('href', links);

    const button = document.createElement('button');
    button.textContent = 'Просмотр';
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

    li.append(a, button);
    ul.append(li);
  });
  // Показываю "Фиды"
  const div = document.createElement('div');
  div.classList.add('card', 'border-0');
  const div2 = document.createElement('div');
  div2.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.textContent = 'Фиды';
  div2.append(h2);
  div.append(div2);

  // Показываю назване фидов
  const ul2 = document.createElement('ul');
  ul2.classList.add('list-group', 'border-0', 'rounded-0');

  const li = document.createElement('li');
  li.classList.add('list-group-item', 'border-0', 'rounded-0');

  const h3 = document.createElement('h3');
  h3.classList.add('h6', 'm-0');
  h3.textContent = state.postsName.title;

  const p = document.createElement('p');
  p.classList.add('m-0', 'small', 'text-black-50');
  p.textContent = state.postsName.description;

  ul2.append(li);
  li.append(h3, p);
  state.elements.feeds.append(div, ul2);
};
