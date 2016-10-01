import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../static/css/index.css'

import Model from './helpers/model';
import { initContext, drawDiagram, showError, aggregateBy }
  from './helpers/viewLogic';
const NODE_ENV = process.env.NODE_ENV || 'dev';
const API = NODE_ENV === 'dev'
  ? 'http://localhost:3333'
  : 'http://139.59.137.236/api/statistic';


const canvas = initContext();
const mainLogModel = new Model(API);
mainLogModel.data({ timestamp: 1474019000 })
  .then(aggregateBy('date', { period: 'day' }))
  .then(drawDiagram(canvas))
  .catch(showError);
