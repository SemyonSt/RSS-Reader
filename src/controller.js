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
      const parsedData = parser(data.contents);
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
  const listLoadedLinks = watchedState.loadedLinks;
  validate(url, listLoadedLinks)
    .then(() => {
      watchedState.form.loadingProcessState = 'loading';
      return getData(url);
    })
    .then((data) => {
      parser(data.contents).feedPosts.forEach((i) => {
        i.id = uniqueId();
        watchedState.dataPosts.push(i);
      });

      watchedState.dataFeeds.push(parser(data.contents).feedName);
      watchedState.form.loadingProcessState = 'initial';
      updatePost(url, state, watchedState, i18n);
      watchedState.form.valid = true;
      watchedState.loadedLinks.push(url);
    })
    .catch((err) => {
      watchedState.form.loadingProcessState = 'initial';
      watchedState.form.valid = false;
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
