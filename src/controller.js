import * as yup from 'yup';
import axios from 'axios';
import * as _ from 'lodash';
import { uniqueId } from 'lodash';
import parser from './parser';

const validate = async (url, listLoadedLinks) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'notValidDouble',
    },
    string: {
      url: 'notValidUrl',
    },
  });

  const schema = yup.string().url().required().notOneOf(listLoadedLinks);
  return schema.validate(url);
};

const getData = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((response) => response.data);

const uniq = (arr1, arr2) => _.differenceBy(arr1, arr2, 'titles');

const updatePost = (url, state, watchedState, i18n) => {
  getData(url)
    .then((data) => {
      const parsedData = parser(data.contents, url);
      const newPosts = uniq(parsedData.feedPosts, watchedState.dataPosts);
      if (newPosts.length >= 1) {
        watchedState.form.valid = '';
        newPosts.forEach((element) => {
          element.id = uniqueId();
        });
        watchedState.dataPosts = [...watchedState.dataPosts, ...newPosts];
      }
    })
    .then(setTimeout(() => { updatePost(url, state, watchedState, i18n); }, 5000));
};

const getRss = (url, state, watchedState, i18n) => {
  const listLoadedLinks = watchedState.dataFeeds.map((feed) => feed.link);
  validate(url, listLoadedLinks)

    .then(() => getData(url))
    .then((data) => {
      watchedState.form.valid = true;
      const dataParse = parser(data.contents, url);
      dataParse.feedPosts.forEach((i) => {
        i.id = uniqueId();
        watchedState.dataPosts.push(i);
      });

      watchedState.dataFeeds.push(dataParse.feedName);

      watchedState.form.loadingProcessState = 'initial';
      updatePost(url, state, watchedState, i18n);
    })
    .catch((err) => {
      watchedState.form.valid = false;
      watchedState.form.loadingProcessState = 'initial';

      switch (err.message) {
        case ('notValidDouble'):
          watchedState.messageError = 'notValidDouble';
          break;
        case ('notValidUrl'):
          watchedState.messageError = 'notValidUrl';
          break;
        case ('Parser Error'):
          watchedState.messageError = 'notValidRss';
          break;
        case ('Network Error'):
          watchedState.messageError = 'networkError';
          break;
        default:
          break;
      }
    });
};
export default getRss;
