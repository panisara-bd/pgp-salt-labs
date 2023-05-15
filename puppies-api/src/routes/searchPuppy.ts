
import { searchPuppy } from '../db';
import { Request, Response } from 'express';

export const searchPuppyByQuery = async (req: Request, res: Response) => {
    const query = req.query.query;

    if (!query || typeof query != 'string'){
        res.status(400).json({message: 'Query is absent'})
        return
    }

    try {
        const searchResults = await searchPuppy(query);
        if (!searchResults) {
          res.status(404).json({ message: 'Puppy not found' });
          return;
        }
    
        res.status(200).json(searchResults);
    
      } catch (e) {
        if (e instanceof Error && e.name === 'BSONError') {
          res.status(404).json({ message: 'There is no puupy with that name/breed' });
          return;
        }
        
        res.status(500).json({ message: 'Internal Server Error' });
      }
}