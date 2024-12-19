# Final Project

## Intro
For your final project you are tasked with creating a fully-fledged website. This full stack assignment will involve HTML, CSS, client-side JavaScript, server-side JavaScript, and a SQL database (**no file I/O allowed**). This assignment is a mix between a CP and a HW. Although there are specific requirements, like a HW, you have a lot of freedom in how you implement and design your website, like a CP. Since this is a full stack assignment, you might want to include your work in your portfolio. This is allowed, however, you should not post or share **any part** of this assignment until **after the assignment locks on Gradescope.**

For this assignment, you will pick one of three different project options. Based on which project you choose, you will be required to implement different features. The three project options are:
  * Ecommerce Site (e.g. Amazon, craigslist, etc.)
  * Course Enrollment Site (e.g. MyPlan)
  * Reservation Site (e.g. for hotels, uber, car rental, etc.)

**Note**, you may use existing websites as inspiration. However, your website should not be a direct copy of said existing websites. Additionally, you should not be using or copying code from tutorials and turning that work in as your own. If you do use online resources for inspiration, they must be cited (see [Academic Integrity](#academic-integrity) for more details). Only work that is original will count towards the assignment requirements.

**Something very important to keep in mind on this assignment** when working on your project, it's important to ensure that both the client and server are designed to function independently of each other. This means that you should implement all behavior and error handling in a way that doesn't rely on either the client or server exclusively. You shouldn't assume that the only way to access the server is through the client, or vice versa. For example, there may be potential errors in requests that should be handled but can never happen given the prescribed front end implementation. This does not mean your back end should not be set up to handle these errors. If you need further clarification on what this means please post on Ed or come to office hours.

A large portion of the implementation and style choices are up to you, but the details specified in this document **must** exist.

**It is very important that you read the entire specification before starting the implementation process.**

## Partner Information
This assignment is designed to be a partner project and we highly encourage you to work with a partner. You may only work with one other person - 2 people is the maximum number of people per group. You may not collaborate with anyone besides your partner. If you would like to work on your own, you may request an exception, **however**, the amount of work remains **the same** even if you are approved to work individually.

If you would like to work alone, you must request to do so by the specified deadline. You must also find a partner by the specified deadline or else a partner will be assigned to you. All of these deadlines will be posted on the class website calendar and on the Ed discussion board. If you would like to work with a partner but do not know anyone in the class, post and respond to others in the designated Ed post.

You and your partner should devise a plan for how the work will be divided and when it will be completed. The implementation strategies section of this spec might be useful when planning how to divide up the work. At the end of the quarter, you will be required to fill out a peer evaluation survey reflecting on how well you and your partner worked together and how the work was divided. If there are issues or the division of labor was dramatically unfair, this will be your opportunity to share. This will result in a grade deduction for the individual who did not contribute sufficiently.

**You are not allowed to collaborate with your partner on any other assignment or assessment in this class. The final project is the only assignment where partner work is allowed.**

### Guide to Partnered Git
When multiple people work on the same GitLab project, things become a bit more complicated than the normal `clone`, `add`, `commit`, `push`. The following is a mini guide on how to work with a partner on the same repository. However, this guide is useless without one extremely important thing: **you must communicate with your partner.** If you are going to work on sections of the assignment separately, let your partner know when you are working on which part. This way, you don’t both accidentally work on the same section.
1. Each person does `git clone` as they would for any normal assignment
2. Every time before you start working on your local repo, run `git pull`
3. After you finish implementing what you were working on, do `git add`, `git commit`, and `git push` (Do this **every time**. Do not just save and come back to it later.)

#### Merge Conflicts

If everything goes right with you and your partner pushing to/pulling from git, you won't need to use this part of the guide. However, it is a possibility that something will go wrong so we are going to provide a mini-guide on resolving merge conflicts. You can access it [here](merge-conflict-guide.md).

## Learning Objectives
The goal of this project is to test your knowledge of everything you have learned this quarter. You are expected to implement one of the three project options listed above, demonstrating your working understanding of the following topics:
* HTML: content and structure; using semantically correct tags
* CSS: style and layout
* Client-side JavaScript: adding behavior and calling APIs
* Node.js: creating your own API
* SQL: providing data persistence in a relational database

You are held to the same standards that we have built upon throughout the past quarter, such as
  * Good code style, according to our [Code Quality Guidelines](https://courses.cs.washington.edu/courses/cse154/codequalityguide/)
  * Implementing the feedback you have received in past assignments
  * Good documentation at every level (project, API, file, and function)

## Final Deliverables
Keep in mind that the files listed in the table below are the _minimum_ requirements. Feel free to create additional files but keep in mind that they must include documentation.

| File          | Description |
|---------------|------------------------------|
|`public/index.html`|This file should be your “homepage” or the starting place for the entire front end of your website.|
|`public/styles.css`|This file should contain the CSS styles for your front end.|
|`public/index.js`|This file should contain your client-side JavaScript, which will call the API you build in your `app.js` and provide other front end behavior for the features you implement.|
|`app.js`|This file should contain the Node.js service that is your back end API.|
|`<insert-file-name>.db`|This file should contain the database for your website. You are required to create a database and use SQL to access it. You **cannot** use file I/O! Your database must include at least 3 tables and use at least 1 foreign key. Each table must have at least 2 columns (for more information see [Database Requirements](#database-requirements)).|
|`package.json`|This file should contain your project dependencies (e.g. `express`) which you initialize using `npm init`.|
|`APIDOC.md`|This file is used to document your `app.js` web service.|
|`tables.sql`|***NEW FILE REQUIREMENT!*** This file should include any CREATE statements you used in your database. This file does not need to include header documentation (this is the only exception - all other files must include documentation).|

All file names, links and extensions in your project must be lowercase without spaces (e.g. img/puppy.jpg but not img/puppy.JPG or img/Puppy.jpg).

## Final Project Dates and Checkpoints
Unlike creative projects and homeworks, this final project will include a number of checkpoints to ensure that you and your partner are making steady progress. **No late days or late submissions will be accepted for any of these checkpoints including the final submission**. See below for additional details
| Checkpoints          | Due/Lock Date | Description of Checkpoint Requirements |
|-----------|-----------|-----------|
| (1) Partner Selection | 10/13/24 | [link](#partner-selection) |
| (2) Project Plan | 10/20/24 | [link](#project-plan) |
| (3) HTML/CSS/JS MVP | 11/3/24 | [link](#front-end-mvp) |
| (4) Backend Proposal | 11/17/24 | [link](#backend-proposal) |
| (5) Completed Submission | 12/6/24 | [link](#completed-submission) |
| (6) Project Presentation | 12/10/24 | [link](#project-presentation) |
| (7) Partner Review | 12/11/24 | [link](#project-review) |

### Partner Selection
Complete the partner selection survey in which you declare who you would like to work with on this project. Only one (1) person per partner pair should fill out this survey. If you have not found a partner by the deadline, you are still required to fill out the survey stating you have not found a partner and one will be assigned to you randomly. If you don't know anyone in this class, a good way to meet people is by coming to lecture, going to section, and attending office hours and introducing yourself to the people around you. Additionally, a post to partner matching will be provided on Ed.

The link for the partner selection survey will be provided on Ed.

### Project Plan
You and your partner must fill out the provided project plan document with all required information. Only one person per partner pair needs to submit this document to Gradescope. The person submitting should use the "Group Member" option to add their partner to the submission.

The template for the project plan document will be provided on Ed.

### Front End MVP
Progress on the HTML, CSS, and front end JavaScript for the project needs to be submitted to Gradescope. Only one partner should submit and the person submitting should use the "Group Member" option to add their partner to the submission. The submission does not need to be the complete front end implementation but it does need to show strong, sufficient effort. You are free and encouraged to revise, change, or modify the implementation before your final submission.

### Backend Proposal
Complete the `APIDOC.md` requirements (as described below) with the endpoints you anticipate needing to implement. You are not bound to this documentation and are free to revise, change, or modify the endpoints as you and your partner work on the final submission. **No code is required** as part of this submission, only the documentation. The more detailed you make your documentation, the better feedback and suggestions the staff can provide. This documentation needs to be submitted to Gradescope. Only one partner should submit and the person submitting should use the "Group Member" option to add their partner to the submission.

### Completed Submission
The fully completed final project (as described in the external and internal requirements below) needs to be submitted to Gradescope. Only one partner should submit and the person submitting should use the "Group Member" option to add their partner to the submission.

### Project Presentation
You and your partner will present your project to the course staff and your peers on the finals day. This will be your opportunity to share your work with others and also see what other students created. Location of this presentation will be shared closer to the date. Attendance is required and TAs/the Instructor will be grading the external correctness of your project at this time.

Missing, being late, and/or leaving early will result in a point deduction.

### Partner Review
Fill out a response to the partner review peer evaluation survey in which you can provide information on how the collaboration/distribution of work between you and your partner was. Whether there was a highly disproportionate or dysfunctional dynamic between you and your partner, you worked together flawlessly, or anything in between, this is your opportunity to share that information with the staff.

The link to this peer evaluation will be provided on Ed.

# External Requirements
Unlike other assignments, you have a lot of freedom in design and implementation choices on this assignment. This includes, but is not limited to, choosing which text and images you use. With this in mind, you are **required** to keep your content school appropriate. Using curse words, derogatory, insulting, and/or any other staff-deemed inappropriate language will not be acceptable (even if included as a joke) and **will result in a deduction**.

## Structural and Appearance Requirements
There are no structural requirements for this assignment. You have complete freedom as to which tags your HTML page(s) use.

The following is a list of the _minimum_ appearance requirements that must be included in your CSS file(s):
* You must have at least 10 CSS rulesets and 10 unique CSS properties
* You must change at least 2 box model properties (border, padding, margin, height, width)
* You must use at least 2 flex properties (`display: flex` does not count towards this count)
* You must import at least one [Google font](https://fonts.google.com/) (Remember to import Google fonts in the head of your HTML file using a link tag! The Google font link must be the one that's generated for you while selecting fonts on the Google Font site.)

A portion of your grade for this assignment is based on creative application of CSS. The above rules are *minimum* requirements but you are **expected** to do significantly more than what is described here. Since the project is of considerable size, it is expected that the styling feels complete. Your page should have a consistent style and feel demonstrating sufficient effort that creates a good user experience. Your page should not look like any of the previous homeworks/CPs or any section/lecture content. For example, it should not have the same style/font/themes as the Set assignment or be an extension of your CPs.

### Extra Credit Opportunity
For students who choose to go above and beyond there will be an opportunity to earn extra credit. The staff will nominate websites for this credit. These points will factor into the homework portion of your overall grade. If you would like to be considered for this extra credit, ensure that you have shown off the "above and beyond" components you have implemented in your presentation including specifics about what you did.

Examples of going above and beyond include, but are not limited to, the following:
  * Putting an extraordinary effort into the appearance of your website
  * Implementing optional features beyond the required two
  * Adding unique/impressive features that are not mentioned in this specification to your website

### Implementation Expectations
You are not allowed to use any external frameworks for any part of this project. You must use concepts demonstrated throughout the ten weeks of this course.

## Behavior Requirements
The behavior requirements are split into 2 categories: required features and additional features.
  * **All** of the required features must be implemented, regardless of which project option you choose.
  * You must implement at least 2 additional features. You are not required to implement all of the additional features. The 2 additional features must be picked from the list of the project-specific additional features listed below.
  * You are welcome (and encouraged!) to come up with other features to make your website more complete (or implement more than 2 of the additional features), however, they must be done in addition to the two features implemented from the given lists.

### Required Features
For the required features section, the word _item_ will be used to describe a product (on an e-commerce site), a class (in a course enrollment site), or a service (on a reservation site). The word _transaction_ will be used to describe buying a product, enrolling in a class, or reserving a service.

#### Database Requirements:
  * You are required to create a database to store data for your website
  * Your database must include at least 3 tables
  * You must include at least 1 foreign key to connect your tables
  * Each table must include a primary key
  * Each table must have at least 2 columns, although your tables will most likely have more
  * You must have at least 25 items in your database
  * A notion of capacity must exist for all items.

**All** of the following features must be implemented:

#### Feature 1: display the items on a “main view” page
Front End
  * A way for the user to be able to browse through all items
  * A way for the user to toggle between at least 2 layouts (e.g. list vs. grid, cozy vs. compact, etc.). The toggling should be accomplished via CSS classes.

Back End
  * Endpoint to retrieve all items

#### Feature 2: allow the user to login to their account
Front End
  * A way for the user to provide a valid username and password to gain access to account-required actions
  * A way for the user to allow the browser to save their username across browser sessions (i.e. the next time they try to login)

Back End
  * Endpoint to check if the username and password match an entry in the database
  * **Note**: You do not need to implement the "Create a New User" feature for this feature to work. You can manually add preset username/password combinations to your database and then use those credentials when logging in.

#### Feature 3: clicking on any individual item should bring the user to a view which provides more detailed information about said item
Front End
  * This can be implemented by using JS/DOM manipulation
  * This view must include at least 4 pieces of information about the item (i.e. name, image, description, price, dates, availability, tags, color, address, phone number, seller, professor, department, etc.)

Back End
  * Endpoint to retrieve detailed item information

#### Feature 4: users must be able to buy a product, enroll in a class, or reserve a service
Front End
  * Users must be logged in to make the purchase/enroll/reserve
  * The user can buy one product, enroll in one class, or reserve one service at a time
  * A way for the user to confirm and submit the transaction (these are two separate actions)
    * The user should not be able to change their transaction after confirming it. If any changes are made to the transaction, the user must re-confirm their transaction before submitting it
  * Based on user input, there must be a possibility for the transaction to succeed or fail (it is up to you to determine what constitutes a success or failure)
  * After a successful transaction, the user must be given a confirmation number (hint: this could be useful in feature 6)
    * A confirmation number is a **unique** alphanumeric sequence of characters that identifies a transaction. It is up to you to decide how to generate confirmation numbers
  * **Note**: If you choose to implement a cart feature, you should first allow items to be added to the cart and then users can buy everything in the cart at once or enroll in all classes at once

Back End
  * Endpoint to check if transaction is successful or not
  * You should make sure the user is **logged in**
  * If the transaction is successful, update the database, and return a generated confirmation code
  * Users should not be able to buy products that are out of stock, enroll in full classes, or make reservations for services that are unavailable

#### Feature 5: users must be able to search and filter the available items
Front End
  * Must implement a search bar
    * Must be able to search multiple types of information
    * Must be able to type in the search bar
  * Must implement a way to filter items (e.g. displaying only pants, only classes that start with CSE, only reservations in the Bahamas, etc.)
    * Must be able to toggle filters on and off
      * This differs from the search bar because the filters should be preset and not user-generated. The users can select the filter they need from all possible filters.
    * This can be done by implementing categories/tags (i.e. furniture, clothing, food, department, prerequisite, travel location)
  * **Note**: You do not need to implement the ability to filter search results or search through filtered results. However, you are welcome to add these features if you would like

Back End
  * Endpoint to search database and return results
  * Must search at least 3 different columns in the database
    * The 3 column requirement is satisfied by searches performed through filtering and the search bar

#### Feature 6: users must be able to access all previous transactions
Front End
  * Users must be logged in
  * Users must be able to view information about their transaction including but not limited to the name of the item and the confirmation number for each transaction

Back End
  * Endpoint to retrieve transaction history for any given user
  * You should make sure the user is **logged in**

Based on your implementation choices, it might be better to combine some of the endpoints listed above or split them into multiple smaller endpoints. This is allowed as long as you make sure to include all of the same back end functionality. However, you must have at least 4 endpoints defined in your `app.js`.

### Additional Features (Choose Two)
You must implement at least two (2) additional features. Below are lists of options for each project type. Your 2 additional features must come from the options listed under your specific project type. (You are welcome to implement more features from these lists or otherwise, especially if your goal is to use this assignment in your portfolio, but they will not be graded.)  **All** additional features must have both front and back end implementations and sufficient error handling.

#### E-commerce Site

##### Additional Feature 1: Feedback on a Product
  * Logged-in users should be able to give feedback/rating/review on any given product
  * This should use a numerical rating scheme (e.g. 1-5, 1-10, etc.)
  * There should be an “average rating” visibly shown for any given product.
  * It may be useful to allow for users to explain their numerical ratings. As such, you should additionally allow for users to have the option to submit text reviews (e.g. comments) for any given product to accompany the numerical rating it received.

##### Additional Feature 2: Selling a Product
  * Logged-in users should be able to list items for sale.
  * Minimum required information to list is the seller, picture of the product, and price of the item. You may add any additional information to listed items (e.g. date sold, quantity if non-infinite, etc.)
  * The product listed for sale should persist through refreshing of the page. It should now show up in the inventory of the webpage.

##### Additional Feature 3: Bulk Purchase
  * Users may add items to a “cart.”
  * The products in the “cart” should persist through refreshing of the page, for at least a couple of days.
  * Users should be able to navigate somewhere to see the products in the “cart.” There should then be the option to bulk purchase these products.
  * All of the items in the bulk purchase should be given the same confirmation code as each item is purchased together in one transaction.

##### Additional Feature 4: Create a New User
  * Users are presented with a method in which to create an account for your e-commerce site.
  * The user provides at minimum a username, password, and e-mail.
  * The user information should be added to the database.
    * Optionally, feel free to use security methods such as hashing to make your website more “secure”.
  * This information should be captured by a Form HTML element.

##### Additional Feature 5: Recommendations
  * Your website should display some “recommended” products for the user to look through.
  * The algorithm to choose “recommended” products should be in some way based on the purchase history of the user. You may also have it use other information from the user as well.
  * Feel free to recommend something random if the user hasn’t purchased anything!


#### Course Enrollment Site

##### Additional Feature 1: Permissions to Enroll
  * A logged in user must meet all the requirements in order to enroll for a class.
    * These requirements must be visible to the user.
  * Requirements must be at least: having taken the pre-requisites, being in the major, and the class having available seats.
  * This may require saving additional metadata for classes/users.

##### Additional Feature 2: Notify Users of Class Availability
  * Users may be able to add themselves to a waitlist for classes that have no available spots left.
  * If spots open up, the user should be notified in some way.
    * For example, users may be notified the next time they log in if a spot opens up while they are offline.
  * **Note**: This may be difficult to test because you and your partner are the only "users". For the presentation, you may make changes to the database manually to show this feature.

##### Additional Feature 3: Bulk Enroll
  * Users may add classes to a "cart."
  * The classes in the "cart" should persist through refreshing of the page, for at least a couple of days.
  * Users should be able to navigate somewhere to see the classes in the "cart." There should then be the option to bulk enroll in these classes.
  * All of the items in the bulk enroll should be given the same confirmation code as each item is enrolled together in one transaction.

##### Additional Feature 4: Schedule builder
  * Users may have the website build a schedule for them based on the classes in the “cart.”
  * This requires dates and time metadata for classes in the inventory.
  * Your schedule builder algorithm should in some way display all of the possible schedules based on the user's “cart.”
  * **Note**: This should be difficult to implement. It deals with time conflicts, and exhausting all the possible combinations of the classes that work together. While it may be difficult, it will also be fun and a valuable "challenge" to discuss during something like a job interview!

##### Additional Feature 5: Degree Audit
  * Users may have the website audit a degree. This can be either a major or a minor.
  * Your website should now store information about class requirements to complete a degree in a specific major/minor.
  * If the user chooses to audit a degree, the website should display valuable information about completed classes that count towards the degree, as well as any classes that still need to be taken to complete the degree.
  * There must be at least 5 classes within at least 1 department for minors, and at least 10 classes within at least 3 departments for majors.

#### Reservation Site

##### Additional Feature 1: Feedback on a Service
  * Logged-in users should be able to give feedback on any given service
  * This should use a numerical rating scheme.
  * There should be an “average rating” visibly shown for any given service.
  * It may be useful to allow for users to explain their numerical ratings. As such, you should additionally allow for users to have the option to submit text reviews (e.g. comments) for any given product to accompany the numerical rating it received.

##### Additional Feature 2: Create a New User
  * Users are presented with a method in which to create an account for your reservation site.
  * The user provides at minimum a username, password, and e-mail.
  * The user information should be added to the database.
    * Optionally, feel free to use security methods such as hashing to make your website more “secure”
  * This information should be encapsulated within a Form HTML element

##### Additional Feature 3: Booking with Time
  * Your website now has additional metadata for each service that includes the dates/times available.
  * When booking, an additional option and constraint is available. Users may choose a period of time to book a service for. The users are not able to book a service in a time period in which the service is unavailable (already booked).
  * Your website should keep track of the users and their reservation times. As a consequence of this, users should not be able to double-book themselves. For example, a user should not be able to reserve a service for Tuesday from 3pm-7pm when they already have a service reserved for Tuesday 4pm-5pm.


##### Additional Feature 4: Things to do
  * Your website now has additional metadata for each service that includes the location of the service.
  * Your website will give recommendations of things to do in certain locations!
    * This can be shown while booking, after a transaction is completed, etc.
  * Feel free to use the Google Maps API to display the exact locations of these destinations!

# Internal Requirements

All patterns and practices defined as internal requirements in past assignments continue to apply here (e.g., following code quality guidelines, using the module pattern in front end JavaScript, proper use of `async`/`await` and promises, all errors handled appropriately, `statusCheck` used appropriately in fetch chains, minimizing the use of module-global variables, etc.).

## Front End Internal

* POST requests must send data using the `FormData` object/datatype through the body.

## Back End Internal

  * All POST endpoints must support all three data formats we've talked about (JSON, FormData, URL-Encoded)
  * The Node app must use the `express`, `multer`, and `sqlite` modules that we've shown in class.
  * All Node endpoints must return either JSON or text type (and not default HTML).
  * Your Node app should handle all possible errors.
  * `package.json` has the correct and complete list of dependencies for the project, and correctly points to `app.js` as the entry point.
  * Use sql joins to relate data between tables in your database
  * Similar to your client-side JS, decompose your Node.js/Express API by writing smaller, more generic functions that complete one task rather than a few larger "do-everything" functions. No function should be more than 30 lines of code, and your Node.js should have **at least three** helper functions defined and used (excluding `getDBConnection`). Consider factoring out important behavior for your different GET/POST requests into functions.

## Error Handling
You must handle errors appropriately throughout the project as outlined in our style guides and reinforced throughout lecture and section.
  * All possible errors need to be appropriately handled, returning the correct error codes and reasonable, descriptive messages.
  * All errors must be displayed to the client in a user-readable way.
    * You may not use `console.log`, `console.error`, or `alert` to display errors.
    * It must be displayed cleanly: no JSON objects appearing in the DOM.
    * It does not have to be the message returned from the server, but does have to indicate that an error occurred.
    * It must be visible on the webpage.
  * **IMPORTANT**: Not all server errors that you are expected to handle have been explicitly called out in this specification. Since this is a final project you will need to make choices about when and what errors your API should anticipate in order to have a well designed app. Note that your API should be able to handle errors even if those errors can not be reached through your implementation of the front end of this assignment. You should test your endpoints independently of your front end code (use Thunderclient). Try to think of as many edge cases as you can. At this point of the quarter, we expect you to be able to develop thorough error handling. If you have questions, please post on Ed or come to office hours.

## Documentation

All HTML, CSS, and JavaScript files must continue to include file header comments, JSDoc comments on functions, endpoint comments, and comments on any non-trivial code. Your `tables.sql` file does not need to include header documentation (this is the only exception - all other files must include documentation).

As outlined in the "Final Deliverables" section above, You must provide an `APIDOC.md` documenting in detail your API. This must include:
  * The name of the endpoint
  * A non-trivial description of its purpose
  * Does not include implementation details
  * Does include any side-effect it might have (e.g., creating and storing a Game ID for a GET endpoint)
  * What method it uses (GET vs. POST)
  * What parameters it takes (and their names and expected formats)
  * What its return type is
  * An example request
  * An example response
  * A separate description, example request, and example response for all optional parameters
  * What errors can be returned

The `APIDOC.md` should be structurally similar to the `APIDOC.md` that you submitted for CP4/HW4. Refer back to the example provided for CP4/HW4 if you need assistance in the creation of your `APIDOC.md`.

# Implementation Strategies

Since this is our first "full stack" project, implementing the whole thing at once may seem daunting. Here are a couple of strategies that could be useful:

1. Start on the front end, and get all of the HTML/CSS looking good first, then add some JavaScript (with placeholders/"stubs" for back end API data) to get the DOM manipulation working. Once that works, create the database, and start implementing each back end endpoint one-by-one.

2. Start on the back end, getting the basic structure of the endpoints working (correct names and methods, parameter validation, returning some placeholder data). Then create the database and one-by-one start replacing placeholder data with data from the db.

3. Choose one of the back end endpoints and, starting on its front end components, implement it completely. Then, choose the next simplest endpoint and do the same.

4. Start by sketching out on paper the various components and their connections (e.g. a line between a button and the endpoint that is called when this button is pressed and then a line from the endpoint to the database tables corresponding to it). Once you have the full picture, choose either the components with the least lines (aka, least amount of complexity) and implement that. Any connecting lines can usually be temporarily implemented with "fake" connections (e.g. hard-coded data in lieu of having a database). Follow the lines and implement the connections until the full project is complete.

All of these are valid strategies, and they are not the only ones. But they all share the attribute of starting small and implementing what you see as easy to accomplish. Once you accomplish progressively bigger aspects of the project, the more complicated parts either fall into place or start to seem not so big anymore.

# Grading
  * External Correctness (45-55%) - The external requirements listed in this specification are met.
  * Internal Correctness (25-35%) - The internal requirements listed in this specification are met.
  * Documentation (5-10%) - The documentation requirements in this specification are met.

## Academic Integrity
All work submitted for your CSE 154 final project must be your and your partner’s own and should not be shared with other students (other than your partner). This includes but is not limited to:
* You may not use code directly from any external sources (no copying and pasting from external sites), other than templates that are explicitly given to students for use in class.
* We expect that the homework you submit is your and your partner’s own work and that you do not receive any inappropriate help from other people or provide inappropriate help to others.

Doing any of the above is considered a violation of our course academic integrity policy. As a reminder this page states:

The Paul G Allen School has an entire page on [Academic Misconduct](https://www.cs.washington.edu/academics/misconduct) within the context of Computer Science, and the University of Washington has an entire page on how [Academic Misconduct](https://www.washington.edu/cssc/for-students/academic-misconduct/) is handled on their [Community Standards and Student Conduct](https://www.washington.edu/cssc/) Page. Please acquaint yourself with both of those pages, and in particular how academic misconduct will be reported to the University.

If we find inappropriate content or plagiarism in projects **you will be ineligible for any points on the project**. Ask the instructor if you're unsure if your work is cited appropriately. Any external sources like images should be cited where used in the source code or (ideally) visible in a page footer. Refer to this [copyright example](https://courses.cs.washington.edu/courses/cse154/24au/resources/assets/code-examples/copyright-examples/copyrightexample2.html) page for how to cite images from different sources.
