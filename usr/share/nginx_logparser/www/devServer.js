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
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
        response.on('error', throwError);
        response.writeHead(200, headers);
        response.end(JSON.stringify(fixture));
      });
  }).listen(3333);
}
