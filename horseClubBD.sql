drop database if exists horseClubDB;

Create database if not exists horseClubDB;
use horseClubDB;
create table hipica(
id int primary key auto_increment,
yearClub year
);

create table classes(
classId int primary key auto_increment,
classDay enum("Lunes","Martes","Miercoles","Jueves","Viernes","Sabado") not null,
classHour enum("10","12","16","18") not null,
classLevel enum("Bajo","Medio","Alto"),
clubId int,
foreign key (clubId) references hipica(id)
);

create table userProfile(
userId int primary key auto_increment,
userName varchar(255) not null,
userType enum("Alumno","Dueño","Admin", "Invitado", "Inactivo") not null,
registrationDate date not null,
emailAddress varchar(255) unique,
psswdUser varchar(255) not null,
clubId int,
foreign key (clubId) references hipica(id),
constraint ck_emailAddress check (emailAddress regexp '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
)
);

create table classUser(
id int primary key auto_increment,
userId int,
classId int,
clubId int,
foreign key (clubId) references hipica(id),
foreign key (userId) references userProfile(userId),
foreign key (classId) references classes(classId)
);
drop table horses;
create table horses(
horseId int primary key auto_increment,
horseName varchar(255) not null,
barnNum int,
foodType enum("Hierba", "Forraje","Heno", "Paja"),
horseType enum("Clase","Privado") not null,
observation varchar(255),
cameraUrl varchar(255),
registrationDate date not null,
ownerId int,
clubId int,
foreign key (clubId) references hipica(id),
foreign key (ownerId) references userProfile(userId)
);

create table prices(  
priceId int primary key auto_increment,
typeService varchar(255) not null,
price float not null,
clubId int,
foreign key (clubId) references hipica(id)
);

create table payments(
payId int primary key auto_increment,
userId int,
payDate date,
priceId int ,
payMethod enum("Tarjeta","Efectivo", "Pendiente"),
clubId int,
foreign key (clubId) references hipica(id),
foreign key (userId) references userProfile(userId),
foreign key (priceId) references prices(priceId)
);

create table menuBar(
menuId int primary key auto_increment,
menuName varchar(255) not null,
menuDate enum("Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"), 
priceId int,
clubId int,
foreign key (clubId) references hipica(id),
foreign key (priceId) references prices(priceId)
);


create table reservationExc(
reservationId int primary key auto_increment,
reservationName varchar(255) not null,
emailAddress varchar(255) not null,
numPeople int not null,
dateExcursion date,
excursionType enum("Playa", "Montaña") not null,
clubId int,
checked boolean not null default false,
foreign key (clubId) references hipica(id),
constraint ck_emailAddress1 check (emailAddress regexp '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
)
);

create table suggestions(
id int primary key auto_increment,
commentType enum("Contacto", "Cambio cuadra", "Cambio clase") not null,
userName varchar(255)not null,
emailUser varchar(255) not null,
peticion varchar(255) not null,
clubId int ,
checked boolean not null default false,
foreign key (clubId) references hipica(id)
);


