import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URL;

if (!url) {
    throw new Error('MONGODB_URL not set')
}

const client = new MongoClient(url);

const mongodb = async () => {
  try {
    await client.connect();
    console.log('Connected correctly to server');
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

mongodb().catch(console.error);
