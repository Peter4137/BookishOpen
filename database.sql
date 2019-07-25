-- Database: Bookish

-- DROP DATABASE "Bookish";

-- CREATE DATABASE "Bookish"
--     WITH 
--     OWNER = bookish
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_United Kingdom.1252'
--     LC_CTYPE = 'English_United Kingdom.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;


-- CREATE TABLE IF NOT EXISTS Library (
-- 	ISBN integer PRIMARY KEY,
-- 	Author character(255) NOT NULL,
-- 	BookName character(255) NOT NULL
-- );

CREATE TABLE IF NOT EXISTS Books (
	BookID SERIAL PRIMARY KEY,
	ISBN integer NOT NULL ,
	Barcode varchar(255) UNIQUE,
	BookName varchar(255) NOT NULL,
	Author varchar(255) NOT NULL
	
-- 	FOREIGN KEY (ISBN) REFERENCES Library(ISBN)
);

CREATE TABLE IF NOT EXISTS Users (
	UserID SERIAL PRIMARY KEY,
	Password varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS BorrowedBooks (
	BookID integer,
	UserID integer,
	DueDate date NOT NULL,
	FOREIGN KEY (BookID) REFERENCES Books(BookID),
	FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

INSERT INTO Books 
	(ISBN, BookName, Author)
	VALUES (1542041643, 'Forgotten Bones', 'Vivian Barz');
	
INSERT INTO Books 
	(ISBN, BookName, Author)
	VALUES (1785770578, 'Don''t Wake Up', 'Liz Lawler');

INSERT INTO Users
(Password) 
VALUES ('abc');