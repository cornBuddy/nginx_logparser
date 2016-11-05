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
    = document.querySelector('select[name="aggregate-by"]')

function updateData() {
  // TODO: this returns string representation of date, get timestamp
  const date = timestampWidget.value;
  const timestamp = null;
  const period = periodWidget.value;
  const aggregateBy = aggregateByWidget.value;
  const canvas = initContext();
  const mainLogModel = new Model(API);
  mainLogModel.data({ timestamp: timestamp })
    .then(aggregateBy(aggregateBy, { period: period }))
    .then(drawDiagram(canvas))
    .catch(showError);
}

aggregateBy.onchage = periodWidget.onchange = timestampWidget.onchange
    = updateData;
// TODO: set default date here, month ago or something
