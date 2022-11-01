import { uniqueId } from 'lodash';

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

export const work = (state) => {
  state.elements.feedBack.textContent = state.message;
  state.elements.form.focus();
};

export const loadingProcess = (state) => {
  if (state.form.valid === 'loading') {
    state.elements.input.disabled = true;
    state.elements.btn.disabled = true;
  } else {
    state.elements.input.disabled = false;
    state.elements.btn.disabled = false;
  }
};

export const posts = (state) => {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const divP = document.createElement('div');
  divP.classList.add('card', 'border-0');

  const div = document.createElement('div');
  div.classList.add('card', 'border-0');

  if (state.postsName.length <= 1) {
    const divP2 = document.createElement('div');
    divP2.classList.add('card-body');
    const h2P = document.createElement('h2');
    h2P.textContent = 'Посты';
    h2P.classList.add('card-title', 'h4');
    state.elements.posts.append(divP);
    divP.append(divP2);
    divP2.append(h2P);

    // Показываю "Фиды"
    const ul2 = document.createElement('ul');
    ul2.classList.add('list-group', 'border-0', 'rounded-0');
    const divPN2 = document.createElement('div');
    divPN2.classList.add('card-body');
    const h2 = document.createElement('h2');
    h2.textContent = 'Фиды';
    h2.classList.add('card-title', 'h4');
    state.elements.feeds.append(div);
    div.append(divPN2, ul2);
    divPN2.append(h2);
  }

  state.posts.forEach((element) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.textContent = element.titles;
    a.setAttribute('href', element.links);

    const button = document.createElement('button');
    button.textContent = 'Просмотр';
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

    button.setAttribute('data-bs-dismiss', 'modal');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    a.id = element.id;
    button.id = element.id;
    // element.id = a.id;
    li.append(a, button);
    ul.prepend(li);
  });
  divP.append(ul);

  // Показываю назване фидов
  // ul2.innerHTML = '';
  const divs = document.querySelector('.feeds'); // получаю селектор фидов
  const ul2 = divs.querySelector('ul');
  ul2.innerHTML = '';
  state.postsName.forEach((i) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'rounded-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = i.title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = i.description;
    li.append(h3, p);
    ul2.prepend(li);
  });
};

export const addPost = (state) => {
  const ul = document.querySelector('ul');

  ul.innerHTML = '';
  // state.elements.posts.append(ul);
  state.posts.forEach((element) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.textContent = element.titles;
    a.setAttribute('href', element.links);

    const button = document.createElement('button');
    button.textContent = 'Просмотр';
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

    button.setAttribute('data-bs-dismiss', 'modal');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    a.id = element.id;
    button.id = element.id;
    li.append(a, button);
    ul.prepend(li);
  });
  openPost(state);
};

// export const newPosts = (state, newposts) => {
//   const ul = document.querySelector('ul');
//   // ul.classList.add('list-group', 'border-0', 'rounded-0');
//   state.elements.posts.append(ul);
//   // console.log(uniq(state.posts))
//   newposts.forEach((element) => {
//     const li = document.createElement('li');
//     li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

//     const a = document.createElement('a');
//     a.classList.add('fw-bold');
//     a.textContent = element.titles;
//     a.setAttribute('href', element.links);

//     const button = document.createElement('button');
//     button.textContent = 'Просмотр';
//     button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

//     button.setAttribute('data-bs-dismiss', 'modal');
//     button.setAttribute('data-toggle', 'modal');
//     button.setAttribute('data-target', '#modal');

//     a.id = uniqueId();
//     button.id = a.id;
//     element.id = a.id;

//     li.append(a, button);
//     ul.append(li);
//   });
//   // Показываю "Фиды"
//   const div = document.createElement('div');
//   div.classList.add('card', 'border-0');
//   const div2 = document.createElement('div');
//   div2.classList.add('card-body');
//   const h2 = document.createElement('h2');
//   h2.textContent = 'Фиды';
//   div2.append(h2);
//   div.append(div2);
// };

export const modal = (state) => {
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-body');
  const modalHref = document.querySelector('.full-article');
  state.posts.forEach((element) => {
    if (element.id === state.modal) {
      modalTitle.textContent = element.titles;
      modalDescription.textContent = element.descriptions;
      modalHref.href = element.links;
    }
  });
};

export const openPost = (state) => {
  state.clickPosts.forEach((i) => {
    const element = document.querySelector(`[id="${i}"]`);
    element.classList.replace('fw-bold', 'fw-normal');
  });
};
