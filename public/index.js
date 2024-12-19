"use strict";

/**
 * This is the JavaScript file for the index.html file.
 * It contains the logic for the front-end of the website.
 * It allows the user to view products, search for products, filter products, view product details,
 * login, purchase products and view their profile which has their transaction history.
 */

(function() {
  const ALL_PRODUCTS_URL = "/getProducts";
  const PRODUCT_DETAILS_URL = "/getProductDetails/";
  const VALIDATE_USER_URL = "/validateLogin";
  const VALIDATE_TRANSACTION_URL = "/validateTransaction";
  const GET_TRANSACTION_HISTORY_URL = "/transactionHistory";
  const SEARCH_PRODUCTS_URL = "/searchProducts/";
  const FILTER_PRODUCTS_URL = "/filterProducts/";
  const NEW_USER_URL = "/newUser";

  let currentUser = null;
  let currentPw = null;

  window.addEventListener("load", init);

  /**
   * Initializes the website by adding event listeners to the buttons and filters,
   * filling the saved username, showing all products and hiding the other views.
   * It also adds event listeners to all buttons and interactive elements.
   */
  function init() {
    addButtonsEventListeners();
    addFilterEventListeners();
    fillSavedUsername();
    showAllProducts();
  }

  /**
   * Adds event listeners to all buttons and interactive elements.
   */
  function addButtonsEventListeners() {
    id("logo").addEventListener("click", showHome);
    id("search-text").addEventListener("input", enableSearchButton);
    id("search-btn").addEventListener("click", search);
    id("profile-btn").addEventListener("click", showProfileOrLogin);
    id("new-user-btn").addEventListener("click", showUserCreation);
    id("login-btn").addEventListener("click", initLogin);
    id("layout-btn").addEventListener("click", toggleLayout);
    id("logout-btn").addEventListener("click", logout);
    id("confirm-btn").addEventListener("click", confirmPurchase);
    id("cancel-btn").addEventListener("click", () => hideElement(id("product-confirm")));
    id("submit-btn").addEventListener("click", submitPurchase);
    id("popup-btn").addEventListener("click", showHome);
    id("user-creation-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      createUser();
    });
  }

  /**
   * Shows the home page and hides all other views.
   * It also resets the search text and removes the selected filter and shows all the products.
   */
  function showHome() {
    clearSearch();
    clearSelectedItems();
    clearCreationFormAndMsgs();
    showAllProducts();
    id("products-container").innerHTML = "";
    showProductsView();
    window.scrollTo(0, 0);
  }

  /**
   * Shows only the profile page if the user is logged in, otherwise shows only the login page.
   */
  function showProfileOrLogin() {
    hideElement(id("login-view"));
    hideElement(id("product-view"));
    hideElement(id("profile-view"));
    hideElement(id("new-user-view"));
    let pageToShow;
    if (!currentPw || !currentUser) {
      pageToShow = id("login-view");
    } else {
      retrieveTransactionHistory();
      pageToShow = id("profile-view");
    }
    showElement(pageToShow);
    window.scrollTo(0, 0);
  }

  /**
   * Shows the user creation page and hides all other views.
   */
  function showUserCreation() {
    hideElement(id("login-view"));
    hideElement(id("product-view"));
    hideElement(id("profile-view"));
    showElement(id("new-user-view"));
    window.scrollTo(0, 0);
  }

  /**
   * Retrieves the transaction history of the user and displays it on the profile page by
   * calling the displayTransactionHistory function.
   */
  async function retrieveTransactionHistory() {
    try {
      const formdata = new FormData();
      formdata.append("username", currentUser);
      formdata.append("password", currentPw);
      const data = await fetch(GET_TRANSACTION_HISTORY_URL, {
        method: "POST",
        body: formdata
      });
      await statusCheck(data);
      const transactions = await data.json();
      displayTransactionHistory(transactions);
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * Displays the transaction history of the user on the profile page.
   * If there are no transactions, it displays a message saying "No transactions found."
   * @param {Array} transactions: the array of transactions of the user.
   */
  function displayTransactionHistory(transactions) {
    const history = id("transaction-history");
    history.innerHTML = "";
    if (transactions.length === 0) {
      const message = gen("p");
      message.textContent = "No transactions found.";
      history.appendChild(message);
    } else {
      transactions.forEach((transaction) => {
        history.appendChild(genTransactionElement(transaction));
      });
    }
  }

  /**
   * Generates an article element for a transaction.
   * @param {Object} transaction: the transaction object.
   * @returns {HTMLElement} the article element for the transaction.
   */
  function genTransactionElement(transaction) {
    const container = gen("article");
    container.classList.add("transaction");
    const img = gen("img");
    img.src = "imgs/" + transaction.productID + ".png";
    img.alt = transaction.productName;
    container.appendChild(img);
    const transactionID = gen("p");
    transactionID.textContent = "Transaction ID: " + transaction.transactionID;
    container.appendChild(transactionID);
    const productName = gen("p");
    productName.textContent = "Product: " + transaction.productName;
    container.appendChild(productName);
    const price = gen("p");
    price.textContent = "Price: $" + transaction.price;
    container.appendChild(price);
    return container;
  }

  /**
   * Fills the saved username in the login form if it exists.
   */
  function fillSavedUsername() {
    const username = localStorage.getItem("username");
    if (username) {
      id("username").value = username;
    }
  }

  /**
   * Initializes the login form by adding an event listener to the form.
   */
  function initLogin() {
    id("login-form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      login();
    });
  }

  /**
   * Logs in the user by validating the username and password.
   */
  async function login() {
    try {
      const username = id("username").value.trim();
      const password = id("password").value;
      const message = id("login-msg");
      message.classList.remove("correct");
      message.classList.add("incorrect");
      if (!username || !password) {
        message.textContent = "Username and password are required";
      } else {
        const result = await validateUser(username, password);
        if (result.success) {
          successLogin(username, password);
        } else {
          message.textContent = result.message;
          id("password").value = "";
        }
      }
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * It sets the current user and password, changes the profile button text to "Profile",
   * shows the profile view and redirects to the profile view after 1 second.
   * It also saves the username in the local storage.
   * It also resets the password field.
   * @param {String} username: the username of the user.
   * @param {String} password: the password of the user.
   */
  function successLogin(username, password) {
    const msg = id("login-msg");
    msg.classList.remove("incorrect");
    msg.classList.add("correct");
    currentUser = username;
    currentPw = password;
    qs("#profile-view h1").textContent = "Welcome, " + username + "!";
    localStorage.setItem("username", username);
    msg.textContent = "Successful login! Redirecting...";
    setTimeout(() => {
      msg.textContent = "";
      id("password").value = "";
      id("profile-btn").textContent = "Profile";
      showHome();
    }, 1000);
  }

  /**
   * Validates the user by checking if the username and password are correct.
   * If the user is valid, it returns a success message, otherwise it returns an error message.
   * @param {String} username: the username of the user.
   * @param {String} password: the password of the user.
   * @returns {Object} the object containing the success status and the message.
   */
  async function validateUser(username, password) {
    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);
      const response = await fetch(VALIDATE_USER_URL, {
        method: "POST",
        body: formdata
      });

      // not using statusCheck here because I want to be specific with the error message
      if (!response.ok) {
        return createResponse(false, getErrorMessage(response.status));
      }
      const data = await response.text();
      return createResponse(
        data === username,
        data === username ? "Login successful" : "Login failed"
      );
    } catch (err) {
      return createResponse(false, "Something went wrong. Please try again");
    }
  }

  /**
   * Helper function that creates a response object with the success status and the message.
   * @param {Boolean} success: the success status of the response.
   * @param {String} message: the message of the response.
   * @returns {Object} the object containing the success status and the message.
   */
  function createResponse(success, message) {
    return {success, message};
  }

  /**
   * Returns the error message based on the status code.
   * @param {Number} status: the status code of the response.
   * @returns {String} the error message based on the status code.
   */
  function getErrorMessage(status) {
    const errors = {
      400: "Invalid username or password",
      404: "User not found",
      500: "Something went wrong, please try again"
    };
    return errors[status] || "An unexpected error occurred";
  }

  /**
   * Adds event listeners to the filter buttons.
   */
  function addFilterEventListeners() {
    qsa("#filters button").forEach((button) => {
      button.addEventListener("click", selectFilter);
    });
  }

  /**
   * Selects the filter by adding the selected class to the filter button.
   * If the filter is already selected, it removes the selected class.
   */
  function selectFilter() {
    window.scrollTo(0, 0);
    if (this.classList.contains("selected")) {
      this.classList.remove("selected");
      qsa(".product").forEach((product) => showElement(product));
    } else {
      removeSelectedFilter();
      this.classList.add("selected");
      filterProducts(this.textContent);
    }
  }

  /**
   * Removes the selected filter by removing the selected class from the filter button.
   */
  function removeSelectedFilter() {
    qsa("#filters .selected").forEach((btn) => btn.classList.remove("selected"));
  }

  /**
   * Filters the products based on the filter.
   * It fetches the products from the server and filters the products based on the filter provided.
   * @param {String} filter: the filter to filter the products.
   */
  async function filterProducts(filter) {
    try {
      const data = await fetch(FILTER_PRODUCTS_URL + filter);
      await statusCheck(data);
      const products = await data.json();
      qsa(".product").forEach((product) => hideElement(product));
      products.forEach((element) => {
        showElement(id(element.id));
      });
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * Shows all the products by fetching the products from the server and
   * creating the product elements. It then appends the product elements to the products container.
   */
  async function showAllProducts() {
    try {
      const data = await fetch(ALL_PRODUCTS_URL);
      await statusCheck(data);
      const products = await data.json();
      products.forEach(async (element) => {
        id("products-container").appendChild(await createProduct(element));
      });
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * Creates a product element based on the data provided.
   * @param {Object} data: the data of the product.
   * @returns {HTMLElement} the product element created based on the data.
   */
  function createProduct(data) {
    const container = gen("article");
    container.addEventListener("click", () => {
      showProductDetail(data.id);
      scrollToDetailView();
    });
    container.classList.add("product");
    container.id = data.id;
    const img = gen("img");
    img.src = "imgs/" + data.id + ".png";
    img.alt = data.name;
    container.appendChild(img);
    const name = gen("p");
    name.classList.add("product-name");
    name.textContent = data.name;
    container.appendChild(name);
    return container;
  }

  /**
   * Scrolls to the product detail view.
   */
  function scrollToDetailView() {
    setTimeout(() => {
      id("product-detail").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }

  /**
   * Shows the product detail by fetching the product details from the server and
   * creating the product detail elements.
   * It then appends the product detail elements to the product detail view.
   * @param {String} productID: the id of the product to show the details of.
   */
  async function showProductDetail(productID) {
    try {
      removeSelectedProduct();
      const data = await fetch(PRODUCT_DETAILS_URL + productID);
      await statusCheck(data);
      const product = await data.json();
      const detailView = id("product-detail");
      if (
        !detailView.classList.contains("hidden") &&
        qs("#product-view h1").textContent === product.name
      ) {
        hideElement(detailView);
      } else {
        id(productID).classList.add("selected");
        detailView.innerHTML = "";
        createProductDetail(product);
        showElement(detailView);
      }
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * Removes the selected product by removing the selected class from the product.
   */
  function removeSelectedProduct() {
    qsa("#products-container .selected").forEach((pro) => pro.classList.remove("selected"));
  }

  /**
   * Creates the product detail elements based on the data provided.
   * It creates the image, name, price, stock and description of the product.
   * @param {Object} data: the data of the product.
   */
  function createProductDetail(data) {
    const container = id("product-detail");
    const img = gen("img");
    img.src = "imgs/" + data.id + ".png";
    img.alt = data.name;
    container.appendChild(img);
    const name = gen("h1");
    name.textContent = data.name;
    container.appendChild(name);
    const priceAndStock = gen("p");
    priceAndStock.textContent =
      "Price: $" + data.price + " | Stock: " + data.stock;
    container.appendChild(priceAndStock);
    const description = gen("p");
    description.className = "description";
    description.textContent = data.description;
    container.appendChild(description);
    const purchaseBtn = gen("button");
    purchaseBtn.textContent = "Buy Now";
    purchaseBtn.addEventListener("click", showConfirm);
    container.appendChild(purchaseBtn);
  }

  /**
   * Enables the search button if the search text is not empty.
   * Disables the search button if the search text is empty.
   */
  function enableSearchButton() {
    id("search-btn").disabled = !id("search-text").value.trim();
  }

  /**
   * Searches for the products based on the search term provided.
   * It fetches the products from the server and filters the products based on the search term.
   */
  async function search() {
    try {
      const searchTerm = id("search-text").value.trim();
      window.scrollTo(0, 0);
      clearSearch();
      clearSelectedItems();
      if (searchTerm) {
        const data = await fetch(SEARCH_PRODUCTS_URL + searchTerm);
        await statusCheck(data);
        const products = await data.json();
        qsa(".product").forEach((product) => {
          hideElement(product);
        });
        products.forEach((product) => {
          showElement(id(product.id));
        });
        showProductsView();
      } else {
        throw new Error("Please enter a search term.");
      }
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * Shows the products view by hiding all other views and showing the product view.
   */
  function showProductsView() {
    hideElement(id("login-view"));
    hideElement(id("profile-view"));
    hideElement(id("product-detail"));
    hideElement(id("product-confirm"));
    hideElement(id("product-submit"));
    hideElement(id("error-view"));
    hideElement(id("new-user-view"));
    hideElement(id("popup-view"));
    showElement(id("product-view"));
  }

  /**
   * Clears the search text and disables the search button.
   */
  function clearSearch() {
    id("search-text").value = "";
    id("search-btn").disabled = true;
  }

  /**
   * Clears the selected items by removing the selected class from the selected items.
   */
  function clearSelectedItems() {
    qsa(".selected").forEach((element) => element.classList.remove("selected"));
  }

  /**
   * Toggles the layout of the products container between grid and list view.
   * It changes the text of the layout button based on the layout.
   */
  function toggleLayout() {
    const container = id("products-container");
    if (container.classList.contains("grid")) {
      container.classList.remove("grid");
      container.classList.add("list");
      this.textContent = "List View";
    } else {
      container.classList.remove("list");
      container.classList.add("grid");
      this.textContent = "Grid View";
    }
  }

  /**
   * Logs out the user by setting the current user and password to null and
   * changing the profile button text to "Login".
   */
  function logout() {
    currentUser = null;
    currentPw = null;
    id("profile-btn").textContent = "Login";
    showHome();
  }

  /**
   * Shows the confirm purchase view if the user is logged in and a product is selected.
   */
  function showConfirm() {
    if (currentPw && currentUser) {
      showElement(id("product-confirm"));
    } else {
      hideElement(id("product-confirm"));
      try {
        throw new Error("Please login first!");
      } catch (err) {
        handleError(err);
      }
    }
  }

  /**
   * Submits the purchase by validating the transaction and showing the popup with
   * the transaction ID if the user is logged in and a product is selected.
   */
  async function submitPurchase() {
    try {
      const productSelected = qs("#products-container .selected");
      if (!currentUser || !currentPw) {
        throw new Error("Please login first!");
      } else if (!productSelected) {
        throw new Error("Please select a product first!");
      } else {
        const formdata = new FormData();
        formdata.append("username", currentUser);
        formdata.append("password", currentPw);
        formdata.append("productID", productSelected.id);
        const data = await fetch(VALIDATE_TRANSACTION_URL, {
          method: "POST",
          body: formdata
        });
        await statusCheck(data);
        const response = await data.json();
        hideElement(id("product-submit"));
        showPopup(response.transactionID);
      }
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * Shows the popup with the message provided.
   * @param {String} message: the message to show in the popup.
   */
  function showPopup(message) {
    const popup = id("popup-view");
    const messageElement = id("popup-message");
    messageElement.textContent = "Successful! Transaction ID: " + message;
    showElement(popup);
  }

  /**
   * Hides the confirm view and shows the submit view.
   */
  function confirmPurchase() {
    hideElement(id("product-confirm"));
    showElement(id("product-submit"));
  }

  /**
   * Creates a new user by validating the form data and sending it to the server.
   * If the form data is valid, it creates a new user and shows the home view.
   * If the form data is invalid, it shows an error message.
   */
  async function createUser() {
    try {
      const validation = validateUserRequirements();
      const newUserMsgContainer = id("new-user-msgs");
      newUserMsgContainer.innerHTML = "";
      if (!validation.isValid) {
        addErrors(validation.errors, newUserMsgContainer);
      } else {
        const formdata = new FormData(id("user-creation-form"));
        const response = await fetch(NEW_USER_URL, {method: "POST", body: formdata});
        await statusCheck(response);
        const msg = gen("p");
        msg.classList.add("correct");
        msg.textContent = (await response.text()) + " Redirecting...";
        newUserMsgContainer.appendChild(msg);
        setTimeout(() => {
          if (!currentUser && !currentPw) {
            id("username").value = id("new-username").value.trim();
            showProfileOrLogin();
          } else {
            showHome();
          }
          clearCreationFormAndMsgs();
        }, 1000);
      }
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * Update the errors and append the error messages to the container.
   * @param {Error} errors: the list of errors to show.
   * @param {HTMLElement} container: the container to append the error messages.
   */
  function addErrors(errors, container) {
    errors.forEach((error) => {
      const message = gen("p");
      message.classList.add("incorrect");
      message.textContent = error;
      container.appendChild(message);
    });

  }

  /**
   * Validates the user requirements by checking if the username, email,
   * password and confirm password meet the requirements.
   * @param {String} username: the username of the user.
   * @param {String} email: the email of the user.
   * @param {String} password: the password of the user.
   * @param {String} confirmPassword: the confirm password of the user.
   * @returns {Object} the object containing the validation status and the errors.
   */
  function validateUserRequirements() {
    const username = id("new-username").value.trim();
    const email = id("email").value.trim();
    const password = id("new-password").value;
    const confirmPassword = id("confirm-password").value;
    const errors = [];
    if (username.length === 0) {
      errors.push("Username cannot be empty");
    }
    if (email.length === 0) {
      errors.push("Email cannot be empty");
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push("Please enter a valid email address");
    }
    if (!isStrongPassword(password)) {
      errors.push("Password must be strong");
    }
    if (password !== confirmPassword) {
      errors.push("Passwords do not match");
    }
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  /**
   * Checks if the password is strong by checking if it has at least 8 characters,
   * an uppercase letter, a lowercase letter, a number and a special character.
   * @param {String} password: the password to check if it is strong.
   * @returns {Boolean} true if the password is strong, otherwise false.
   */
  function isStrongPassword(password) {
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

  /**
   * Clears the creation form by setting the values of the form fields to empty.
   */
  function clearCreationFormAndMsgs() {
    id("new-username").value = "";
    id("email").value = "";
    id("new-password").value = "";
    id("confirm-password").value = "";
    id("new-user-msgs").innerHTML = "";
  }

  /**
   * Shows the element by removing the hidden class.
   * @param {HTMLElement} elementToShow: the element to show.
   */
  function showElement(elementToShow) {
    elementToShow.classList.remove("hidden");
  }

  /**
   * Hides the element by adding the hidden class.
   * @param {HTMLElement} elementToShow: the element to hide.
   */
  function hideElement(elementToShow) {
    elementToShow.classList.add("hidden");
  }

  /**
   * Handles the error by showing the error view and hiding the other views.
   * @param {Error} err: the error object.
   */
  function handleError(err) {
    id("error-view").innerHTML = "";
    const h1 = gen("h1");
    h1.textContent = "Oops!";
    id("error-view").appendChild(h1);
    const msg = gen("p");
    msg.textContent = err.message;
    id("error-view").appendChild(msg);
    const button = gen("button");
    button.textContent = "Go back to home";
    button.addEventListener("click", showHome);
    id("error-view").appendChild(button);
    hideElement(id("product-view"));
    hideElement(id("login-view"));
    hideElement(id("profile-view"));
    hideElement(id("new-user-view"));
    showElement(id("error-view"));
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to generate an element based on the tag.
   * @param {selector} tag: the tag to generate the element.
   * @returns {HTMLElement} the element generated based on the tag.
   */
  function gen(tag) {
    return document.createElement(tag);
  }

  /**
   * Helper function to get the element by id.
   * @param {selector} id: the id of the element.
   * @returns {HTMLElement} the element with the id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   *  Helper function to get the element by selector.
   * @param {selector} selector: the selector of the element.
   * @returns {HTMLElement} the element with the selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Helper function to get all the elements by selector.
   * @param {selector} selector: the selector of the elements.
   * @returns {NodeList} all the elements with the selector.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Helper function to check the status of the response.
   * @param {Response} response: the response to check the status
   * @returns {Response} the response if the status is ok, otherwise throws an error.
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }
})();