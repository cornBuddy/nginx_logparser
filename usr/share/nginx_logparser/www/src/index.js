import '../static/css/index.css';

import Model from './helpers/model';
import { initContext, drawDiagram, showError, aggregateBy }
  from './helpers/viewLogic';
const NODE_ENV = process.env.NODE_ENV || 'dev';
const API = NODE_ENV === 'dev'
  ? 'http://localhost:3333'
  : 'http://139.59.137.236/api/statistic';

const timestampWidget = document.querySelector('input[name="timestamp"]');
const periodWidget = document.querySelector('select[name="period"]');
const aggregateByWidget
    = document.querySelector('select[name="aggregate-by"]');

function updateData() {
  const timestamp = Date.parse(timestampWidget.value) / 1000;
  const period = periodWidget.value;
  const aggregator = aggregateByWidget.value;
  const canvas = initContext();
  const mainLogModel = new Model(API);
  mainLogModel.data({ timestamp: timestamp })
    .then(aggregateBy(aggregator, { period: period }))
    .then(drawDiagram(canvas))
    .catch(showError);
}

function initializeWidgets() {
  aggregateBy.onchage = periodWidget.onchange = timestampWidget.onchange
      = updateData;
  const monthAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
  timestampWidget.value = monthAgo.toISOString().slice(0, 10);
  updateData();
}

initializeWidgets();
