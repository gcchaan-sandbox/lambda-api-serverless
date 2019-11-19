import { API } from 'lambda-api';
import { sushi } from './sushi';
export const api: API = require('lambda-api')();

api.get('/status', async (req, res) => {
  return { message: 'OK' };
});

// sushi
api.get('/sushi/:id', sushi.show);
api.get('/sushi/', sushi.index);
api.post('/sushi/', sushi.create);
api.put('/sushi/', sushi.update);
api.delete('/sushi/', sushi.destroy);
