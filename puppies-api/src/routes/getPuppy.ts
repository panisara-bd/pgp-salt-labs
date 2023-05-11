import { getOnePuppy } from '../db';
import { Request, Response } from 'express';

export const getPuppyByIdRoute = async (req: Request, res: Response) => {
  const id = req.params.id!;
  try {
    const puppy = await getOnePuppy(id);
    if (!puppy) {
      res.status(404).json({ message: 'Puppy not found' });
      return;
    }

    res.status(200).json({ puppy });

  } catch (e) {
    if (e instanceof Error && e.name === 'BSONError') {
      res.status(404).json({ message: 'Puppy not found' });
      return;
    }
    
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
