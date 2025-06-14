# KarkarBot API

A multilingual rejection message API that provides creative and humorous ways to say "no" in multiple languages. The API is built with Node.js, Express, and MongoDB Atlas.

## Features

- Multilingual rejection messages in English, French, Italian, Arabic, and Spanish
- Random message selection
- Language-specific filtering
- RESTful API endpoints
- MongoDB Atlas integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/karkarbot.git
cd karkarbot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
MONGODB_DATABASE=your_database_name
MONGODB_COLLECTION=your_collection_name
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Get All Messages
```http
GET /api/rejections
```
Returns all rejection messages in the database.

### Get Random Message
```http
GET /api/rejections/random
```
Returns a random rejection message.

### Get Random Message by Language
```http
GET /api/rejections/random?language=english
```
Returns a random rejection message in the specified language.

### Add New Message
```http
POST /api/rejections
Content-Type: application/json

{
  "en": "English message",
  "fr": "French message",
  "it": "Italian message",
  "ar": "Arabic message",
  "es": "Spanish message"
}
```

### Health Check
```http
GET /health
```
Returns the API health status and database connection information.

## Data Structure

Each rejection message in the database has the following structure:
```json
{
  "_id": "message_id",
  "en": "English message",
  "fr": "French message",
  "it": "Italian message",
  "ar": "Arabic message",
  "es": "Spanish message",
  "createdAt": "timestamp"
}
```

## Environment Variables

- `PORT`: The port number for the server (default: 3000)
- `MONGODB_URI`: MongoDB Atlas connection string
- `MONGODB_DATABASE`: Name of the MongoDB database
- `MONGODB_COLLECTION`: Name of the collection for rejection messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 