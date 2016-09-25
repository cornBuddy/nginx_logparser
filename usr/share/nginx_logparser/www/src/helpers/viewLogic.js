import Chart from 'src/chart.js';

// this rembers chart for cleaning
let chart = null;

/**
 * Getting diagram context
 * @returns {NodeElement} canvas
 */
export function initContext() {
  return document.querySelector('canvas').getContext('2d');
}

/**
 * Drawing diagram on selected context
 * @param {NodeElement} context - Diagram context (canvas)
 * @returns {function} closure for promise
 */
export function drawDiagram(context) {
  return function(data) {
    chart && chart.destroy();
    const diagram = {
      type: 'line',
      data: {
        labels: ['some', 'labels', 'here'],
        datasets: [{
          label: 'dataset label',
          data: [1, 2, 3],
        }],
      },
    };
    chart = new Chart(context, diagram);
  };
}

/**
 * Saying user about HTTP-response error if any
 * @param {Object} response - HTTP-response with error
 * @return {undefined}
 */
export function showError(response) {
  console.log(response);
  alert('something went wrong');
}
