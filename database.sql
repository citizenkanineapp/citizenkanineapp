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
	"phone" VARCHAR(13), 
	"image" VARCHAR,
	"street" VARCHAR(150),
	"city" VARCHAR(150),
	"zip" INT,
	"date" DATE DEFAULT CURRENT_DATE
	);

--** Employees MOCK DATA **--
insert into employees 
	(first_name, last_name, email, phone, street, city, "zip") 
values 
	('Den', 'Paolini', 'dpaolini0@paypal.com', '(840)6732127', '2900 W 43rd St', 'Minneapolis',  55410),
	('Grantley', 'Abels', 'gabels1@weather.com', '(885)7477091', '2900 W 43rd St', 'Minneapolis',  55410),
	('Say', 'O''Hickey', 'sohickey2@google.ru', '(915)6380768', '2900 W 43rd St', 'Minneapolis',  55410),
	('Reeba', 'Pretswell', 'rpretswell3@feedburner.com', '(964)6881625', '2900 W 43rd St', 'Minneapolis',  55410),
	('Fiorenze', 'Mary', 'fmary4@unesco.org', '(697)2096190', '2900 W 43rd St', 'Minneapolis',  55410),
	('Osborne', 'Barrand', 'obarrand5@wufoo.com', '(537)1594107', '2900 W 43rd St', 'Minneapolis',  55410),
	('Lidia', 'Nichols', 'lnichols6@virginia.edu', '(802)5280961', '2900 W 43rd St', 'Minneapolis',  55410),
	('Stephanie', 'Rimbault', 'srimbault7@state.tx.us', '(609)6392085', '2900 W 43rd St', 'Minneapolis',  55410),
	('Andris', 'Batram', 'abatram8@vinaora.com', '(395)7396444', '2900 W 43rd St', 'Minneapolis',  55410),
	('Renae', 'Pettwood', 'rpettwood9@printfriendly.com', '(418)8794563', '2900 W 43rd St', 'Minneapolis',  55410);

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
	"week" INT NOT NULL,
	"1" BOOLEAN DEFAULT FALSE,
	"2" BOOLEAN DEFAULT FALSE,
	"3" BOOLEAN DEFAULT FALSE,
	"4" BOOLEAN DEFAULT FALSE,
	"5" BOOLEAN DEFAULT FALSE
	);


--** Employee Schedule MOCK DATA **--
insert into employees_schedule
	("emp_id", "week", "1", "2", "3", "4", "5") 
values
	(1, 1, true, true, false, true, true),
	(1, 2, false, true, false, false, false),
	(2, 1, false, true, false, false, false),
	(2, 2, false, true, false, false, false),
	(3, 1, false, false, false, false, false),
	(3, 2, false, false, false, false, false),
	(4, 1, true, true, true, false, true),
	(4, 2, true, true, true, false, true),
	(5, 1, false, false, false, true, true),
	(5, 2, false, false, false, true, true),
	(6, 1, false, true, true, true, false),
	(6, 2, false, true, true, true, false),
	(7, 1, true, true, true, true, false),
	(7, 2, true, true, true, true, false),
	(8, 1, true, true, true, false, true),
	(8, 2, true, false, false, false, true),
	(9, 1, false, true, false, false, false),
	(9, 2, false, true, false, false, false),
	(10, 1, false, false, false, true, true),
	(10, 2, false, false, false, true, true);


INSERT INTO employees_schedule
	("emp_id", "week")
VALUES	
	(1,1),
	(1,2),
	(2,1),
	(2,2),
	(3,1),
	(3,2),
	(4,1),
	(4,2),
	(5,1),
	(5,2),
	(6,1),
	(6,2),
	(7,1),
	(7,2),
	(8,1),
	(8,2),
	(9,1),
	(9,2),
	(10,1),
	(10,2);
	


CREATE TABLE routes (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150)
	);

INSERT INTO routes
	("name")
VALUES
	('tangletown'),
	('emerson'),
	('far'),
	('misfits'),
	('unassigned');
	
CREATE TABLE clients (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150),
	"street" VARCHAR(150),
	"city" VARCHAR(150),
	"zip" INT,
	"route_id" INT NOT NULL REFERENCES routes(id),
	"phone" VARCHAR(13),
	"email" VARCHAR(150) NOT NULL,
	"notes" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE
	);

--** Clients MOCK DATA -- Using addresses found in the area surrounding Lake Harriet **--

insert into clients 
	(first_name, last_name, street, city, zip, route_id, phone, email) 
values 
	('Adolphe', 'Osipov', '2900 W 43rd St', 'Minneapolis',  55410, 4, '(893)236-3575', 'aosipov0@nature.com'),
	('Yorgos', 'Lyles', '4147 Xerxes Ave S', 'Minneapolis', 55410, 1, '(506)409-5891', 'ylyles1@chicagotribune.com'),
	('Joyous', 'Tattersall', '3300 W 44th St', 'Minneapolis', 55410, 4, '(636)411-6655', 'jtattersall2@wordpress.org'),
	('Jocelin', 'Ingerith', '4444 Upton Ave S', 'Minneapolis', 55410, 2, '(422)682-9050', 'jingerith3@mysql.com'),
	('Gardener', 'Trulocke', '3414 W 47th St Room E021', 'Minneapolis', 55410, 3, '(431)890-0167', 'gtrulocke4@hhs.gov'),
	('Janene', 'Wrout', '3608 W 50th St', 'Minneapolis', 55410, 2, '(385)750-1935', 'jwrout5@aboutads.info'),
	('Hamish', 'Lethlay', '4912 Vincent Ave S', 'Minneapolis', 55410, 3, '(438)750-4252', 'hlethlay6@exblog.jp'),
	('Dulcia', 'Eager', '5000 Penn Ave S', 'Minneapolis', 55419, 2, '(956)761-8143', 'deager7@ibm.com'),
	('Zebulen', 'Baldick', '5025 Knox Ave S', 'Minneapolis', 55419, 2, '(764)768-8688', 'zbaldick8@sbwire.com'),
	('Karlene', 'Armall', '812 W 46th St', 'Minneapolis', 55419, 2, '(403)522-9955', 'karmall9@guardian.co.uk'),
	('Rosaleen', 'Faireclough', '4530 Lyndale Ave S', 'Minneapolis', 55419, 1, '(123)912-1803', 'rfaireclougha@github.io'),
	('Malva', 'Belfelt', '4249 Bryant Ave S', 'Minneapolis', 55409, 3, '(589)917-5192', 'mbelfeltb@stumbleupon.com'),
	('Sunny', 'Mateiko', '4100 Lyndale Ave S', 'Minneapolis', 55409, 1, '(838)150-5160', 'smateikoc@illinois.edu'),
	('Noelyn', 'Rowden', '813 W 50th St', 'Minneapolis', 55419, 2, '(976)109-9306', 'nrowdend@uiuc.edu'),
	('Madelina', 'Becerro', '1601 W 50th St', 'Minneapolis', 55419, 1, '(849)163-0399', 'mbecerroe@msu.edu');



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

--** Dogs MOCK DATA **--
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
-- ** Changed the weekday column titles from m-f to (1-5) to make using MUI calendar data easier.
CREATE TABLE clients_schedule (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
	"1" BOOLEAN DEFAULT FALSE,
	"2" BOOLEAN DEFAULT FALSE,
	"3" BOOLEAN DEFAULT FALSE,
	"4" BOOLEAN DEFAULT FALSE,
	"5" BOOLEAN DEFAULT FALSE
	);

--** Clients Schedule MOCK DATA **--
insert into clients_schedule
	("client_id", "1", "2", "3", "4", "5") 
values
	(1, true, true, false, true, true),
	(2, false, true, false, false, false),
	(3, false, false, false, false, false),
	(4, true, true, true, false, true),
	(5, false, false, false, true, true),
	(6, false, true, true, true, false),
	(7, true, true, true, true, false),
	(8, true, false, false, false, true),
	(9, false, true, false, false, false),
	(10, false, false, false, true, true),
	(11, true, false, false, true, true),
	(12, false, false, false, true, true),
	(13, true, false, true, true, true),
	(14, false, true, true, false, true),
	(15, true, true, false, true, false);
	
	
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