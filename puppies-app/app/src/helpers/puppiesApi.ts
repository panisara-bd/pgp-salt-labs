import { PuppiesType } from '../types';

const HOST = 'https://tortellini.co/puppies'

export const getAllPuppies = async () => {
  const response = await fetch(`${HOST}/api/puppies`);
  if (!response.ok) {
    return [];
  }
  const result = await response.json();
  result.reverse();
  return result;
}

export const searchPuppy = async (query: string) => {
  try {
    const response = await fetch(
      `${HOST}/api/puppies/search?query=${query}`
    );
    if (response.ok) {
      const results = await response.json();
      return results
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};

export const getPuppy = async (id: string) => {
  try {
    const response = await fetch(`${HOST}/api/puppies/${id}`);
    if (response.ok) {
      const result = await response.json();
      return result.puppy;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

export const updatePuppy = async (updatedPuppy: PuppiesType) => {
  try {
    await fetch(`${HOST}/api/puppies/${updatedPuppy._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedPuppy.name,
        birthdate: updatedPuppy.birthdate,
        breed: updatedPuppy.breed,
        image: updatedPuppy.image,
        allergies: updatedPuppy.allergies,
        favFood: updatedPuppy.favFood,
        favToy: updatedPuppy.favToy,
        spayed: updatedPuppy.spayed,
        about: updatedPuppy.about,
      }),
    });
  } catch (e) {
    console.error(e);
  }
};

export const deletePuppy = async (id: string) => {
  try {
    await fetch(`${HOST}/api/puppies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const addPuppy = async (newPuppy: PuppiesType) => {
  try {
    await fetch(`${HOST}/api/puppies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPuppy.name,
        birthdate: newPuppy.birthdate,
        breed: newPuppy.breed,
        image: newPuppy.image,
        allergies: newPuppy.allergies,
        favFood: newPuppy.favFood,
        favToy: newPuppy.favToy,
        spayed: newPuppy.spayed,
        about: newPuppy.about,
      }),
    });
  } catch (e) {
    console.error(e);
  }
};
