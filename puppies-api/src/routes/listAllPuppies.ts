import { getAllPuppies } from '../db';
import { Request, Response } from 'express';

export const listAllPuppiesRoute = async (_req: Request, res: Response) => {
    const allPuppies = await getAllPuppies();
    return res.status(200).json(allPuppies);
}