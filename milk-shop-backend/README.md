# Milk Shop Backend API

This is the backend API for the Milk Shop project, built using Express. It serves as the server-side component for handling requests and providing data to the Milk Shop frontend application. The backend does not use a database but instead reads and writes data to a JSON file.

## Getting Started

To run the Milk Shop backend API, please follow these steps:

1. Clone the repository from GitHub:

```shell
git clone https://github.com/panisara-bd/pgp-salt-labs.git
```

2. Change into the project directory:

```shell
cd milk-shop-backend
```

3. Install the dependencies using npm:

```shell
npm install
```

4. Start the server:

```shell
npm start
```

By default, the server runs on `http://localhost:8125`.

## API Endpoints

The Milk Shop backend API provides the following endpoints:

### GET /api/products

Returns the list of available milk products stored in the JSON file.

### GET /api/products/:id

Returns a specific milk product with the given ID.

### GET /api/products/types

Returns all the available milk types so that they can be used in the search endpoint.

### GET /api/products/search

Returns filetered milk products based on the search query and milk type.

## JSON Data File

The backend API reads and writes data to a JSON file (`milk.json`) to store the milk product information. The file follows the following structure:

```json
{
  {
    "count": 99,
    "results": [
        {
            "name": "Dillion's unequaled cashew milk",
            "type": "Cashew milk",
            "storage": 99,
            "id": "301d5dcf-a2a8-4a34-b26b-efcaa103963c"
        },
        // Additional milk product entries...
    ]
  }
}
```

Feel free to modify the `products.json` file to add, update, or remove milk products as needed.

## Contributing

Contributions to the Milk Shop Backend API are welcome. If you find any bugs, have suggestions for improvements, or would like to add new features, please open an issue or submit a pull request on the GitHub repository.

## License

The Milk Shop backend API is open-source and available under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.