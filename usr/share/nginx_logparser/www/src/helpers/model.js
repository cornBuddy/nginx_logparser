import Http from './http';

/**
 * Class represents data access layer to server
 */
export default class Model {
  /**
   * Returns JSON object from model's url
   * @returns {Object} JSON if url was given else null
   */
  data() {
    if (!this.url)
      return null;
    return this.constructor._parse(this.url);
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
      .then((json) => json['_data']);
  }
}
