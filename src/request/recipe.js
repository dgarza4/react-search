import axios from 'axios';
import flatten from 'lodash/flatten';

/**
 * makes request to recipe API for certain page
 * @param {String} filter
 * @param {Number} page
 * @returns {Promise<Object[]>} promise of recipe object array
 */
export function apiRequest(filter, page) {
  return axios.get('http://www.recipepuppy.com/api/', {
    params: {
      q: filter,
      p: page
    }
  }).then((response) => response.data.results);
}

/**
 * retrives recipes by filter and limit
 * @param {String} filter
 * @param {Number} limit
 * @returns {Promise<Object[]>} promise of recipe object array
 */
export function getRecipes(filter, limit = 20) {
  const promises = [];
  const pages = limit / 10;

  for (let i = 0; i < pages; i += 1) {
    promises.push(apiRequest(filter, i + 1));
  }

  return Promise.all(promises)
    .then(responses => flatten(responses))
}
