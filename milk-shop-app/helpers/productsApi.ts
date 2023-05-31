export const HOST = 'http://localhost:8080';

export const getAllProducts = async () => {
  const response = await fetch(`${HOST}/api/products`);
  if (!response.ok) {
    return [];
  }
  const result = await response.json();
  return result;
};

export const searchProducts = async (query: string, types: string[]) => {
  try {
    const typesQuery = types.length
      ? `&types=${types
          .map((type) => encodeURIComponent(type))
          .join('&types=')}`
      : '';

    const response = await fetch(
      `${HOST}/api/products/search?query=${query}${typesQuery}`
    );
    if (response.ok) {
      const results = await response.json();
      return results;
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
  }
};

export const fetchTypes = async () => {
  const response = await fetch(`${HOST}/api/products/types`);
  if (!response.ok) {
    return [];
  }
  const result = await response.json();
  return result;
};

export const fetchById = async (id: string) => {
  const response = await fetch(`${HOST}/api/products/${id}`);
  if (!response.ok) {
    return;
  }
  const result = await response.json();
  return result;
};
