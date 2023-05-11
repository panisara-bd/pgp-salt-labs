import { Request, Response } from 'express';
import { getOnePuppy, updatePuppy } from '../db';
import { schema } from '../schema';

export const updatePuppyRoute = async (req: Request, res: Response) => {
  const id = req.params.id!;

  const validation = schema.validate(req.body)

  if (validation.error) {
    res.status(400).json({
      error: validation.error.details,
    });
    return;
  }

  try {
    await updatePuppy(id, validation.value);
    const updatedPuppy = await getOnePuppy(id)
    res.status(200).json({ puppy: updatedPuppy });
  } catch (e) {
    if (e instanceof Error && e.name === 'BSONError') {
      res.status(404).json({ message: 'Puppy not found' });
      return;
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
