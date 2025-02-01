# Humble Superhero API

## Introduction
The **Humble Superhero API** is a simple Node.js application that allows users to add superheroes, specifying their name, superpower, and humility score. The API then retrieves a list of superheroes sorted by humility score in increasing order.

Additionally, a React-based frontend is provided to interact with the API in real-time.
[View the Repository](https://github.com/alexpap98/humble-superhero-client)

## Features
- **Backend (NestJS/Node.js)**
  - Add new superheroes with `POST /superheroes`
  - Retrieve the sorted list with `GET /superheroes`
  - In-memory database for simplicity
  - Input validation for name (string), superpower (string), humility score (1-10)
  - Jest test for both endpoint

### Prerequisites
- Node.js (v20+ recommended)
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/alexpap98/humble-superhero-client.git
   cd humble-superhero-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the application:
   ```sh
   npm run start
   ```
4. API will be available at `http://localhost:8080`

### API Endpoints

#### `POST /superheroes`
**Description:** Adds a new superhero.
- **Request Body:**
  ```json
  {
    "name": "Spider-Man",
    "superpower": "Web-Slinging",
    "humilityScore": 9
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Spider-Man",
    "superpower": "Web-Slinging",
    "humilityScore": 9
  }
  ```

#### `GET /superheroes`
**Description:** Retrieves the list of superheroes sorted by humility score.
- **Response:**
  ```json
  [
    { "name": "Superman", "superpower": "Flight", "humilityScore": 10 },
    { "name": "Spider-Man", "superpower": "Web-Slinging", "humilityScore": 9 }
  ]
  ```

### Running Tests
To run Jest tests:
```sh
npm run test
```

---


## License
MIT

