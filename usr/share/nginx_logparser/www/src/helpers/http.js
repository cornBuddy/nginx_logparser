import fetch from 'isomorphic-fetch';

/**
 * Class represents http requests layer to API
 */
export default class Http {
  /**
   * Method checks http status code for successivity
   * @param {Number} code - Numeric representation of http status code
   * @return {Boolean} True if code is successful, else false
   */
  static _isSuccessCode(code) {
    const SUCCESS_CODE = 200;
    const REDIRECT_CODE = 300;
    return code >= SUCCESS_CODE && code < REDIRECT_CODE;
  }
  /**
   * Method checks results for a status code and return http body if it's
   * okay
   * @param {http-response-object} response - Http response object
   * @returns {http-response-object} Same as input
   * @throws {Error} If bad code
   */
  static _checkStatus(response) {
    // TODO: what should we do on redirections?
    if (this._isSuccessCode(response.status)) {
      return response;
    } else {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  /**
   * Method represents http get request
   * @param {string} url - Absolute URL
   * @returns {promise} http response
   */
  static get(url) {
    // context losts inside fetch, we don't want it
    const checkStatus = this._checkStatus.bind(this);
    // TODO: what should we do on errors?
    return fetch(url)
        .then(checkStatus);
  }
}
