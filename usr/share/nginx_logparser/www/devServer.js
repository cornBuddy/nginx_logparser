import http from 'http';
import url from 'url';
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
        };
        const paramObj = url.parse(request.url, true);
        const since = Number(paramObj.query.timestamp);
        const mock = Object.create(fixture);
        mock._data = mock._data.filter(c => c.date >= since);
        response.on('error', throwError);
        response.writeHead(200, headers);
        response.end(JSON.stringify(mock));
      });
  }).listen(3333);
}
