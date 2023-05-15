import { WithId } from 'mongodb';
import { MongoClient, ObjectId } from 'mongodb';

export type PuppyData = {
  _id?: ObjectId;
  breed: string;
  name: string;
  birthdate: string;
};

const url = process.env.MONGODB_URL;

if (!url) {
  throw new Error('MONGODB_URL not set');
}

export const mongoClient: MongoClient = new MongoClient(url);

export const createPuppy = async (puppy: PuppyData) =>
  mongoClient.db('puppies_data').collection('puppies').insertOne(puppy);

export const getAllPuppies = async () =>
  mongoClient
    .db('puppies_data')
    .collection('puppies')
    .find<WithId<PuppyData>>({})
    .toArray();

export const getOnePuppy = async (id: string) =>
  mongoClient
    .db('puppies_data')
    .collection('puppies')
    .findOne<WithId<PuppyData>>({ _id: new ObjectId(id) });

export const updatePuppy = async (id: string, puppy: PuppyData) =>
  mongoClient
    .db('puppies_data')
    .collection('puppies')
    .replaceOne({ _id: new ObjectId(id) }, puppy);

export const deletePuppy = async (id: string) =>
  mongoClient
    .db('puppies_data')
    .collection('puppies')
    .deleteOne({ _id: new ObjectId(id) });

export const searchPuppy = async (query: string) => 
  mongoClient
    .db('puppies_data')
    .collection('puppies')
    .find<PuppyData>({ $text: { $search: query } })
    .toArray();

