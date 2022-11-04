DATABASE NAME: citizen_kanine
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

DROP TABLE IF EXISTS daily_dogs;
DROP TABLE IF EXISTS dogs_schedule_changes;
DROP TABLE IF EXISTS dogs_schedule;
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS employees_schedule;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS admin_notes;




CREATE TABLE employees (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150), -- not sure if we want to require a last name
	"email" VARCHAR(150) NOT NULL,
	"phone" INT NOT NULL, 
	"image" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE
	);


CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT REFERENCES employees(id) ON DELETE CASCADE,
	"username" VARCHAR(150) NOT NULL,
	"password" VARCHAR(150) NOT NULL,
	"email" VARCHAR(150) NOT NULL,
	"admin" BOOLEAN DEFAULT NULL,
	"date" DATE DEFAULT CURRENT_DATE
	);
	
	
CREATE TABLE admin_notes (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
	"notes" VARCHAR
	);


CREATE TABLE employees_schedule (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT NOT NULL REFERENCES employees(id) ON DELETE CASCADE ,
	"date" DATE DEFAULT CURRENT_DATE
	);


CREATE TABLE routes (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150)
	);
	
	
CREATE TABLE clients (
	"id" INT PRIMARY KEY,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150),
	"address" VARCHAR NOT NULL,
	"route_id" INT NOT NULL REFERENCES routes(id),
	"phone" INT,
	"email" VARCHAR(150) NOT NULL,
	"notes" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE
	);
	


CREATE TABLE dogs (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
	"name" VARCHAR(150),
	"image" VARCHAR,
	"vet_name" VARCHAR(150),
	"vet_phone" INT,
	"notes" VARCHAR,
	"flag" BOOLEAN DEFAULT NULL,
	"date" DATE DEFAULT CURRENT_DATE
	);
	
	
CREATE TABLE dogs_schedule (
	"id" SERIAL PRIMARY KEY,
	"dog_id" INT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
	"monday" BOOLEAN DEFAULT FALSE,
	"tuesday" BOOLEAN DEFAULT FALSE,
	"wednesday" BOOLEAN DEFAULT FALSE,
	"thursday" BOOLEAN DEFAULT FALSE,
	"friday" BOOLEAN DEFAULT FALSE
	);
	
	
CREATE TABLE dogs_schedule_changes (
	"id" SERIAL PRIMARY KEY,
	"dog_id" INT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
	"date_to_change" DATE NOT NULL,
	"is_scheduled" BOOLEAN DEFAULT NULL,
	"date" DATE DEFAULT CURRENT_DATE
	);
	
	
CREATE TABLE daily_dogs (
	"id" SERIAL PRIMARY KEY,
	"date" DATE DEFAULT CURRENT_DATE,
	"dog_id" INT NOT NULL REFERENCES dogs(id),
	"route_id" INT NOT NULL REFERENCES routes(id),
	"checked_in" BOOLEAN DEFAULT NULL,
	"no_show" BOOLEAN DEFAULT NULL,
	"cancelled" BOOLEAN DEFAULT NULL
	);
	
	
	
	
	
	
		
		
		
		
		
		
		