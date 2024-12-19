# ECommerce API Documentation
This API allows the client to interact with the ECommerce website.
The API provides endpoints to get product details, get all items, filter all products
with a given category, search for products containing a specific term, validate user login,
validate transaction and retrieve transaction history for any given user.
Also, user can create a new user in the database if the fields meet certain requirements.

## Get all items
**Request Format:** /getProducts

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** This endpoint returns a list of all products.

**Example Request:** /getProducts

**Example Response:**

```json
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 5
  },
  ...
]
```

**Error Handling:**
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns error with `Something went wrong, please try again.`

## Validate user login
**Request Format:** /validateLogin

**Request Type:** POST

**Returned Data Format**: Plain text

**Description:** This endpoint validates the user login with the given username and password.

**Example Request:** /login

**Example Response:** If the login is successful, return the username:

```
user1
```

**Error Handling:**
- Possible 400 errors (all plain text):
  - If the username or password is incorrect, returns error with `Login failed.`
  - If the username or password is missing, returns error with `Username and password are required.`
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns error with `Something went wrong, please try again.`

## Get product details
**Request Format:** /getProductDetails/product_id

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** This endpoint returns the details of a product with the given product_id.

**Example Request:** /getProductDetails/1

**Example Response:**

```json
{
  "product_id": 1,
  "name": "Product 1",
  "price": 10.00,
  "description": "This is a description of product 1.",
  "category": "Category 1",
  "stock": 10
}
```

**Error Handling:**
- Possible 400 errors (all plain text):
  - If the product_id is not found, returns error with `Product not found.`
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns error with `Something went wrong, please try again.`

## Validate transaction
**Request Format:** /validateTransaction

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** This endpoint validates the transaction with the given username,
password, and product_id.

**Example Request:** /validateTransaction

**Example Response:** If the transaction is successful (return the transaction id):

```json
{
  "transactionID": 1
}
```

**Error Handling:**
- Possible 400 errors (all plain text):
  - If the username is not found, returns error with `User not found.`
  - If the password is incorrect, returns error with `Login failed.`
  - If the product_id is not found, returns error with `Product not found.`
- Possible 500 errors (all plain text):
  - If the product is out of stock, returns error with `Product out of stock.`
  - If something goes wrong on the server, returns error with `Something went wrong, please try again.`

## Search products
**Request Format:** /searchProducts/:searchTerm

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** This endpoint returns a list of productID that (in some fields) match the searchTerm.

**Example Request:** /searchProducts/apple

**Example Response:**

```json
[
  {
    "id": 1
  },
  ...
]
```

**Error Handling:**
- Possible 400 errors (all plain text):
  - If no products found, returns error with `No products found.`
  - If the search query is invalid, returns error with `Invalid search term.`
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns error with `Something went wrong, please try again.`

## Filter products
**Request Format:** /filterProducts/:filter

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** This endpoint returns a list of productID that match the filter category.

**Example Request:** /filterProducts/Food

**Example Response:**

```json
[
  {
    "id": 1
  },
  ...
]
```

**Error Handling:**
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns error with `Something went wrong, please try again.`

## Retrieve transaction history for any given user
**Request Format:** /getTransactionHistory

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** This endpoint retrieves the transaction history for the given user.

**Example Request:** /getTransactionHistory

**Example Response:**

```json
[
  {
    "transaction_id": 1,
    "product_id": 1,
    "product_name": "Product 1",
    "price": 5
  },
  ...
]
```

**Error Handling:**
- Possible 400 errors (all plain text):
  - If the username is not found, returns error with `User not found.`
  - If the password is incorrect, returns error with `Login failed.`
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns error with `Something went wrong, please try again.`

## Create new user
**Request Format:** /newUser

**Request Type:** POST

**Returned Data Format**: Plain Text

**Description:** This endpoint creates a new user with the given username, email and password.

**Example Request:** /newUser

**Example Response:**

```
User successfully created.
```

**Error Handling:**
- Possible 400 errors (all plain text):
  - If the username is already taken, returns error with `Username already exists.`
  - If the email is already taken, returns error with `Email already exists.`
  - If the username, email or password is missing, returns error with `Missing fields.`
  - If the email is invalid, returns error with `Invalid email.`
  - If the password does not meet the requirements, returns error with `Password does not meet the requirements.`
  - If the password does not match the confirm password, returns error with `Passwords do not match.`
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns error with `Something went wrong, please try again.`