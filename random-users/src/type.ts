export type User = {
    picture: {
      large: string;
    };
    name: {
      first: string;
      last: string;
    };
    dob: {
      age: number;
      date: string;
    };
    location: {
      street: {
        name: string;
        number: number;
      };
      city: string;
      country: string;
      postcode: number;
    };
  };
  