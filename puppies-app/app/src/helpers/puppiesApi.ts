import { PuppiesType } from '../types';

export const updatePuppy = async (updatedPuppy: PuppiesType) => {
  try {
    await fetch(`http://localhost:8080/api/puppies/${updatedPuppy._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedPuppy.name,
        birthdate: updatedPuppy.birthdate,
        breed: updatedPuppy.breed,
        image: updatedPuppy.image,
      }),
    });
  } catch (e) {
    console.error(e);
  }
};

export const deletePuppy = async (id: string) => {
  try {
    await fetch(`http://localhost:8080/api/puppies/${id}`, {
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
    await fetch(`http://localhost:8080/api/puppies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newPuppy.name,
        birthdate: newPuppy.birthdate,
        breed: newPuppy.breed,
        image: newPuppy.image,
      }),
    });
  } catch (e) {
    console.error(e);
  }
};
