# KarkarBot - Multilingual Rejection Message API

A RESTful API service that provides random rejection messages in multiple languages (English, Spanish, Italian, French, and Arabic).

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_connection_string_here
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Database Schema

### RejectionMessage Collection

```javascript
{
  message: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['english', 'spanish', 'italian', 'french', 'arabic']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

#### Field Descriptions:
- `message`: The rejection message text (required)
- `language`: The language of the message (required, must be one of: english, spanish, italian, french, arabic)
- `createdAt`: Timestamp of when the message was created (automatically set)

#### Example Document:
```javascript
{
  "_id": "684db06f7dbf514a53da0d2b",
  "message": "Sorry, not interested.",
  "language": "english",
  "createdAt": "2024-06-14T17:25:04.000Z",
  "__v": 0
}
```

## API Endpoints

### Get Random Rejection Message
```
GET /api/rejections/random
```
Optional query parameter:
- `language`: Filter by language (english, spanish, italian, french, arabic)

### Add New Rejection Message
```
POST /api/rejections
```
Body:
```json
{
  "message": "Your rejection message here",
  "language": "english"
}
```

### Get All Rejection Messages
```
GET /api/rejections
```
Optional query parameter:
- `language`: Filter by language (english, spanish, italian, french, arabic)

## Health Check
```
GET /health
```

## Example Usage

1. Get a random rejection message:
```bash
curl http://localhost:3000/api/rejections/random
```

2. Get a random rejection message in Spanish:
```bash
curl http://localhost:3000/api/rejections/random?language=spanish
```

3. Add a new rejection message:
```bash
curl -X POST http://localhost:3000/api/rejections \
  -H "Content-Type: application/json" \
  -d '{"message": "Sorry, not interested.", "language": "english"}'
``` 