-- DATABASE NAME: citizen_kanine
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!


-- ORDERING BASED ON DEPENDENT COLUMNS/SECTIONS:
DROP TABLE IF EXISTS daily_dogs;
DROP TABLE IF EXISTS dogs_schedule_changes;
DROP TABLE IF EXISTS clients_schedule;
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS employees_schedule;
DROP TABLE IF EXISTS admin_notes;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS employees;



CREATE TABLE employees (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150), 
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
	"email" VARCHAR(300), -- LATER CHANGE TO NOT NULL
	"admin" BOOLEAN DEFAULT NULL,
	"date" DATE DEFAULT CURRENT_DATE
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

INSERT INTO routes
	("name")
VALUES
	('Tangletown'),
	('Emerson'),
	('Far'),
	('Misfits');
	
CREATE TABLE clients (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150),
	"address" VARCHAR NOT NULL,
	"route_id" INT NOT NULL REFERENCES routes(id),
	"phone" VARCHAR(13),
	"email" VARCHAR(150) NOT NULL,
	"notes" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE
	);

--** Clients MOCK DATA -- Using addresses found in the area surrounding Lake Harriet **--

insert into clients 
	(first_name, last_name, address, route_id, phone, email) 
values 
	('Adolphe', 'Osipov', '2900 W 43rd St, Minneapolis, MN 55410', 4, '(893)236-3575', 'aosipov0@nature.com'),
	('Yorgos', 'Lyles', '4147 Xerxes Ave S, Minneapolis, MN 55410', 1, '(506)409-5891', 'ylyles1@chicagotribune.com'),
	('Joyous', 'Tattersall', '3300 W 44th St, Minneapolis, MN 55410', 4, '(636)411-6655', 'jtattersall2@wordpress.org'),
	('Jocelin', 'Ingerith', '4444 Upton Ave S, Minneapolis, MN 55410', 2, '(422)682-9050', 'jingerith3@mysql.com'),
	('Gardener', 'Trulocke', '3414 W 47th St Room E021, Minneapolis, MN 55410', 3, '(431)890-0167', 'gtrulocke4@hhs.gov'),
	('Janene', 'Wrout', '3608 W 50th St, Minneapolis, MN 55410', 2, '(385)750-1935', 'jwrout5@aboutads.info'),
	('Hamish', 'Lethlay', '4912 Vincent Ave S, Minneapolis, MN 55410', 3, '(438)750-4252', 'hlethlay6@exblog.jp'),
	('Dulcia', 'Eager', '5000 Penn Ave S, Minneapolis, MN 55419', 2, '(956)761-8143', 'deager7@ibm.com'),
	('Zebulen', 'Baldick', '5025 Knox Ave S, Minneapolis, MN 55419', 2, '(764)768-8688', 'zbaldick8@sbwire.com'),
	('Karlene', 'Armall', '812 W 46th St, Minneapolis, MN 55419', 2, '(403)522-9955', 'karmall9@guardian.co.uk'),
	('Rosaleen', 'Faireclough', '4530 Lyndale Ave S, Minneapolis, MN 55419', 1, '(123)912-1803', 'rfaireclougha@github.io'),
	('Malva', 'Belfelt', '4249 Bryant Ave S, Minneapolis, MN 55409', 3, '(589)917-5192', 'mbelfeltb@stumbleupon.com'),
	('Sunny', 'Mateiko', '4100 Lyndale Ave S, Minneapolis, MN 55409', 1, '(838)150-5160', 'smateikoc@illinois.edu'),
	('Noelyn', 'Rowden', '813 W 50th St, Minneapolis, MN 55419', 2, '(976)109-9306', 'nrowdend@uiuc.edu'),
	('Madelina', 'Becerro', '1601 W 50th St, Minneapolis, MN 55419', 1, '(849)163-0399', 'mbecerroe@msu.edu');



CREATE TABLE dogs (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
	"name" VARCHAR(150),
	"image" VARCHAR,
	"vet_name" VARCHAR(150),
	"vet_phone" VARCHAR(13), -- changed to string input
	"notes" VARCHAR,
	"flag" BOOLEAN DEFAULT NULL,
	"date" DATE DEFAULT CURRENT_DATE
	);

--** DOGS MOCK DATA **--
insert into dogs 
	(client_id, name, vet_name, vet_phone) 
values
	(9, 'Cord', 'Cord Slaight', '(448)8303613'),
	(8, 'Corney', 'Corney Agutter', '(560)7340244'),
	(1, 'Micheal', 'Micheal Matschoss', '(488)4063596'),
	(15, 'Derwin', 'Derwin Pritchard', '(504)9197307'),
	(1, 'Darya', 'Darya Jowitt', '(633)5172392'),
	(13, 'Gunner', 'Gunner Hankins', '(857)3817172'),
	(9, 'Pamela', 'Pamela Vick', '(307)8680328'),
	(4, 'Lia', 'Lia Lanphier', '(332)9874217'),
	(3, 'Fabiano', 'Fabiano O'' Bee', '(778)1563440'),
	(5, 'Aylmar', 'Aylmar Fleisch', '(161)9087110'),
	(11, 'Fredia', 'Fredia Gilhooly', '(107)8843957'),
	(7, 'Dede', 'Dede Desson', '(965)7732496'),
	(12, 'Noah', 'Noah Burgisi', '(963)2057498'),
	(10, 'Lynda', 'Lynda Quoit', '(593)4846767'),
	(6, 'Vinnie', 'Vinnie Behne', '(128)3824261'),
	(9, 'Tami', 'Tami Keegan', '(225)4787743'),
	(14, 'Ludovika', 'Ludovika Saladin', '(197)4161988'),
	(2, 'Ebonee', 'Ebonee Ramsier', '(588)7890127'),
	(14, 'Audra', 'Audra Schrieves', '(368)2739382'),
	(11, 'Ryann', 'Ryann Bertwistle', '(485)6205496'),
	(3, 'Sheffield', 'Sheffield Crothers', '(430) 5630934');
	
-- ** Changed table name to client_schedule since the days will be set for the client and changes will be made to individual dogs.
CREATE TABLE clients_schedule (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
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
	
CREATE TABLE admin_notes (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
	"notes" VARCHAR
	);	