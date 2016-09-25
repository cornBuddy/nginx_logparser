import Model from './helpers/model';
const API = '';


const canvas = initCanvas();
const mainLogModel = new Model(API);
mainLogModel.data()
  .then(drawDiagram(canvas))
  .catch(showError);
