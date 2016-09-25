import Model from './helpers/model';
import { initContext, drawDiagram, showError } from './helpers/viewLogic';
const API = '';


const canvas = initContext();
const mainLogModel = new Model(API);
mainLogModel.data()
  .then(drawDiagram(canvas))
  .catch(showError);
