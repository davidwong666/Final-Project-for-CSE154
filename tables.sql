CREATE TABLE "Products"
(
  "id" INTEGER,
  "name" TEXT,
  "price" REAL,
  PRIMARY KEY("id")
);

CREATE TABLE "Details"
(
  "id" INTEGER,
  "description" TEXT,
  "stock" INTEGER,
  "category" TEXT,
  PRIMARY KEY("id"),
  FOREIGN KEY("id") REFERENCES "Products"("id")
);

CREATE TABLE "Users"
(
  "username" TEXT,
  "password" TEXT,
  "email" TEXT,
  PRIMARY KEY("username")
);

CREATE TABLE "Transactions"
(
  "transactionID" INTEGER,
  "username" TEXT,
  "productID" INTEGER,
  "productName" TEXT,
  "price" REAL,
  PRIMARY KEY("transactionID"),
  FOREIGN KEY("productID") REFERENCES "Products"("id"),
  FOREIGN KEY("username") REFERENCES "Users"("username")
);