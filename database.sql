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
DROP TABLE IF EXISTS employees_schedule_changes;
DROP TABLE IF EXISTS admin_notes;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS services;

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
	"date" DATE DEFAULT CURRENT_DATE,
	"admin" BOOLEAN DEFAULT FALSE
	);

--** Employees MOCK DATA **--
-- REMOVE BEFORE DEPLOYMENT
insert into employees 
	(first_name, last_name, email, phone, street, city, "zip", admin) 
values 
	('Danny', 'Paolini', 'dpaolini0@paypal.com', '(840)673-2127', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Grant', 'Abels', 'gabels1@weather.com', '(885)747-7091', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Angie', 'Stevens', 'sohickey2@google.ru', '(915)638-0768', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Reeba', 'McEntire', 'rpretswell3@feedburner.com', '(964)688-1625', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Florence', 'Wells', 'fmary4@unesco.org', '(697)209-6190', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Otis', 'Barrand', 'obarrand5@wufoo.com', '(537)159-4107', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Lydia', 'Nichols', 'lnichols6@virginia.edu', '(802)528-0961', '2900 W 43rd St', 'Minneapolis',  55410, false);


-- removed email from user since we no longer need it for password retrieval.
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT REFERENCES employees(id) ON DELETE CASCADE,
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
INSERT INTO "user"
	("username","password","admin", "emp_id","email")
VALUES
	('admin','$2a$10$UqOGOFQpFGSPEi/X1emtGOkqYQ.LD6SjSC03FZ2lZpb5EiBEbrfEu',true, null,'citizenkanineapp@gmail.com'),
	-- REMOVE BEFORE DEPLOYMENT
	('packleader','$2a$10$UqOGOFQpFGSPEi/X1emtGOkqYQ.LD6SjSC03FZ2lZpb5EiBEbrfEu',true, 2,null);
	

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
-- REMOVE BEFORE DEPLOYMENT

insert into employees_schedule
	("emp_id", "week", "1", "2", "3", "4", "5") 
values
	(1, 1, true, true, false, true, true),
	(1, 2, false, true, false, false, false),
	(2, 1, false, true, true, false, false),
	(2, 2, false, true, true, false, true),
	(3, 1, false, false, false, false, false),
	(3, 2, false, false, false, false, false),
	(4, 1, true, true, true, false, true),
	(4, 2, true, true, true, false, true),
	(5, 1, false, false, false, true, true),
	(5, 2, false, false, false, true, true),
	(6, 1, false, true, true, true, false),
	(6, 2, false, true, true, true, false),
	(7, 1, true, true, true, true, false),
	(7, 2, true, true, true, true, false);

-- ADDED EMP SCHEDULE CHANGES TABLE (Yani)
CREATE TABLE employees_schedule_changes (
	"id" SERIAL PRIMARY KEY,
	"emp_id" INT NOT NULL,   --REFERENCES clients(id) ON DELETE CASCADE--
	"date_to_change" DATE NOT NULL,
	"is_scheduled" BOOLEAN,
	"date" DATE DEFAULT CURRENT_DATE,
	UNIQUE("emp_id", "date_to_change")
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
	('Misfits'),
	('Unassigned');

CREATE TABLE services (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (150),
	"price" INT
);

INSERT INTO services
	("name", "price")
VALUES
	('Group Dog Walking: Friends & Family', '20'),
	('Group Dog Walking: 1 dog - Ad hoc', '35'),
	('Group Dog Walking: 1 dog 2-4x / week', '30'),
	('Group Dog Walking: 1 dog 5x / week', '26'),
	('Group Dog Walking: 2 dogs - Ad hoc', '45'),
	('Group Dog Walking: 2 Dogs 2-4x / week', '42'),
	('Group Dog Walking: 2 dogs 5x / week', '37'),
	('Group Dog Walking: 3 dogs', '54'); --3 dogs, how many times a week?

CREATE TABLE clients (
	"id" SERIAL PRIMARY KEY,
	"qb_id" INT NOT NULL,
	"first_name" VARCHAR(150) NOT NULL,
	"last_name" VARCHAR(150),
	"street" VARCHAR(150),
	"city" VARCHAR(150),
	"zip" INT,
--	"service_id" INT NOT NULL REFERENCES,
	"route_id" INT REFERENCES routes(id),
	"phone" VARCHAR(150),
	"mobile" VARCHAR(150),
	"email" VARCHAR(150) NOT NULL,
	"notes" VARCHAR,
	"date" DATE DEFAULT CURRENT_DATE,
	"lat" VARCHAR(100),
	"long" VARCHAR (100)
	);

--** Clients MOCK DATA -- Using addresses found in the area surrounding Lake Harriet **--
-- REMOVE BEFORE DEPLOYMENT
--January 20th Note: This is no longer current.  Does not include a QB ID column


-- insert into clients 
-- 	(first_name, last_name, street, city, zip, route_id, phone, email, notes) 
-- values 
	-- ('Adam', 'Olson', '2900 W 43rd St', 'Minneapolis',  55410, 4, '(893)236-3575', 'aolson@nature.com', 'Back Door'),
	-- ('Jamie', 'Stevens', '4147 Xerxes Ave S', 'Minneapolis', 55410, 1, '(506)409-5891', 'jstevens2@chicagotribune.com', 'Code 1243'),
	-- ('Robert', 'Smith', '3300 W 44th St', 'Minneapolis', 55410, 4, '(636)411-6655', 'rsmith42@wordpress.org', 'Key under the door mat'),
	-- ('Jessica', 'Higgins', '4444 Upton Ave S', 'Minneapolis', 55410, 2, '(422)682-9050', 'jhiggins12@mysql.com', 'Dogs will be in the entry way'),
	-- ('Melissa', 'Schaefer', '3414 W 47th St Room E021', 'Minneapolis', 55410, 3, '(431)890-0167', 'mschaeff@hhs.gov', 'They will unlock the door after knocking'),
	-- ('Ross', 'McClain', '3608 W 50th St', 'Minneapolis', 55410, 2, '(385)750-1935', 'rmcclain1@aboutads.info', 'Door code 11234'),
	-- ('Nick', 'Wilkerson', '4912 Vincent Ave S', 'Minneapolis', 55410, 3, '(438)750-4252', 'nwilks6@exblog.jp', 'Side door - key under rock'),
	-- ('Bob', 'Stein', '5000 Penn Ave S', 'Minneapolis', 55419, 2, '(956)761-8143', 'bst31n@ibm.com', 'Pack leader should have key - use side door'),
	-- ('George', 'Nelson', '5025 Knox Ave S', 'Minneapolis', 55419, 2, '(764)768-8688', 'george.nelson@sbwire.com', 'Dial #498'),
	-- ('Thomas', 'Romero', '812 W 46th St', 'Minneapolis', 55419, 2, '(403)522-9955', 'thomrom56@guardian.co.uk', 'Door code 9754'),
	-- ('Heather', 'Park', '4530 Lyndale Ave S', 'Minneapolis', 55419, 1, '(123)912-1803', 'hparks@github.io', 'Key underneath the garden gnome on back steps'),
	-- ('Stephanie', 'Carter', '4249 Bryant Ave S', 'Minneapolis', 55409, 3, '(589)917-5192', 'othermscarter@stumbleupon.com', 'Side door remains unlocked'),
	-- ('Amanda', 'Love', '4100 Lyndale Ave S', 'Minneapolis', 55409, 4, '(838)150-5160', 'loveamanda@illinois.edu', 'Dogs in the foyer'),
	-- ('Amy', 'Rowland', '4312 Upton Ave S', 'Minneapolis', 55410, 4, '(976)109-9306', 'arowland5@uiuc.edu', 'Call Amanda she will buzz you in'),
	-- ('Patricia', 'Reid', '2720 W 43rd St', 'Minneapolis', 55419, 4, '(976)109-9306', 'patriciaR3@guardian.co.uk', 'Take dogs out of their kennels'),
	-- ('Mary', 'Griffith', '813 W 50th St', 'Minneapolis', 55419, 4, '(976)109-9306', 'mgriffs12@hhs.gov', 'Front door - knock three times'),
	-- ('Karen', 'Wiggins', '4291 Queen Ave S', 'Minneapolis', 55419, 4, '(976)109-9306', 'karenwiggins@exblog.jp', 'Smart Lock - Call Karen to get in'),
	-- ('David', 'Garner', '4135 W Lake Harriert Pkwy', 'Minneapolis', 55419, 3, '(976)109-9306', 'garnerd612@uiuc.edu', 'Door Code # 76331'),
	-- ('Thomas', 'Marquez', '4237 Colfax Ave S', 'Minneapolis', 55419, 3, '(976)109-9306', 'tmarq.ez@stumbleupon.com', 'Check for key under door mat'),
	-- ('Rob', 'Cannon', '812 W 46th St', 'Minneapolis', 55419, 3, '(976)109-9306', 'cannonpress@sbwire.com', 'Side Door - Retina scan entry'),
	-- ('Don', 'Jacobson', '1601 W 50th St', 'Minneapolis', 55419, 1, '(849)163-0399', 'dj1601@msu.edu', 'Door Code #45312');


CREATE TABLE dogs (
	"id" SERIAL PRIMARY KEY,
	"client_id" INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
	"name" VARCHAR(150),
	"image" VARCHAR,
	"vet_name" VARCHAR(150),
	"vet_phone" VARCHAR(13), -- changed to string input
	"notes" VARCHAR,
	"flag" BOOLEAN DEFAULT FALSE,
	"date" DATE DEFAULT CURRENT_DATE,
	"active" BOOLEAN DEFAULT TRUE,
	"regular" BOOLEAN DEFAULT TRUE -- added this so that if a guest dog (client's daughter) is also being walked, they can be added add-hoc
	);

--** Dogs MOCK DATA **--
-- REMOVE BEFORE DEPLOYMENT

-- insert into dogs 
-- 	(client_id, name, vet_name, vet_phone, image, notes, flag) 
-- values
-- 	(1, 'Alvin', 'Micheal Matschoss', '(488)406-3596', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904895/Dog%20Photos/Pictures-Dogs-Making-Funny-Faces.jpg_copy_mckfqu.png', 'Very good boy', false),
-- 	(1, 'Balto', 'Micheal Matschoss', '(488)406-3596', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/463527_copy_wi2o1i.png', 'Very brave dog that can lead a pack of dogs through a nasty winter storm', false),
-- 	(2, 'Finn', 'Ebonee Ramsier', '(588)789-0127', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904893/Dog%20Photos/photo-1518020382113-a7e8fc38eac9_iciudy.jpg', 'No treats! He is on a diet', true),
-- 	(3, 'Ike', 'Sheffield Crothers', '(430)563-0934', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/images_mocxln.jpg', 'Train on sitting during rest periods', true),
-- 	(3, 'Chef', 'Sheffield Crothers', '(430)563-0934', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/Pug-Dog.jpg_copy_zx4qbw.png', 'Cooking show celebrity - keep the pawparazzi away', true),
-- 	(4, 'Maple', 'Lia Lanphier', '(332)987-4217', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/4b424cd8c2981b8cc9f5cffbc0d07792_jsyear.jpg', 'Really loves leaves', false),
-- 	(5, 'Otis', 'Aylmar Fleisch', '(161)908-7110', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/funny-pet-stories_rxl13n.jpg', null, false),
-- 	(5, 'Baxter', 'Aylmar Fleisch', '(161)908-7110', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/5da9debc045a31381e7c8d94_copy_muiawp.png', 'Perfect little guy', false),
-- 	(6, 'Yogi', 'Vinnie Behne', '(128)382-4261', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/istockphoto-1212177973-612x612_jaztmp.jpg', null, false),
-- 	(7, 'Ruben', 'Dede Desson', '(965)773-2496', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910987/Dog%20Photos/New/New%20New/cavalier-king-charles-spaniel-card-medium_j7mpec.jpg', null, false),
-- 	(8, 'Cord', 'Corney Agutter', '(560)734-0244', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/GettyImages-709182477_lpst4n.jpg', null, false),
-- 	(9, 'Rufus', 'Cord Slaight', '(448)830-3613', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910987/Dog%20Photos/New/New%20New/cool-dog-breeds-blue-heeler-762x1024_gkjrpu.jpg', null, false),
-- 	(9, 'Max', 'Cord Slaight', '(448)830-3613', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/AdobeStock_274099078.jpg_copy_vhrmcz.png', 'Needs to work on listening', true),
-- 	(9, 'Duffy', 'Cord Slaight', '(448)830-3613', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/american-eskimo-dog-royalty-free-image-184272401-1565190028_vpu6sk.jpg', null, false),
-- 	(10, 'Lynda', 'Liz Quoit', '(593)484-6767', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/istockphoto-680810342-612x612_tso1kr.jpg', null, false),
-- 	(10, 'Lori', 'Liz Quoit', '(593)484-6767', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/istockphoto-618949520-612x612_uttcq8.jpg', null, false),
-- 	(11, 'Freddy', 'Ryann Bertwistle', '(485)620-5496', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/portrait-of-dog-on-snow-royalty-free-image-727142515-1556050424_ud9onj.jpg', null, false),
-- 	(11, 'Ryan', 'Rosie Bertwistle', '(485)620-5496', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/GettyImages-889552354-e1606774439626_y2shap.jpg', null, false),
-- 	(12, 'Noah', 'Gunner Hankins', '(857)381-7172', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/welsh-springer-spaniel_dhcjmk.jpg', 'Total diva - try and keep away from Louie for now', true),
-- 	(13, 'Shaggy', 'Gunner Hankins', '(857)381-7172', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910986/Dog%20Photos/New/New%20New/Bergamasco-Sheepdog-standing-in-a-pasture_j0hh3h.jpg', null, false),
-- 	(14, 'Bert', 'Ludovika Saladin', '(197)416-1988', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/5da9dd1c045a3104cd06f2a2_copy_w5mkmi.png', null, false),
-- 	(14, 'Willow', 'Audra Schrieves', '(368)273-9382', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910987/Dog%20Photos/New/New%20New/dog-breeds-that-look-different-1593069055_khmxve.jpg', 'Her fur gets really matted - may need brushing on the way home', true),
-- 	(15, 'Audra', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910986/Dog%20Photos/New/New%20New/image-2_iy7rwa.jpg', null, false),
-- 	(15, 'Luna', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910986/Dog%20Photos/New/New%20New/1458326999-gettyimages-480245719_foepiq.jpg', null, false),
-- 	(16, 'Milo', 'James Moon', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/medium-sized-dogs-1613083812_te198m.jpg', 'Allergic to grass', true),
-- 	(16, 'Lola', 'James Moon', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/beautiful-australian-shepherd-walking-royalty-free-image-168814214-1565190235_ssrcki.jpg', null, false),
-- 	(17, 'Teddy', 'Rose Cuevas', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/medium-dog-breeds-sharpie-1613075637_ax8quv.jpg', null, false),
-- 	(18, 'Duke', 'Derek Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/purebred-dog-chow-chow-royalty-free-image-526855507-1560959187_ve1cy6.jpg', null, false),
-- 	(18, 'Daisy', 'Derek Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/Cute-medium-sized-dogs_uyxe1r.jpg', 'Needs time to warm up to new friends', true),
-- 	(18, 'Cooper', 'Derek Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/breed_profile_corgi_1117986_recirc_917-dc0372b7151c442bab53666b4687a8fd-8d973deaf99a42878fa0d2ee5da84ced_lijohf.jpg', null, false),
-- 	(19, 'Bella', 'Robert Cannon', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/dog-shetland-sheepdog-collie-sheltie-royalty-free-image-491206081-1565123992_ovh8t6.jpg', null, false),
-- 	(20, 'Zoe', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/medium-dog-breeds-border-collie-1613075882_azf5qj.jpg', null, false),
-- 	(20, 'Louie', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/pembroke-welsh-corgi-card-medium_dsgd2l.jpg', null, false),
-- 	(20, 'Nova', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/medium-sized-dogs-bull-terrier-1613077403_srggj5.jpg', 'Total diva - look out for her attitude', true);


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
-- REMOVE BEFORE DEPLOYMENT
-- everyone is scheduled for the demo tuesday
-- insert into clients_schedule
-- 	("client_id", "1", "2", "3", "4", "5") 
-- values
-- 	(1, true, true, false, true, true),
-- 	(2, false, true, false, false, false),
-- 	(3, false, true, false, false, false),
-- 	(4, true, true, true, false, true),
-- 	(5, false, true, false, true, true),
-- 	(6, false, true, true, true, false),
-- 	(7, true, true, true, true, false),
-- 	(8, true, true, false, false, true),
-- 	(9, false, true, false, false, false),
-- 	(10, false, true, false, true, true),
-- 	(11, true, true, false, true, true),
-- 	(12, false, true, false, true, true),
-- 	(13, true, true, true, true, true),
-- 	(14, false, true, true, false, true),
-- 	(15, true, true, false, false, false),
-- 	(16, true, true, false, true, false),
-- 	(17, true, true, false, false, false),
-- 	(18, true, true, false, true, false),
-- 	(19, true, true, false, false, false),
-- 	(20, true, true, false, false, false);
	
	
CREATE TABLE dogs_schedule_changes (
	"id" SERIAL PRIMARY KEY,
	"dog_id" INT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
	"client_id" INT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
	"date_to_change" DATE NOT NULL,
	"is_scheduled" BOOLEAN,
	"date" DATE DEFAULT CURRENT_DATE,
	UNIQUE("dog_id", "date_to_change")
	);
	
-- ** added "week_of_year" to daily_dogs for purposes of invoice query.
-- ** week_of_year added to each data row in mobile.router PUT request	
CREATE TABLE daily_dogs (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(150) NOT NULL,
	"date" DATE DEFAULT CURRENT_DATE,
	"dog_id" INT NOT NULL REFERENCES dogs(id),
	"route_id" INT NOT NULL REFERENCES routes(id),
	"client_id" INT NOT NULL REFERENCES clients(id),
	"checked_in" BOOLEAN DEFAULT NULL,
	"no_show" BOOLEAN DEFAULT NULL,
	"cancelled" BOOLEAN DEFAULT NULL,
	UNIQUE ("dog_id", "date")
	);

-- ** daily_dogs MOCK DATA
-- REMOVE BEFORE DEPLOYMENT

-- insert into daily_dogs
-- 	("date","name", "dog_id","checked_in","no_show","cancelled","route_id","client_id")
-- values
-- 	('2022-10-31','Finn','3','true','false','false','1','1'),
-- 	('2022-10-31','Chef','5','true','false','false','1','3'),
-- 	('2022-11-02','Finn','3','true','false','false','1','1'),
-- 	('2022-11-02','Chef','5','true','false','false','1','3'),
-- 	('2022-11-04','Finn','3','true','false','false','1','1'),
-- 	('2022-11-04','Chef','5','true','false','false','1','3'),
-- 	('2022-11-07','Finn','3','true','false','false','1','1'),
-- 	('2022-11-07','Chef','5','true','false','false','1','3'),
-- 	('2022-11-09','Finn','3','true','false','false','1','1'),
-- 	('2022-11-11','Finn','3','false','true','false','1','1'),
-- 	('2022-11-11','Chef','5','false','true','false','1','3'),
-- 	('2022-10-31','Maple','6','true','false','false','1','4'),
-- 	('2022-11-01','Maple','6','true','false','false','1','4'),
-- 	('2022-11-02','Maple','6','true','false','false','1','4'),
-- 	('2022-11-03','Maple','6','false','true','false','1','4'),
-- 	('2022-11-04','Maple','6','true','false','false','1','4'),
-- 	('2022-11-07','Maple','6','true','false','false','1','4'),
-- 	('2022-11-08','Maple','6','true','false','false','1','4'),
-- 	('2022-11-09','Maple','6','true','false','false','1','4');

CREATE TABLE admin_notes (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
	"notes" VARCHAR
	);

INSERT INTO admin_notes
	("user_id", "notes")
VALUES
	('1', 'Grant is swapping shifts with Lydia on the 24th'),
	('1', 'Remove Florence from employees - she went to attend Prime'),
	('1', 'Add the new puppy to the Higgins Family'),
	('1', 'Change protocol for Nick W.'),
	('1', 'Double check Invoices for October'),
	('1', 'Export CSV for November'),
	('1', 'Buy more leashes for the supply cabinet');

-- CREATE TABLE oauth2_access_tokens (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"access_token" VARCHAR(4096),
-- 	"time", TIMESTAMP
-- 	);

-- CREATE TABLE oauth2_refresh_token (
-- 	"id" SERIAL PRIMARY KEY,
-- 	"refresh_token" VARCHAR(512),
-- 	"time", TIMESTAMP
-- 	);