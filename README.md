
# Menu Management API

This is a Node.js backend server for menu management. The menu is divided into three parts: Category, Subcategory, and Items. The API allows you to perform CRUD operations on categories, subcategories, and items.

## Prerequisites

- Node.js (version 12 or later)
- MongoDB (version 4 or later)

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/menu-management-api.git
```

2. Navigate to the project directory:

```
cd menu-management-api
```

3. Install the dependencies:

```
npm install
```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:

```
MONGO_URI=mongodb://localhost:27017/menu-management
PORT=3000
```

Replace the `MONGO_URI` value with your MongoDB connection string if it's different.

## Running the Application

1. Start the server:

```
npm start
```

The server will start running on `http://localhost:3000`.

## API Endpoints

### Categories

- `POST /categories`: Create a new category
- `GET /categories`: Get all categories
- `GET /categories/:id`: Get a category by ID
- `PUT /categories/:id`: Edit a category

### Subcategories

- `POST /subcategories`: Create a new subcategory
- `GET /subcategories`: Get all subcategories
- `GET /subcategories/:id`: Get a subcategory by ID
- `GET /subcategories/category/:categoryId`: Get all subcategories under a category
- `PUT /subcategories/:id`: Edit a subcategory

### Items

- `POST /items`: Create a new item
- `GET /items`: Get all items
- `GET /items/:id`: Get an item by ID
- `GET /items/subcategory/:subcategoryId`: Get all items under a subcategory
- `GET /items/search/:name`: Search items by name
- `PUT /items/:id`: Edit an item

## Testing

You can use Postman or any other API testing tool to test the endpoints at `https://www.postman.com/goldensnitch/workspace/guestara-assignment/collection/28133963-30d9cf91-14b3-4b1d-bf03-fb4766ce5776?action=share&creator=28133963
`

___

# Answers to Questions

**Database Choice: MongoDB**
- Chosen for flexibility, scalability, and seamless integration with Node.js.
- Document-oriented structure aligns well with JavaScript objects.
- MongoDB's performance is advantageous for efficient API development.

**Key Learnings:**
1. Pagination and Sorting
   - Implemented for managing large datasets and enhancing user experience.
2. Input Validation and Sanitization
   - Utilized `express-validator` and `sanitize-html` to ensure data integrity and prevent security vulnerabilities.
3. Middleware Design Patterns
   - Learned various Express.js middleware patterns for error handling, validation, and database interactions, improving code organization.

**Most Challenging Aspect:**
- Handling nested relationships between categories, subcategories, and items while maintaining data consistency.
- Implementing effective search functionality based on item names required understanding regular expressions and MongoDB query language.

**Improvements with More Time:**
1. Authentication and Authorization
   - Implement user authentication and role-based access control (RBAC) for enhanced security.
2. Caching
   - Introduce caching mechanisms like Redis to optimize performance for frequently accessed data.
3. File Upload and Storage
   - Enable users to upload images for categories, subcategories, and items directly within the application.


