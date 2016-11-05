import Http from './http';

const encodeQuery = function(data) {
  const ret = [];
  for (const d in data)
    ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
  return ret.join('&');
};

/**
 * Class represents data access layer to server
 */
export default class Model {
  /**
   * Returns JSON object from model's url
   * @param {Object} configuration - Request object
   * @returns {Object} JSON if url was given else null
   */
  data(configuration) {
    if (!this.url)
      return null;
    const queryString = encodeQuery(configuration);
    return this.constructor._parse(`${this.url}?${queryString}`);
  }
  /**
   * Returns model url
   * @returns {String} Url to remote resource
   */
  get url() {
    return this._url;
  }
  /**
   * Set url
   * @param {String} value - Url to remote resource
   */
  set url(value) {
    if (typeof value !== 'string' || !value)
      throw new TypeError(`Valid url expected, "${value}" was given`);
    this._url = value;
  }
  /**
   * Creates new model instanse with given url
   * @param {String} url - Url to remote resource
   * @constructor
   */
  constructor(url) {
    // TODO: add caching
    this.url = url;
  }
  /**
   * Function makes request to url and parse response to JSON
   * @param {String} url - Url to a remote resource
   * @returns {Promise} JSON object
   */
  static _parse(url) {
    // TODO: on server, when there is bad url, return 400
    return Http.get(url)
      .then((body) => body.json())
      .then((json) => json._data);
  }
}
