insert into hipica values(1, 2021), (2, 2022),(3,2023);
INSERT INTO classes (classId, classDay, classHour, classLevel)
VALUES
  (1, 'Lunes', '10', 'Bajo'),
  (2, 'Martes', '10', 'Medio'),
  (3, 'Miércoles', '10', 'Alto'),
  (4, 'Jueves', '10', 'Bajo'),
  (5, 'Viernes', '10', 'Medio'),
  (6, 'Sábado', '10', 'Alto'),
  (7, 'Lunes', '12', 'Alto'),
  (8, 'Martes', '12', 'Bajo'),
  (9, 'Miércoles', '12', 'Medio'),
  (10, 'Jueves', '12', 'Alto'),
  (11, 'Viernes', '12', 'Bajo'),
  (12, 'Sábado', '12', 'Bajo'),
  (13, 'Lunes', '16', 'Medio'),
  (14, 'Martes', '16', 'Alto'),
  (15, 'Miércoles', '16', 'Bajo'),
  (16, 'Jueves', '16', 'Medio'),
  (17, 'Viernes', '16', 'Alto'),
  (18, 'Sábado', '16', ''),
  (19, 'Lunes', '18', 'Bajo'),
  (20, 'Martes', '18', 'Medio'),
  (21, 'Miércoles', '18', 'Alto'),
  (22, 'Jueves', '18', 'Bajo'),
  (23, 'Viernes', '18', 'Medio'),
  (24, 'Viernes', '18', '');

INSERT INTO horses (horseId, horseName, barnNum, foodType, horseType, observation, cameraUrl, registrationDate, ownerId)
VALUES 
(1, 'Spirit', 3, 'Hierba', 'Clase', 'Bocado fuerte', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-01-31', null),
(2, 'Chocolate', 5, 'Forraje', 'Clase', 'Se escapa facilmente', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-01-31', null),
(3, 'Pumba', 2, 'Heno', 'Clase', '', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-01-31', null),
(4, 'Unay', 1, 'Paja', 'Clase', 'No le gusta la fusta', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-01-31', null),
(5, 'Hugo', 4, 'Hierba', 'Clase', '', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-06-29', null),
(6, 'Shirkan', 6, 'Forraje', 'Clase', 'Miedo a las botellas', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-06-29', null),
(7, 'Chanel',4, 'Heno', 'Clase', '', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-06-29', null),
(8, 'Birra', 2, 'Paja', 'Clase', 'Se levanta', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-06-29', null),
(9, 'Pana', 3, 'Hierba', 'Clase', 'Cuesta cogerla', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-08-09', null),
(10, 'Luna', 3, 'Forraje', 'Clase', 'Se levanta', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-08-09', null),
(11, 'Lucifer', 4, 'Heno', 'Clase', '', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-08-09', null),
(12, 'Vaya', 1, 'Paja', 'Clase', 'Bocado fuerte', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-08-09', null),
(13, 'Tayson', 5, 'Forraje', 'Clase', '', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-10-16', null),
(14, 'Bosy', 2, 'Heno', 'Clase', '', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-10-16', null),
(15, 'Yemen', 1, 'Paja', 'Clase', '', 'https://www.skylinewebcams.com/es/webcam/espana/islas-baleares/mallorca/mallorca-alcudia.html', '2021-10-16', null);




insert into prices(typeService, price) values("Clase",50),("Establo",250),("Excursion Playa",40),("Excursion Montaña",30),("Fiesta Cumpleaños",15),("Menú",9.50);

INSERT INTO menuBar (menuId, menuName, menuDate, priceId) VALUES
(1, 'Hamburguesa con patatas', 'Lunes', 6),
(2, 'Pizza peperoni', 'Martes', 6),
(3, 'Ensalada césar', 'Miercoles', 6),
(4, 'Pasta a la boloñesa', 'Jueves', 6),
(5, "Pollo en salsa","Viernes",6),(6,"Arroz a la cubana","Sábado",6);

INSERT INTO reservationExc (reservationId, reservationName, emailAddress, numPeople, dateExcursion, excursionType) VALUES
(1, 'Andrea Castillo', 'andreacastillo@gmail.com', 4, '2022-03-15', 'Playa'),
(2, 'Tina Simón', 'tinasimon@hotmail.com', 3, '2022-07-20', 'Montaña'),
(3, 'Daniel Lopez', 'daniellopez@yahoo.com', 2, '2023-02-10', 'Playa'),
(4, 'Luisa Martinez', 'luisamartinez@gmail.com', 5, '2023-06-05', 'Montaña');
INSERT INTO suggestions (commentType, userName, emailUser, peticion,clubId) VALUES ("Contacto","Marta Mas", "martamas@gmail.es", "Hola, me gustaria tener más información acerca de la celebración de la fiesta de cumpleaños con vosotros", null),
("Contacto","Antonio", "antonioperez@hotmail.es", "Hola, tengo un caballo, quisiera poder ir y ver las intalaciones y sabes las calidades de la comida. Gracias", null),("Contacto","Martina Mariani", "martinamariani@gmail.com", "Tengo ganas de aprender a montar a caballo, me da un poco de miedo,¿como podría hacerlo?", null);