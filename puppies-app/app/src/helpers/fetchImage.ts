export const fetchImage = async (breed: string) => {
  const breedName = breed.toLowerCase().split(' ').reverse().join('/');

  const response = await fetch(
    `https://dog.ceo/api/breed/${breedName}/images/random`
  );
  if (response.ok) {
    const result = await response.json();
    return result.message;
  } else {
    return null;
  }
};
