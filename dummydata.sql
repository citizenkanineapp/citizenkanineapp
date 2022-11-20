--** Employees MOCK DATA **--
insert into employees 
	(first_name, last_name, email, phone, street, city, "zip", admin) 
values 
	('Den', 'Paolini', 'dpaolini0@paypal.com', '(840)6732127', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Grantley', 'Abels', 'gabels1@weather.com', '(885)7477091', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Say', 'O''Hickey', 'sohickey2@google.ru', '(915)6380768', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Reeba', 'Pretswell', 'rpretswell3@feedburner.com', '(964)6881625', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Fiorenze', 'Mary', 'fmary4@unesco.org', '(697)2096190', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Osborne', 'Barrand', 'obarrand5@wufoo.com', '(537)1594107', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Lidia', 'Nichols', 'lnichols6@virginia.edu', '(802)5280961', '2900 W 43rd St', 'Minneapolis',  55410, false);

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
	(7, 2, true, true, true, true, false);

-- this shouldn't change
INSERT INTO routes
	("name")
VALUES
	('tangletown'),
	('emerson'),
	('far'),
	('misfits'),
	('unassigned');

-- this shouldn't change
INSERT INTO services
	("name", "price")
VALUES
	('Group Dog Walking:Friends & Family', '20'),
	('Group Dog Walking:Walk 1 dog - Ad hoc', '35'),
	('Group Dog Walking:Walk 1 dog 2-4x / week', '30'),
	('Group Dog Walking:Walk 1 dog 5 days / week', '26'),
	('Group Dog Walking:Walk 2 dogs - Ad hoc', '45'),
	('Group Dog Walking:Walk 2 Dogs 2-4x / week', '42'),
	('Group Dog Walking:Walk 2 dogs 5 days / week', '37'),
	('Group Dog Walking:Walk 3 dogs', '54');


-- dummy data for 20 clients
insert into clients 
	(first_name, last_name, street, city, zip, route_id, phone, email) 
values 
	('Adam', 'Olson', '2900 W 43rd St', 'Minneapolis',  55410, 4, '(893)236-3575', 'aolson@nature.com'),
	('Jamie', 'Stevens', '4147 Xerxes Ave S', 'Minneapolis', 55410, 1, '(506)409-5891', 'jstevens2@chicagotribune.com'),
	('Robert', 'Smith', '3300 W 44th St', 'Minneapolis', 55410, 4, '(636)411-6655', 'rsmith42@wordpress.org'),
	('Jessica', 'Higgins', '4444 Upton Ave S', 'Minneapolis', 55410, 2, '(422)682-9050', 'jhiggins12@mysql.com'),
	('Melissa', 'Schaefer', '3414 W 47th St Room E021', 'Minneapolis', 55410, 3, '(431)890-0167', 'mschaeff@hhs.gov'),
	('Ross', 'McClain', '3608 W 50th St', 'Minneapolis', 55410, 2, '(385)750-1935', 'rmcclain1@aboutads.info'),
	('Nick', 'Wilkerson', '4912 Vincent Ave S', 'Minneapolis', 55410, 3, '(438)750-4252', 'nwilks6@exblog.jp'),
	('Bob', 'Stein', '5000 Penn Ave S', 'Minneapolis', 55419, 2, '(956)761-8143', 'bst31n@ibm.com'),
	('George', 'Nelson', '5025 Knox Ave S', 'Minneapolis', 55419, 2, '(764)768-8688', 'george.nelson@sbwire.com'),
	('Thomas', 'Romero', '812 W 46th St', 'Minneapolis', 55419, 2, '(403)522-9955', 'thomrom56@guardian.co.uk'),
	('Heather', 'Park', '4530 Lyndale Ave S', 'Minneapolis', 55419, 1, '(123)912-1803', 'hparks@github.io'),
	('Stephanie', 'Carter', '4249 Bryant Ave S', 'Minneapolis', 55409, 3, '(589)917-5192', 'othermscarter@stumbleupon.com'),
	('Amanda', 'Love', '4100 Lyndale Ave S', 'Minneapolis', 55409, 4, '(838)150-5160', 'loveamanda@illinois.edu'),
	('Amy', 'Rowland', '4312 Upton Ave S', 'Minneapolis', 55410, 4, '(976)109-9306', 'arowland5@uiuc.edu'),
	('Patricia', 'Reid', '2720 W 43rd St', 'Minneapolis', 55419, 4, '(976)109-9306', 'patriciaR3@guardian.co.uk'),
	('Mary', 'Griffith', '813 W 50th St', 'Minneapolis', 55419, 4, '(976)109-9306', 'mgriffs12@hhs.gov'),
	('Karen', 'Wiggins', '4291 Queen Ave S', 'Minneapolis', 55419, 4, '(976)109-9306', 'karenwiggins@exblog.jp'),
	('David', 'Garner', '4135 W Lake Harriert Pkwy', 'Minneapolis', 55419, 3, '(976)109-9306', 'garnerd612@uiuc.edu'),
	('Thomas', 'Marquez', '4237 Colfax Ave S', 'Minneapolis', 55419, 3, '(976)109-9306', 'tmarq.ez@stumbleupon.com'),
	('Rob', 'Cannon', '812 W 46th St', 'Minneapolis', 55419, 3, '(976)109-9306', 'cannonpress@sbwire.com'),
	('Don', 'Jacobson', '1601 W 50th St', 'Minneapolis', 55419, 1, '(849)163-0399', 'dj1601@msu.edu');


-- c_crop,h_300,w_300/
insert into dogs 
	(client_id, name, vet_name, vet_phone, image) 
values
	(1, 'Alvin', 'Micheal Matschoss', '(488)4063596', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/c_crop,h_300,w_300/v1668904483/Dog%20Photos/Pug-Dog.jpg_udzexy.webp'),
	(1, 'Balto', 'Micheal Matschoss', '(488)4063596', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/463527_copy_wi2o1i.png'),
	(2, 'Finn', 'Ebonee Ramsier', '(588)7890127'),
	(3, 'Ike', 'Sheffield Crothers', '(430) 5630934'),
	(3, 'Sheffield', 'Sheffield Crothers', '(430) 5630934'),
	(4, 'Maple', 'Lia Lanphier', '(332)9874217'),
	(5, 'Otis', 'Aylmar Fleisch', '(161)9087110'),
	(5, 'Baxter', 'Aylmar Fleisch', '(161)9087110'),
	(6, 'Yogi', 'Vinnie Behne', '(128)3824261'),
	(7, 'Ruben', 'Dede Desson', '(965)7732496'),
	(8, 'Cord', 'Corney Agutter', '(560)7340244'),
	(9, 'Rufus', 'Cord Slaight', '(448)8303613'),
	(9, 'Max', 'Cord Slaight', '(448)8303613'),
	(9, 'Duffy', 'Cord Slaight', '(448)8303613'),
	(10, 'Lynda', 'Lynda Quoit', '(593)4846767'),
	(10, 'Lynda', 'Lynda Quoit', '(593)4846767'),
	(11, 'Fredia', 'Ryann Bertwistle', '(485)6205496'),
	(11, 'Ryann', 'Ryann Bertwistle', '(485)6205496'),
	(12, 'Noah', 'Gunner Hankins', '(857)3817172'),
	(13, 'Gunner', 'Gunner Hankins', '(857)3817172'),
	(14, 'Ludovika', 'Ludovika Saladin', '(197)4161988'),
	(14, 'Willow', 'Audra Schrieves', '(368)2739382'),
	(15, 'Audra', 'Derwin Pritchard', '(504)9197307'),
	(15, 'Luna', 'Derwin Pritchard', '(504)9197307'),
	(16, 'Milo', 'James Moon', '(504)9197307'),
	(16, 'Lola', 'James Moon', '(504)9197307'),
	(17, 'Teddy', 'Rose Cuevas', '(504)9197307'),
	(18, 'Duke', 'Derek Pritchard', '(504)9197307'),
	(18, 'Daisy', 'Derek Pritchard', '(504)9197307'),
	(18, 'Cooper', 'Derek Pritchard', '(504)9197307'),
	(18, 'Bailey', 'Derek Pritchard', '(504)9197307'),
	(19, 'Bella', 'Robert Cannon', '(504)9197307'),
	(19, 'Charlie', 'Robert Cannon', '(504)9197307'),
	(20, 'Zoe', 'Derwin Pritchard', '(504)9197307'),
	(20, 'Louie', 'Derwin Pritchard', '(504)9197307'),
	(20, 'Nova', 'Derwin Pritchard', '(504)9197307'),





	
    --** Clients Schedule MOCK DATA **--
insert into clients_schedule
	("client_id", "1", "2", "3", "4", "5") 
values
	(1, true, true, false, true, true),
	(2, false, true, false, false, false),
	(3, false, true, false, false, false),
	(4, true, true, true, false, true),
	(5, false, ftrue, false, true, true),
	(6, false, true, true, true, false),
	(7, true, true, true, true, false),
	(8, true, true, false, false, true),
	(9, false, true, false, false, false),
	(10, false, true, false, true, true),
	(11, true, true, false, true, true),
	(12, false, true, false, true, true),
	(13, true, true, true, true, true),
	(14, false, true, true, false, true),
	(15, true, true, false, false, false),
	(16, true, true, false, true, false),
	(17, true, true, false, false, false),
	(18, true, true, false, true, false),
	(19, true, true, false, false, false),
	(20, true, true, false, false, false);
	
insert into daily_dogs
	("date","name", "dog_id","checked_in","no_show","cancelled","route_id","client_id")
values
	('2022-10-31','Michael','3','true','false','false','1','1'),
	('2022-10-31','Darya','5','true','false','false','1','1'),
	('2022-11-02','Michael','3','true','false','false','1','1'),
	('2022-11-02','Darya','5','true','false','false','1','1'),
	('2022-11-04','Michael','3','true','false','false','1','1'),
	('2022-11-04','Darya','5','true','false','false','1','1'),
	('2022-11-07','Michael','3','true','false','false','1','1'),
	('2022-11-07','Darya','5','true','false','false','1','1'),
	('2022-11-09','Michael','3','true','false','false','1','1'),
	('2022-11-11','Michael','3','false','true','false','1','1'),
	('2022-11-11','Darya','5','false','true','false','1','1'),
	('2022-10-31','Gunner','6','true','false','false','1','13'),
	('2022-11-01','Gunner','6','true','false','false','1','13'),
	('2022-11-02','Gunner','6','true','false','false','1','13'),
	('2022-11-03','Gunner','6','false','true','false','1','13'),
	('2022-11-04','Gunner','6','true','false','false','1','13'),
	('2022-11-07','Gunner','6','true','false','false','1','13'),
	('2022-11-08','Gunner','6','true','false','false','1','13'),
	('2022-11-09','Gunner','6','true','false','false','1','13');
