import http from 'http';

const DEFAULT_STATUS = 200;

const DEFAULT_MESSAGE = 'hello world';

/**
 * Function creates simple development server
 * @param {Number} status - Status code of response
 * @param {String} message - Response body
 * @returns {http-server} Http server with given params
 */
function createServer(status=DEFAULT_STATUS, message=DEFAULT_MESSAGE) {
  const doNothing = () => null;
  const throwError = function(error) {
    throw error;
  };
  return http.createServer((request, response) => {
    request
      .on('error', throwError)
      .on('data', doNothing)
      .on('end', () => {
        response.on('error', throwError);
        response.writeHead(status, {'Content-Type': 'application/json'});
        response.end(message);
      });
  });
}

export { createServer, DEFAULT_MESSAGE };
