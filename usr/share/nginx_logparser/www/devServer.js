import http from 'http';
import fixture from './test/fixture'

export default function runServer() {
  http.createServer((request, response) => {
    const doNothing = () => null;
    const throwError = function(error) {
      throw error;
    };
    request
      .on('error', throwError)
      .on('data', doNothing)
      .on('end', () => {
        response.on('error', throwError);
        response.writeHead(status, {'Content-Type': 'application/json'});
        response.end(fixture);
      });
  }).listen(8080);
}
