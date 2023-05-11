const request = require('supertest');
import { mongoClient } from './src/db';
import app from './src/app';
import { PuppyData } from './src/db';

const dogA: PuppyData = {
  breed: 'Beagle',
  name: 'Benjy',
  birthdate: '2017-05-11',
};

const dogB: PuppyData = {
  breed: 'Beagle',
  name: 'Penny',
  birthdate: '2017-06-27',
};

const dogC: PuppyData = {
  breed: 'French Bulldog',
  name: 'Frank',
  birthdate: '2019-11-26',
};

beforeAll(async () => {
  await mongoClient.connect();
});

afterAll(async () => {
  await mongoClient.close();
});

beforeEach(async () => {
  await mongoClient
    .db('puppies_data')
    .collection('puppies')
    .insertMany([dogB, dogC]);

  // after insertMany dogB and dogC will have the _id added
});

afterEach(async () => {
  await mongoClient.db('puppies_data').collection('puppies').drop();
});

describe('GET: all puppies', () => {
  test('get all puppies', async () => {
    const res = await request(app).get('/api/puppies');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      {
        _id: expect.any(String),
        birthdate: '2017-06-27',
        breed: 'Beagle',
        name: 'Penny',
      },
      {
        _id: expect.any(String),
        breed: 'French Bulldog',
        name: 'Frank',
        birthdate: '2019-11-26',
      },
    ]);
  });
});

describe('GET: a puppy by id', () => {
  test('get a correct puppy', async () => {
    const res = await request(app).get(`/api/puppies/${dogB._id!.toString()}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ puppy: { ...dogB, _id: dogB._id!.toString() } });
  });
  test('return 404 when id does not exist', async () => {
    const res = await request(app).get('/api/puppies/12345');
    expect(res.statusCode).toEqual(404);
  });
});

describe('POST: create puppy', () => {
  test('create puppy successful', async () => {
    const res = await request(app).post('/api/puppies').send(dogA);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ puppy: { ...dogA, _id: expect.any(String) } });
  });
  test('validate the wrong data input type', async () => {
    const res = await request(app)
      .post('/api/puppies')
      .send({ ...dogA, birthdate: 12 });
    expect(res.statusCode).toEqual(400);
  });
});

describe('PUT: updating puppy', () => {
  test('update puppy successful', async () => {
    const { _id, ...dogBWithoutId } = dogB;
    const res = await request(app)
      .put(`/api/puppies/${_id!.toString()}`)
      .send({ ...dogBWithoutId, birthdate: '2015-05-27' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      puppy: {
        ...dogBWithoutId,
        _id: _id!.toString(),
        birthdate: '2015-05-27',
      },
    });
  });
  test('validate the wrong data input type', async () => {
    const res = await request(app)
      .put(`/api/puppies/${dogB._id!.toString()}`)
      .send({ ...dogB, birthdate: 12 });
    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE: delete puppy', () => {
  test('delete puppy successful', async () => {
    const res = await request(app).delete(
      `/api/puppies/${dogC._id!.toString()}`
    );
    expect(res.statusCode).toEqual(204);
    expect(res.body).toEqual({});
    expect(
      await mongoClient
        .db('puppies_data')
        .collection('puppies')
        .find()
        .toArray()
    ).toEqual([dogB]);
  });
});
