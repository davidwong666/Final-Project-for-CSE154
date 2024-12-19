"use strict";

/**
 * This is the JavaScript file for the app.js file.
 * It contains the logic for the back-end of the website.
 * It has the following key functionalities:
 * 1. Get all products from the database.
 * 2. Get the details of a product by its ID.
 * 3. Validate a user's login credentials.
 * 4. Validate a transaction.
 * 5. Get the transaction history of a user.
 * 6. Search for products by a search term.
 * 7. Filter products by a category.
 * 8. Establish a connection to the database.
 * 9. Check if a user's password is correct.
 */

const express = require("express");
const app = express();

const multer = require("multer");

const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

const clientErrors = [
  "Missing fields.",
  "Passwords do not match.",
  "Invalid email.",
  "Password is not strong enough.",
  "Username already exists.",
  "Email already exists."
];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());

/**
 * This endpoint is used to get all the products in the database.
 * If an error occurs, it returns a 500 error.
 * If the products are successfully retrieved, it returns the products.
 * The products are sorted by their ID and returned as a JSON object.
 */
app.get("/getProducts", async function(req, res) {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).type("text")
      .send("Something went wrong, please try again.");
  }
});

/**
 * This endpoint is used to get the details of a product by its ID.
 * If the product is not found, it returns a 400 error.
 * If an error occurs, it returns a 500 error.
 */
app.get('/getProductDetails/:id', async function(req, res) {
  const id = req.params.id;
  try {
    const detail = await getProductDetailsByID(id);
    if (detail) {
      res.json(detail);
    } else {
      res.status(400).type("text")
        .send("Product not found");
    }
  } catch (err) {
    res.status(500).type("text")
      .send("Something wrong on the server");
  }
});

/**
 * This endpoint is used to validate a user's login credentials.
 * It checks if the user exists and if the password is correct.
 * If the user does not exist, it returns a 404 error.
 * If the password is incorrect, it returns a 400 error.
 * If the login is successful, it returns the username.
 * If an error occurs, it returns a 500 error.
 */
app.post("/validateLogin", async function(req, res) {
  try {
    const username = await getUser(req.body.username);
    res.type("text");
    if (username) {
      if (await checkPassword(username, req.body.password)) {
        res.send(username);
      } else {
        res.status(400)
          .send("Invalid username or password");
      }
    } else {
      res.status(404)
        .send("User not found");
    }
  } catch (err) {
    res.status(500).type("text")
      .send("Something went wrong, please try again");
  }
});

/**
 * This endpoint is used to validate a transaction.
 * It checks if the user exists, the password is correct, the product exists,
 * the product is in stock, and the transaction is successful.
 * If any of these conditions are not met, it returns an appropriate error message.
 * There is a 20% chance that the transaction will fail.
 */
app.post("/validateTransaction", async function(req, res) {
  try {
    await isValidUser(req.body.username, req.body.password);
    const product = await getProductDetailsByID(req.body.productID);
    if (!product) {
      res.status(404).type("text")
        .send("Product not found.");
    } else if (product.stock <= 0) {
      res.status(500).type("text")
        .send("Product out of stock.");
    } else if (Math.random() <= 0.2) {
      res.status(500).type("text")
        .send("Transaction failed.");
    } else {
      const transactionID = await validateTransaction(req.body.username, product.id);
      return res.json(transactionID);
    }
  } catch (err) {
    res.status(err.statusCode || 500).type("text")
      .send(err.message || "Something went wrong, please try again.");
  }
});

/**
 * This endpoint is used to get the transaction history of a user.
 * It checks if the user exists, the password is correct, and returns the transaction history.
 * If the user does not exist, it returns a 404 error.
 * If the password is incorrect, it returns a 400 error.
 * If an error occurs, it returns a 500 error.
 * If the transaction history is successfully retrieved, it returns the transaction history.
 * The transaction history is returned as a JSON object.
 * The transactions are sorted by their transaction ID.
 */
app.post("/transactionHistory", async function(req, res) {
  try {
    const username = await getUser(req.body.username);
    if (username) {
      if (await checkPassword(username, req.body.password)) {
        const db = await getDBConnection();
        const query = "SELECT * FROM transactions WHERE username = ?";
        const transactions = await db.all(query, [username]);
        await db.close();
        res.json(transactions);
      } else {
        res.status(400).type("text")
          .send("Login failed.");
      }
    } else {
      res.status(404).type("text")
        .send("User not found.");
    }
  } catch (err) {
    res.status(500).type("text")
      .send("Something went wrong, please try again.");
  }
});

/**
 * This endpoint is used to search for products by a search term.
 * It returns the products that match the search term.
 * If there is no product that matches the search term, it returns a 400 error.
 * If a server error occurs, it returns a 500 error.
 * The products are returned as a JSON object.
 * The products are sorted by their ID.
 */
app.get("/searchProducts/:searchTerm", async function(req, res) {
  try {
    const db = await getDBConnection();
    const query =
      "SELECT p.id FROM products p, details d WHERE p.id = d.id AND " +
      "(name LIKE ? OR description LIKE ? OR category LIKE ?) ORDER BY p.id";
    const term = "%" + req.params.searchTerm + "%";
    const products = await db.all(query, [term, term, term]);
    await db.close();
    if (products.length === 0) {
      res.status(400).type("text")
        .send("No products found.");
    } else {
      res.json(products);
    }
  } catch (err) {
    res.status(500).type("text")
      .send("Something went wrong, please try again.");
  }
});

/**
 * This endpoint is used to filter products by a category.
 * It returns a list of products' ids that match the category.
 * If an error occurs, it returns a 500 error.
 */
app.get("/filterProducts/:filter", async function(req, res) {
  try {
    const db = await getDBConnection();
    const query =
      "SELECT p.id FROM products p, details d WHERE p.id = d.id AND category = ?";
    const products = await db.all(query, [req.params.filter]);
    await db.close();
    res.json(products);
  } catch (err) {
    res.status(500).type("text")
      .send("Something went wrong, please try again.");
  }
});

/**
 * This endpoint is used to create a new user.
 * It checks whether the filled fields are valid.
 * If the user is successfully created, it returns a success message.
 */
app.post("/newUser", async function(req, res) {
  try {
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    validateFields(username, email, password, confirmPassword);
    await checkExistingUser(username, email);
    const db = await getDBConnection();
    await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    await db.close();
    res.type("text").send("User created successfully.");
  } catch (err) {
    if (clientErrors.includes(err.message)) {
      res.status(400)
        .send(err.message);
    } else {
      res.status(500)
        .send("Something went wrong, please try again.");
    }
  }
});

/**
 * This function is used to validate the fields of a new user.
 * It checks if the username, email, password, and confirm password fields are filled.
 * If any of the fields are missing, it throws an error.
 * If the password and confirm password do not match, it throws an error.
 * If the email is invalid, it throws an error.
 * If the password is not strong enough, it throws an error.
 * @param {String} username: The username of the user.
 * @param {String} email: The email of the user.
 * @param {String} password: The password of the user.
 * @param {String} confirmPassword: The confirm password of the user.
 */
function validateFields(username, email, password, confirmPassword) {
  if (!username || !email || !password || !confirmPassword) {
    throw new Error("Missing fields.");
  } else if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  } else if (!isValidEmail(email)) {
    throw new Error("Invalid email.");
  } else if (!isStrongPw(password)) {
    throw new Error("Password is not strong enough.");
  }
}

/**
 * This function is used to check if the username or email already exists in the database.
 * If the username already exists, it throws an error.
 * @param {String} username: The username of the user.
 * @param {String} email: The email of the user.
 */
async function checkExistingUser(username, email) {
  if (await getUser(username)) {
    throw new Error("Username already exists.");
  } else if (await getEmail(email)) {
    throw new Error("Email already exists.");
  }
}

/**
 * Gets all the products in the database.
 * @returns {Array} An array of all the products in the database.
 */
async function getProducts() {
  const db = await getDBConnection();
  const products = await db.all("SELECT * FROM products ORDER BY id");
  await db.close();
  return products;
}

/**
 * Gets the details of a product by its ID.
 * @param {number} productID: The ID of the product.
 * @returns {Object} The details of the product.
 */
async function getProductDetailsByID(productID) {
  const db = await getDBConnection();
  const qeury = "SELECT * FROM products p, details d WHERE p.id = ? AND p.id = d.id";
  const detail = await db.get(qeury, productID);
  await db.close();
  return detail;
}

/**
 * Gets the user with the given username.
 * @param {String} username: The username of the user.
 * @returns {String} The username of the user if found, null otherwise.
 */
async function getUser(username) {
  const db = await getDBConnection();
  const query = "SELECT username FROM users WHERE username = ?";
  const result = await db.get(query, [username]);
  await db.close();
  if (result) {
    return result.username;
  }
  return null;
}

/**
 * Gets the email with the given email.
 * @param {String} email: The email of the user.
 * @returns {String} The email of the user if found, null otherwise.
 */
async function getEmail(email) {
  const db = await getDBConnection();
  const query = "SELECT email FROM users WHERE email = ?";
  const result = await db.get(query, [email]);
  await db.close();
  if (result) {
    return result.email;
  }
  return null;
}

/**
 * Checks if the password is correct for the given username.
 * @param {String} username: The username of the user.
 * @param {String} password: The password of the user.
 * @returns {Boolean} True if the password is correct, false otherwise.
 */
async function checkPassword(username, password) {
  const db = await getDBConnection();
  const query = "SELECT password FROM users WHERE username = ?";
  const result = await db.get(query, [username]);
  await db.close();
  if (result) {
    return result.password === password;
  }
  return false;
}

/**
 * Validates a transaction for a user.
 * @param {String} username: The username of the
 * @param {number} productID: The ID of the product.
 * @returns {Object} The transaction ID of the transaction.
 */
async function validateTransaction(username, productID) {
  const db = await getDBConnection();
  const updateQuery = "UPDATE details SET stock = stock - 1 WHERE id = ?";
  await db.run(updateQuery, [productID]);
  const SelectQuery = "SELECT * FROM products WHERE id = ?";
  const product = await db.get(SelectQuery, [productID]);
  const insertQuery =
    "INSERT INTO transactions (username, productID, productName, price) VALUES (?, ?, ?, ?)";
  await db.run(insertQuery, [
    username,
    product.id,
    product.name,
    product.price
  ]);
  const idQuery = "SELECT transactionID FROM transactions ORDER BY transactionID DESC LIMIT 1";
  const transactionID = await db.get(idQuery);
  await db.close();
  return transactionID;
}

/**
 * Checks if the user exists and if the password is correct.
 * @param {String} username: The username
 * @param {String} password: The password
 */
async function isValidUser(username, password) {
  const user = await getUser(username);
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  const isValid = await checkPassword(user, password);
  if (!isValid) {
    const error = new Error("Login failed.");
    error.statusCode = 401;
    throw error;
  }
}

/**
 * Checks if the email is valid.
 * @param {String} email: The email to check.
 * @returns {Boolean} True if the email is valid, false otherwise.
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {Object} The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: 'fp.db',
    driver: sqlite3.Database
  });
  return db;
}

/**
 * This function is used to check if the password is strong.
 * A strong password should have at least 8 characters, an uppercase letter,
 * a lowercase letter, a number, and a special character.
 * @param {String} password: The password to check
 * @returns {Boolean} True if the password is strong, false otherwise.
 */
function isStrongPw(password) {
  if (password.length < 8) {
    return false;
  }
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumber = false;
  let hasSpecialCharacter = false;
  for (let i = 0; i < password.length; i++) {
    if (password[i] >= "A" && password[i] <= "Z") {
      hasUpperCase = true;
    } else if (password[i] >= "a" && password[i] <= "z") {
      hasLowerCase = true;
    } else if (password[i] >= "0" && password[i] <= "9") {
      hasNumber = true;
    } else {
      hasSpecialCharacter = true;
    }
  }
  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);