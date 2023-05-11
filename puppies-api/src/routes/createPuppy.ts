import { Request, Response } from 'express';
import { createPuppy, getOnePuppy } from '../db';
import { schema } from '../schema';

export const createPuppyRoute = async (req: Request, res: Response) => {
  const validation = schema.validate(req.body)

  if (validation.error
  ) {
    return res.status(400).json({
      message: 'Breed, name, and birth date strings are required',
    });
  }
    const result = await createPuppy(validation.value);
    const puppy = await getOnePuppy(result.insertedId.toString())
    return res.status(201).json({puppy});
  };
