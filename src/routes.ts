import { API } from 'lambda-api';
import { Sushi } from './sushi';
export const api: API = require('lambda-api')();

api.get('/status', async (req, res) => {
  return { message: 'OK' };
});

// sushi
const sushi = new Sushi();
api.get('/sushi/:id', sushi.show);
api.get('/sushi/', sushi.list);
api.post('/sushi/', sushi.create);
api.put('/sushi/', sushi.update);
api.delete('/sushi/', sushi.delete);
