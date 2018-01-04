/*
	Banco de dados para armazenamento dos dados do SIGA dos alunos cadastrados

	Criado em: 03-01-2017
*/

-- Criando banco
CREATE DATABASE alunos
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;

USE alunos;

CREATE TABLE cadastros(
	id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(30) NOT NULL,
    passwd VARCHAR(30) NOT NULL,
	PRIMARY KEY(id)
)DEFAULT CHARSET = utf8;