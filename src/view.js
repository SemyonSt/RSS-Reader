export const dangerInput = (state, elements, i18n) => {
  elements.feedBack.textContent = i18n.t(`${state.messageError}`);
  elements.feedBack.classList.replace('text-success', 'text-danger');
  elements.input.classList.add('is-invalid');
  elements.input.classList.replace('is-valid', 'is-invalid');
};

export const successInput = (elements, i18n) => {
  elements.feedBack.textContent = i18n.t('validRss');
  elements.feedBack.classList.replace('text-danger', 'text-success');
  elements.input.classList.add('is-valid');
  elements.input.classList.replace('is-invalid', 'is-valid');
  elements.form.reset();
  elements.form.focus();
};

export const loadingProcess = (state, elements) => {
  if (state.form.loadingProcessState === 'loading') {
    elements.input.disabled = true;
    elements.btn.disabled = true;
  } else {
    elements.input.disabled = false;
    elements.btn.disabled = false;
  }
};

export const openModal = (state) => {
  const modalTitle = document.querySelector('.modal-title');
  const modalDescription = document.querySelector('.modal-body');
  const modalHref = document.querySelector('.full-article');
  state.dataPosts.forEach((element) => {
    if (element.id === state.viewModal) {
      modalTitle.textContent = element.titles;
      modalDescription.textContent = element.descriptions;
      modalHref.href = element.links;
    }
  });
};

export const lookAtPost = (state) => {
  state.openedPosts.forEach((i) => {
    const element = document.querySelector(`[id="${i}"]`);
    element.classList.replace('fw-bold', 'fw-normal');
  });
};
export const renderPost = (state, i18n) => {
  const ul = document.querySelector('ul');

  ul.innerHTML = '';
  // state.elements.posts.append(ul);
  state.dataPosts.forEach((element) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.textContent = element.titles;
    a.setAttribute('href', element.links);

    const button = document.createElement('button');
    button.textContent = i18n.t('view');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');

    button.setAttribute('data-bs-dismiss', 'modal');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    a.id = element.id;
    button.id = element.id;
    li.append(a, button);
    ul.append(li);
  });
  lookAtPost(state);
};

export const renderFeeds = (state, i18n, elements) => {
  const divBorder = document.createElement('div');
  divBorder.classList.add('card', 'border-0');
  if (state.dataFeeds.length <= 1) {
    // Показываю "Фиды"
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    const divBody = document.createElement('div');
    divBody.classList.add('card-body');
    const h2 = document.createElement('h2');
    h2.textContent = i18n.t('feeds');
    h2.classList.add('card-title', 'h4');
    elements.feeds.append(divBorder);
    divBorder.append(divBody, ul);
    divBody.append(h2);
  }
  const divFeed = document.querySelector('.feeds'); // получаю селектор фидов
  const ulFeed = divFeed.querySelector('ul');
  ulFeed.innerHTML = '';
  state.dataFeeds.forEach((i) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'rounded-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = i.title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = i.description;
    li.append(h3, p);
    ulFeed.prepend(li);
  });
};

export const renderNewPosts = (state, i18n, elements) => {
  const divBorder = document.createElement('div');
  divBorder.classList.add('card', 'border-0');
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  if (state.dataPosts.length <= 1) {
    const divBody = document.createElement('div');
    divBody.classList.add('card-body');
    const h2P = document.createElement('h2');
    h2P.textContent = i18n.t('posts');
    h2P.classList.add('card-title', 'h4');
    elements.posts.append(divBorder);
    divBorder.append(divBody, ul);
    divBody.append(h2P);
  }
  const divPost = document.querySelector('.posts'); // получаю селектор фидов
  const ulPost = divPost.querySelector('ul');
  ulPost.innerHTML = '';
  state.dataPosts.forEach((element) => {
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
    ulPost.prepend(li);
  });
  divBorder.append(ul);
  lookAtPost(state);
};
