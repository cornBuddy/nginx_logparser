import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../static/css/index.css'

import Model from './helpers/model';
import { initContext, drawDiagram, showError } from './helpers/viewLogic';
const API = 'http://139.59.137.236/api/statistic?timestamp=1469900000';


const canvas = initContext();
const mainLogModel = new Model(API);
mainLogModel.data()
  .then(drawDiagram(canvas))
  .catch(showError);
