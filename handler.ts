import 'source-map-support/register';
import { api } from './src/routes';

export const app = async (event, context) => {
  return await api.run(event, context);
};
