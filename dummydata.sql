--** Employees MOCK DATA **--
insert into employees 
	(first_name, last_name, email, phone, street, city, "zip", admin) 
values 
	('Den', 'Paolini', 'dpaolini0@paypal.com', '(840)673-2127', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Grantley', 'Abels', 'gabels1@weather.com', '(885)747-7091', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Say', 'O''Hickey', 'sohickey2@google.ru', '(915)638-0768', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Reeba', 'Pretswell', 'rpretswell3@feedburner.com', '(964)688-1625', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Fiorenze', 'Mary', 'fmary4@unesco.org', '(697)209-6190', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Osborne', 'Barrand', 'obarrand5@wufoo.com', '(537)159-4107', '2900 W 43rd St', 'Minneapolis',  55410, false),
	('Lidia', 'Nichols', 'lnichols6@virginia.edu', '(802)528-0961', '2900 W 43rd St', 'Minneapolis',  55410, false);

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
	('Tangletown'),
	('Emerson'),
	('Far'),
	('Misfits'),
	('Unassigned');

-- this shouldn't change
INSERT INTO services
	("name", "price")
VALUES
	('Group Dog Walking:Friends & Family', '20'),
	('Group Dog Walking:1 dog - Ad hoc', '35'),
	('Group Dog Walking:1 dog 2-4x / week', '30'),
	('Group Dog Walking:1 dog 5x / week', '26'),
	('Group Dog Walking:2 dogs - Ad hoc', '45'),
	('Group Dog Walking:2 Dogs 2-4x / week', '42'),
	('Group Dog Walking:2 dogs 5x / week', '37'),
	('Group Dog Walking:3 dogs', '54');


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
	(1, 'Alvin', 'Micheal Matschoss', '(488)406-3596', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904895/Dog%20Photos/Pictures-Dogs-Making-Funny-Faces.jpg_copy_mckfqu.png'),
	(1, 'Balto', 'Micheal Matschoss', '(488)406-3596', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/463527_copy_wi2o1i.png'),
	(2, 'Finn', 'Ebonee Ramsier', '(588)789-0127', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904893/Dog%20Photos/photo-1518020382113-a7e8fc38eac9_iciudy.jpg'),
	(3, 'Ike', 'Sheffield Crothers', '(430)563-0934', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/images_mocxln.jpg'),
	(3, 'Chef', 'Sheffield Crothers', '(430)563-0934', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/Pug-Dog.jpg_copy_zx4qbw.png'),
	(4, 'Maple', 'Lia Lanphier', '(332)987-4217', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/4b424cd8c2981b8cc9f5cffbc0d07792_jsyear.jpg'),
	(5, 'Otis', 'Aylmar Fleisch', '(161)908-7110', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/funny-pet-stories_rxl13n.jpg'),
	(5, 'Baxter', 'Aylmar Fleisch', '(161)908-7110', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/5da9debc045a31381e7c8d94_copy_muiawp.png'),
	(6, 'Yogi', 'Vinnie Behne', '(128)382-4261', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/istockphoto-1212177973-612x612_jaztmp.jpg'),
	(7, 'Ruben', 'Dede Desson', '(965)773-2496', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910987/Dog%20Photos/New/New%20New/cavalier-king-charles-spaniel-card-medium_j7mpec.jpg'),
	(8, 'Cord', 'Corney Agutter', '(560)734-0244', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/GettyImages-709182477_lpst4n.jpg'),
	(9, 'Rufus', 'Cord Slaight', '(448)830-3613', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910987/Dog%20Photos/New/New%20New/cool-dog-breeds-blue-heeler-762x1024_gkjrpu.jpg'),
	(9, 'Max', 'Cord Slaight', '(448)830-3613', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/AdobeStock_274099078.jpg_copy_vhrmcz.png'),
	(9, 'Duffy', 'Cord Slaight', '(448)830-3613', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/american-eskimo-dog-royalty-free-image-184272401-1565190028_vpu6sk.jpg'),
	(10, 'Lynda', 'Liz Quoit', '(593)484-6767', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/istockphoto-680810342-612x612_tso1kr.jpg'),
	(10, 'Lori', 'Liz Quoit', '(593)484-6767', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904892/Dog%20Photos/istockphoto-618949520-612x612_uttcq8.jpg'),
	(11, 'Freddy', 'Ryann Bertwistle', '(485)620-5496', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/portrait-of-dog-on-snow-royalty-free-image-727142515-1556050424_ud9onj.jpg'),
	(11, 'Ryan', 'Rosie Bertwistle', '(485)620-5496', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/GettyImages-889552354-e1606774439626_y2shap.jpg'),
	(12, 'Noah', 'Gunner Hankins', '(857)381-7172', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/welsh-springer-spaniel_dhcjmk.jpg'),
	(13, 'Shaggy', 'Gunner Hankins', '(857)381-7172', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910986/Dog%20Photos/New/New%20New/Bergamasco-Sheepdog-standing-in-a-pasture_j0hh3h.jpg'),
	(14, 'Bert', 'Ludovika Saladin', '(197)416-1988', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668904891/Dog%20Photos/5da9dd1c045a3104cd06f2a2_copy_w5mkmi.png'),
	(14, 'Willow', 'Audra Schrieves', '(368)273-9382', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910987/Dog%20Photos/New/New%20New/dog-breeds-that-look-different-1593069055_khmxve.jpg'),
	(15, 'Audra', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910986/Dog%20Photos/New/New%20New/image-2_iy7rwa.jpg'),
	(15, 'Luna', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910986/Dog%20Photos/New/New%20New/1458326999-gettyimages-480245719_foepiq.jpg'),
	(16, 'Milo', 'James Moon', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/medium-sized-dogs-1613083812_te198m.jpg'),
	(16, 'Lola', 'James Moon', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/beautiful-australian-shepherd-walking-royalty-free-image-168814214-1565190235_ssrcki.jpg'),
	(17, 'Teddy', 'Rose Cuevas', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/medium-dog-breeds-sharpie-1613075637_ax8quv.jpg'),
	(18, 'Duke', 'Derek Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/purebred-dog-chow-chow-royalty-free-image-526855507-1560959187_ve1cy6.jpg'),
	(18, 'Daisy', 'Derek Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/Cute-medium-sized-dogs_uyxe1r.jpg'),
	(18, 'Cooper', 'Derek Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/breed_profile_corgi_1117986_recirc_917-dc0372b7151c442bab53666b4687a8fd-8d973deaf99a42878fa0d2ee5da84ced_lijohf.jpg'),
	(19, 'Bella', 'Robert Cannon', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910627/Dog%20Photos/New/dog-shetland-sheepdog-collie-sheltie-royalty-free-image-491206081-1565123992_ovh8t6.jpg'),
	(20, 'Zoe', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/medium-dog-breeds-border-collie-1613075882_azf5qj.jpg'),
	(20, 'Louie', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/pembroke-welsh-corgi-card-medium_dsgd2l.jpg'),
	(20, 'Nova', 'Derwin Pritchard', '(504)919-7307', 'https://res.cloudinary.com/ddmwrgnrd/image/upload/v1668910628/Dog%20Photos/New/medium-sized-dogs-bull-terrier-1613077403_srggj5.jpg');





	
    --** Clients Schedule MOCK DATA **--
insert into clients_schedule
	("client_id", "1", "2", "3", "4", "5") 
values
	(1, true, true, false, true, true),
	(2, false, true, false, false, false),
	(3, false, true, false, false, false),
	(4, true, true, true, false, true),
	(5, false, true, false, true, true),
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
	('2022-10-31','Finn','3','true','false','false','1','1'),
	('2022-10-31','Chef','5','true','false','false','1','3'),
	('2022-11-02','Finn','3','true','false','false','1','1'),
	('2022-11-02','Chef','5','true','false','false','1','3'),
	('2022-11-04','Finn','3','true','false','false','1','1'),
	('2022-11-04','Chef','5','true','false','false','1','3'),
	('2022-11-07','Finn','3','true','false','false','1','1'),
	('2022-11-07','Chef','5','true','false','false','1','3'),
	('2022-11-09','Finn','3','true','false','false','1','1'),
	('2022-11-11','Finn','3','false','true','false','1','1'),
	('2022-11-11','Chef','5','false','true','false','1','3'),
	('2022-10-31','Maple','6','true','false','false','1','4'),
	('2022-11-01','Maple','6','true','false','false','1','4'),
	('2022-11-02','Maple','6','true','false','false','1','4'),
	('2022-11-03','Maple','6','false','true','false','1','4'),
	('2022-11-04','Maple','6','true','false','false','1','4'),
	('2022-11-07','Maple','6','true','false','false','1','4'),
	('2022-11-08','Maple','6','true','false','false','1','4'),
	('2022-11-09','Maple','6','true','false','false','1','4');
