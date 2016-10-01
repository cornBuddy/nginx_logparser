import Chart from 'chart.js/src/chart';

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
 * Aggregating data by key
 * @param {String} key - aggregator
 * @returns {function} closure for promise
 */
export function aggregateBy(key, config) {
  const ascending = (l, r) => l[key] - r[key];
  const ascendingBy = k => { (l, r) => l[k] - r[k] };
  const normalizeDate = function(obj, config) {
    const date = new Date(obj.date * 1000);
    switch (config.period) {
      case 'month':
        date.setMonth(date.getMonth(), 1);
      case 'day':
        date.setHours(0, 0, 0, 0);
        break;
      default:
        throw new Error(`wrong period value: "${config.period}"`);
    }
    return date.getTime();
  };

  return function(rawData) {
    const noMeta = rawData
      .sort(ascending);
    let aggregatedData = new Map();
    for (const curr of noMeta) {
      const normalizedDate = normalizeDate(curr, config);
      const count = aggregatedData.get(normalizedDate) || 0;
      aggregatedData.set(normalizedDate, count + 1);
    }
    const sorted = [];
    for (const cur of aggregatedData.entries())
      sorted.push(cur);
    return Promise.resolve(sorted);
  };

}

/**
 * Drawing diagram on selected context
 * @param {NodeElement} context - Diagram context (canvas)
 * @returns {function} closure for promise
 */
export function drawDiagram(context) {
  return function(aggregatedData) {
    chart && chart.destroy();
    const parseDate = c => new Date(c[0]);
    const diagram = {
      type: 'line',
      data: {
        labels: aggregatedData.map(parseDate),
        datasets: [{
          label: 'dataset label',
          data: aggregatedData.map(c => c[1]),
        }],
      },
    };
    chart = new Chart(context, diagram);
    return Promise.resolve();
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
