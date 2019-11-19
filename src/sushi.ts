import { Request, Response } from 'lambda-api';
import { SushiDao } from './dao/sushiDao';

export class Sushi {
  async show(req: Request, res: Response) {
    const param = req.params.id;
    const sushiDao = new SushiDao(res);
    const json = await sushiDao.findById(param);
    return res.json(json);
  }
  async list(req: Request, res: Response) {
    const sushiDao = new SushiDao(res);
    const json = await sushiDao.findAll();
    return res.json(json);
  }
  async create(req: Request, res: Response) {
    // TODO: バリデーション?
    const sushiDao = new SushiDao(res);
    const json = await sushiDao.save(req.body);
    return res.json(json);
  }
  async update(req: Request, res: Response) {
    const sushiDao = new SushiDao(res);
    const json = await sushiDao.update(req.body);
    return res.json(json);
  }
  async delete(req: Request, res: Response) {
    const sushiDao = new SushiDao(res);
    const json = await sushiDao.deleteById(req.body.id);
    return res.json(json);
  }
}
