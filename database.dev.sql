CREATE SCHEMA IF NOT EXISTS ck_dev;

-- ORDERING BASED ON DEPENDENT COLUMNS/SECTIONS:
DROP TABLE IF EXISTS ck_dev.daily_dogs;
DROP TABLE IF EXISTS ck_dev.dogs_schedule_changes;
DROP TABLE IF EXISTS ck_dev.clients_schedule;
DROP TABLE IF EXISTS ck_dev.admin_notes;
DROP TABLE IF EXISTS ck_dev.dogs;
DROP TABLE IF EXISTS ck_dev.clients;
DROP TABLE IF EXISTS ck_dev.routes;
DROP TABLE IF EXISTS ck_dev.employees_schedule;
DROP TABLE IF EXISTS ck_dev.employees_schedule_changes;
DROP TABLE IF EXISTS ck_dev."user";
DROP TABLE IF EXISTS ck_dev.employees;
DROP TABLE IF EXISTS ck_dev.services;

CREATE TABLE ck_dev.employees (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150), 
	"email" VARCHAR(150) NOT NULL,
	"phone" VARCHAR(13), 
	"image" VARCHAR,
	"street" VARCHAR(150),
	"city" VARCHAR(150),
	"zip" INT,
	"date" DATE DEFAULT CURRENT_DATE,
	"admin" BOOLEAN DEFAULT FALSE
	);

-- removed email from user since we no longer need it for password retrieval.
CREATE TABLE ck_dev."user" (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT REFERENCES ck_dev.employees(id) ON DELETE CASCADE,
	"username" VARCHAR(150),
	"password" VARCHAR(150) NOT NULL,
	"admin" BOOLEAN DEFAULT FALSE,
	"date" DATE DEFAULT CURRENT_DATE,
	"email" VARCHAR(300), -- LATER CHANGE TO NOT NULL
	"password_reset_token" VARCHAR (40) NULL,
	"password_reset_expires"  VARCHAR (50) NULL
	);
	
--** USER INITIALIZATION DATA **--
--** USERNAME: 'admin'
--** PASSWORD: 'admin'
INSERT INTO ck_dev."user"
	("username","password","admin", "emp_id","email")
VALUES
	('admin','$2a$10$UqOGOFQpFGSPEi/X1emtGOkqYQ.LD6SjSC03FZ2lZpb5EiBEbrfEu',true, null,'thecitizenkanine@gmail.com');
	-- REMOVE BEFORE DEPLOYMENT
	-- ('packleader','$2a$10$UqOGOFQpFGSPEi/X1emtGOkqYQ.LD6SjSC03FZ2lZpb5EiBEbrfEu',true, 2,null);
	

CREATE TABLE ck_dev.employees_schedule (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT NOT NULL REFERENCES ck_dev.employees(id) ON DELETE CASCADE ,
	"week" INT NOT NULL,
	"1" BOOLEAN DEFAULT FALSE,
	"2" BOOLEAN DEFAULT FALSE,
	"3" BOOLEAN DEFAULT FALSE,
	"4" BOOLEAN DEFAULT FALSE,
	"5" BOOLEAN DEFAULT FALSE
	);


--** Employee Schedule MOCK DATA **--
-- REMOVE BEFORE DEPLOYMENT

-- insert into employees_schedule
-- 	("emp_id", "week", "1", "2", "3", "4", "5") 
-- values
-- 	(1, 1, true, true, false, true, true),
-- 	(1, 2, false, true, false, false, false),
-- 	(2, 1, false, true, true, false, false),
-- 	(2, 2, false, true, true, false, true),
-- 	(3, 1, false, false, false, false, false),
-- 	(3, 2, false, false, false, false, false),
-- 	(4, 1, true, true, true, false, true),
-- 	(4, 2, true, true, true, false, true),
-- 	(5, 1, false, false, false, true, true),
-- 	(5, 2, false, false, false, true, true),
-- 	(6, 1, false, true, true, true, false),
-- 	(6, 2, false, true, true, true, false),
-- 	(7, 1, true, true, true, true, false),
-- 	(7, 2, true, true, true, true, false);

-- ADDED EMP SCHEDULE CHANGES TABLE ck_dev.(Yani)
CREATE TABLE ck_dev.employees_schedule_changes (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT NOT NULL,   --REFERENCES ck_dev.clients(id) ON DELETE CASCADE--
	"date_to_change" DATE NOT NULL,
	"is_scheduled" BOOLEAN,
	"date" DATE DEFAULT CURRENT_DATE,
	UNIQUE("emp_id", "date_to_change")
	);

CREATE TABLE ck_dev.routes (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150)
	);

INSERT INTO ck_dev.routes
	("name")
VALUES
	('Tangletown'),
	('Emerson'),
	('Far'),
	('Misfits'),
	('Unassigned');

CREATE TABLE ck_dev.services (
	"id" SERIAL PRIMARY KEY,
	"qb_id" INT NULL,
	"name" VARCHAR (150),
	"price" INT
);

-- service names MUST match names in QB
INSERT INTO ck_dev.services
	("name", "price")
VALUES
	('Group Dog Walking:Walk 1 dog - Ad hoc', '23'),
	('Group Dog Walking:Walk 1 dog 2-4x / week', '32'),
	('Group Dog Walking:Walk 1 dog 5 days / week', '4'),
	('Group Dog Walking:Walk 2 dogs - Ad hoc', '4'),
	('Group Dog Walking:Walk 2 dogs 2-4x / week', '5'),
	('Group Dog Walking:Walk 2 dogs 5 days / week', '42'),
	('Group Dog Walking:Walk 3 dogs', '54');

CREATE TABLE ck_dev.clients (
	"id" SERIAL PRIMARY KEY,
	"qb_id" INT NOT NULL,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150),
	"street" VARCHAR(150),
	"city" VARCHAR(150),
	"zip" INT,
--	"service_id" INT NOT NULL REFERENCES,
	"route_id" INT REFERENCES ck_dev.routes(id),
	"phone" VARCHAR(150),
	"mobile" VARCHAR(150),
	"email" VARCHAR(150) NOT NULL,
	"notes" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE,
	"lat" VARCHAR(100),
	"long" VARCHAR (100)
	);



CREATE TABLE ck_dev.dogs (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT NOT NULL REFERENCES ck_dev.clients(id) ON DELETE CASCADE,
	"name" VARCHAR(150),
	"image" VARCHAR,
	"vet_name" VARCHAR(150),
	"vet_phone" VARCHAR(13), -- changed to string input
	"notes" VARCHAR,
	"flag" BOOLEAN DEFAULT FALSE,
	"date" DATE DEFAULT CURRENT_DATE,
	"active" BOOLEAN DEFAULT TRUE,
	"regular" BOOLEAN -- added this so that if a guest dog (client's daughter) is also being walked, they can be added add-hoc
	);


-- ** Changed table ck_dev.name to client_schedule since the days will be set for the client and changes will be made to individual dogs.
-- ** Changed the weekday column titles from m-f to (1-5) to make using MUI calendar data easier.
CREATE TABLE ck_dev.clients_schedule (
	"id" SERIAL PRIMARY KEY,
	"qb_id" INT NOT NULL,
	"client_id" INT NOT NULL REFERENCES ck_dev.clients(id) ON DELETE CASCADE,
	"1" BOOLEAN DEFAULT FALSE,
	"2" BOOLEAN DEFAULT FALSE,
	"3" BOOLEAN DEFAULT FALSE,
	"4" BOOLEAN DEFAULT FALSE,
	"5" BOOLEAN DEFAULT FALSE
	);

	
CREATE TABLE ck_dev.dogs_schedule_changes (
	"id" SERIAL PRIMARY KEY,
	"dog_id" INT NOT NULL REFERENCES ck_dev.dogs(id) ON DELETE CASCADE,
	"client_id" INT NOT NULL REFERENCES ck_dev.clients(id) ON DELETE CASCADE,
	"date_to_change" DATE NOT NULL,
	"is_scheduled" BOOLEAN,
	"date" DATE DEFAULT CURRENT_DATE,
	UNIQUE("dog_id", "date_to_change")
	);
	
-- ** added "week_of_year" to daily_dogs for purposes of invoice query.
-- ** week_of_year added to each data row in mobile.router PUT request	
CREATE TABLE ck_dev.daily_dogs (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150) NOT NULL,
	"date" DATE DEFAULT CURRENT_DATE,
	"dog_id" INT NOT NULL REFERENCES ck_dev.dogs(id),
	"route_id" INT NOT NULL REFERENCES ck_dev.routes(id),
	"client_id" INT NOT NULL REFERENCES ck_dev.clients(id) ON DELETE CASCADE,
	"checked_in" BOOLEAN DEFAULT NULL,
	"no_show" BOOLEAN DEFAULT NULL,
	"cancelled" BOOLEAN DEFAULT NULL,
	"index" SERIAL,
	UNIQUE ("dog_id", "date")
	);

CREATE TABLE ck_dev.admin_notes (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES ck_dev."user"(id) ON DELETE CASCADE,
	"notes" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE,
	"note_type" VARCHAR(8),
	"dog_id" INT REFERENCES ck_dev.dogs(id) ON DELETE CASCADE
	);

CREATE TABLE ck_dev.route_history (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT NOT NULL REFERENCES ck_dev.employees(id) ON DELETE CASCADE,
	"route_id" INT NOT NULL REFERENCES ck_dev.routes(id) ON DELETE CASCADE,
	"date" DATE DEFAULT CURRENT_DATE,
	UNIQUE("emp_id", "date")
);