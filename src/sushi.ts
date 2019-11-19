import { HandlerFunction } from 'lambda-api';
import { sushiDao } from './dao/sushiDao';

export const sushi: { [key: string]: HandlerFunction } = {
  show: async (req, res) => {
    const param = req.params.id;
    const json = await sushiDao(res).findById(param);
    return res.json(json);
  },
  index: async (req, res) => {
    const json = await sushiDao(res).findAll();
    return res.json(json);
  },
  create: async (req, res) => {
    // TODO: バリデーション?
    const json = await sushiDao(res).save(req.body);
    return res.json(json);
  },
  update: async (req, res) => {
    // const json = await sushiDao(res).update(req.body)
    return { message: 'Hello World' };
  },
  destroy: async (req, res) => {
    const json = await sushiDao(res).removeById(req.body.id);
    return res.json(json);
  },
};
