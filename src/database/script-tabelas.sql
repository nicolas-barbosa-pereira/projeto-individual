create database corinthians;

use corinthians;

create table usuario(
idusuario int primary key auto_increment,
nome varchar(100) not null,
email varchar(100) not null,
senha varchar(100) not null
);

create table quiz(
idquiz int primary key auto_increment,
tema varchar(100)
);

create table pontuacao(
idpontuacao int primary key auto_increment,
fkquiz int not null,
fkusuario int not null,
pontos int,
constraint fk_quiz foreign key(fkquiz) references quiz(idquiz),
constraint fk_usuario foreign key(fkusuario) references usuario(idusuario)
);


CREATE USER 'cori'@'%' IDENTIFIED BY 'Sptech#2025';
CREATE USER 'cori_insert'@'%' IDENTIFIED BY 'SPtech#2025';


GRANT INSERT ON corinthians.* TO 'cori_insert'@'%';
GRANT ALL privileges ON corinthians.* TO 'cori'@'%';


select * from usuario;