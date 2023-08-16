CREATE SCHEMA IF NOT EXISTS ck_prod;

-- ORDERING BASED ON DEPENDENT COLUMNS/SECTIONS:
DROP TABLE IF EXISTS ck_prod.daily_dogs;
DROP TABLE IF EXISTS ck_prod.dogs_schedule_changes;
DROP TABLE IF EXISTS ck_prod.clients_schedule;
DROP TABLE IF EXISTS ck_prod.dogs;
DROP TABLE IF EXISTS ck_prod.clients;
DROP TABLE IF EXISTS ck_prod.routes;
DROP TABLE IF EXISTS ck_prod.employees_schedule;
DROP TABLE IF EXISTS ck_prod.employees_schedule_changes;
DROP TABLE IF EXISTS ck_prod.admin_notes;
DROP TABLE IF EXISTS ck_prod."user";
DROP TABLE IF EXISTS ck_prod.employees;
DROP TABLE IF EXISTS ck_prod.services;


CREATE TABLE ck_prod.employees (
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

--** Employees MOCK DATA **--
-- REMOVE BEFORE DEPLOYMENT
-- insert into ck_prod.employees 
-- 	(first_name, last_name, email, phone, street, city, "zip", admin) 
-- values 
-- 	('Danny', 'Paolini', 'dpaolini0@paypal.com', '(840)673-2127', '2900 W 43rd St', 'Minneapolis',  55410, false),
-- 	('Grant', 'Abels', 'gabels1@weather.com', '(885)747-7091', '2900 W 43rd St', 'Minneapolis',  55410, false),
-- 	('Angie', 'Stevens', 'sohickey2@google.ru', '(915)638-0768', '2900 W 43rd St', 'Minneapolis',  55410, false),
-- 	('Reeba', 'McEntire', 'rpretswell3@feedburner.com', '(964)688-1625', '2900 W 43rd St', 'Minneapolis',  55410, false),
-- 	('Florence', 'Wells', 'fmary4@unesco.org', '(697)209-6190', '2900 W 43rd St', 'Minneapolis',  55410, false),
-- 	('Otis', 'Barrand', 'obarrand5@wufoo.com', '(537)159-4107', '2900 W 43rd St', 'Minneapolis',  55410, false),
-- 	('Lydia', 'Nichols', 'lnichols6@virginia.edu', '(802)528-0961', '2900 W 43rd St', 'Minneapolis',  55410, false);


-- removed email from user since we no longer need it for password retrieval.
CREATE TABLE ck_prod."user" (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT REFERENCES ck_prod.employees(id) ON DELETE CASCADE,
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
INSERT INTO ck_prod."user"
	("username","password","admin", "emp_id","email")
VALUES
	('admin','$2a$10$UqOGOFQpFGSPEi/X1emtGOkqYQ.LD6SjSC03FZ2lZpb5EiBEbrfEu',true, null,'thecitizenkanine@gmail.com');
	-- REMOVE BEFORE DEPLOYMENT
	-- ('packleader','$2a$10$UqOGOFQpFGSPEi/X1emtGOkqYQ.LD6SjSC03FZ2lZpb5EiBEbrfEu',true, 2,null);
	

CREATE TABLE ck_prod.employees_schedule (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT NOT NULL REFERENCES ck_prod.employees(id) ON DELETE CASCADE ,
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

-- ADDED EMP SCHEDULE CHANGES TABLE ck_prod.(Yani)
CREATE TABLE ck_prod.employees_schedule_changes (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT NOT NULL,   --REFERENCES ck_prod.clients(id) ON DELETE CASCADE--
	"date_to_change" DATE NOT NULL,
	"is_scheduled" BOOLEAN,
	"date" DATE DEFAULT CURRENT_DATE,
	UNIQUE("emp_id", "date_to_change")
	);

CREATE TABLE ck_prod.routes (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150)
	);

INSERT INTO ck_prod.routes
	("name")
VALUES
	('Tangletown'),
	('Emerson'),
	('Far'),
	('Misfits'),
	('Unassigned');

CREATE TABLE ck_prod.services (
	"id" SERIAL PRIMARY KEY,
	"qb_id" INT NULL,
	"name" VARCHAR (150),
	"price" INT
);

-- service names MUST match names in QB
INSERT INTO ck_prod.services
	("name", "price")
VALUES
	('Group Dog Walking:Walk 1 dog - Ad hoc', '23'),
	('Group Dog Walking:Walk 1 dog 2-4x / week', '32'),
	('Group Dog Walking:Walk 1 dog 5 days / week', '4'),
	('Group Dog Walking:Walk 2 dogs - Ad hoc', '4'),
	('Group Dog Walking:Walk 2 dogs 2-4x / week', '5'),
	('Group Dog Walking:Walk 2 dogs 5 days / week', '42'),
	('Group Dog Walking:Walk 3 dogs', '54');

CREATE TABLE ck_prod.clients (
	"id" SERIAL PRIMARY KEY,
	"qb_id" INT NOT NULL,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150),
	"street" VARCHAR(150),
	"city" VARCHAR(150),
	"zip" INT,
--	"service_id" INT NOT NULL REFERENCES,
	"route_id" INT REFERENCES ck_prod.routes(id),
	"phone" VARCHAR(150),
	"mobile" VARCHAR(150),
	"email" VARCHAR(150) NOT NULL,
	"notes" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE,
	"lat" VARCHAR(100),
	"long" VARCHAR (100)
	);



CREATE TABLE ck_prod.dogs (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT NOT NULL REFERENCES ck_prod.clients(id) ON DELETE CASCADE,
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


-- ** Changed table ck_prod.name to client_schedule since the days will be set for the client and changes will be made to individual dogs.
-- ** Changed the weekday column titles from m-f to (1-5) to make using MUI calendar data easier.
CREATE TABLE ck_prod.clients_schedule (
	"id" SERIAL PRIMARY KEY,
	"qb_id" INT NOT NULL,
	"client_id" INT NOT NULL REFERENCES ck_prod.clients(id) ON DELETE CASCADE,
	"1" BOOLEAN DEFAULT FALSE,
	"2" BOOLEAN DEFAULT FALSE,
	"3" BOOLEAN DEFAULT FALSE,
	"4" BOOLEAN DEFAULT FALSE,
	"5" BOOLEAN DEFAULT FALSE
	);

	
CREATE TABLE ck_prod.dogs_schedule_changes (
	"id" SERIAL PRIMARY KEY,
	"dog_id" INT NOT NULL REFERENCES ck_prod.dogs(id) ON DELETE CASCADE,
	"client_id" INT NOT NULL REFERENCES ck_prod.clients(id) ON DELETE CASCADE,
	"date_to_change" DATE NOT NULL,
	"is_scheduled" BOOLEAN,
	"date" DATE DEFAULT CURRENT_DATE,
	UNIQUE("dog_id", "date_to_change")
	);
	
-- ** added "week_of_year" to daily_dogs for purposes of invoice query.
-- ** week_of_year added to each data row in mobile.router PUT request	
CREATE TABLE ck_prod.daily_dogs (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150) NOT NULL,
	"date" DATE DEFAULT CURRENT_DATE,
	"dog_id" INT NOT NULL REFERENCES ck_prod.dogs(id),
	"route_id" INT NOT NULL REFERENCES ck_prod.routes(id),
	"client_id" INT NOT NULL REFERENCES ck_prod.clients(id) ON DELETE CASCADE,
	"checked_in" BOOLEAN DEFAULT NULL,
	"no_show" BOOLEAN DEFAULT NULL,
	"cancelled" BOOLEAN DEFAULT NULL,
	UNIQUE ("dog_id", "date")
	);

CREATE TABLE ck_prod.admin_notes (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES ck_dev."user"(id) ON DELETE CASCADE,
	"notes" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE,
	"note_type" VARCHAR(8)
	);