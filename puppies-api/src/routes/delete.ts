import { deletePuppy } from '../db';
import { Request, Response } from 'express';

export const deletePuppyRoute = async (req: Request, res: Response) => {
  const id = req.params.id!;
  try {
    await deletePuppy(id);
    res.sendStatus(204);
  } catch (e) {
    if (e instanceof Error && e.name === 'BSONError') {
      res.sendStatus(204);
      return;
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
