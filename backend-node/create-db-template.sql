CREATE DATABASE IF NOT EXISTS ibs;

USE ibs;

CREATE TABLE person
(
    id    INT PRIMARY KEY AUTO_INCREMENT,
    name  VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE profession
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    name      VARCHAR(100) NOT NULL,
    person_id INT          NOT NULL UNIQUE,
    CONSTRAINT fk_person_profession FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE
);

CREATE TABLE pet
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    pet_name  VARCHAR(104) NOT NULL,
    person_id INT          NOT NULL,
    CONSTRAINT fk_pet_person FOREIGN KEY (person_id) REFERENCES person (id) ON DELETE CASCADE
);

DELIMITER //
CREATE TRIGGER after_person_insert
    AFTER INSERT
    ON person
    FOR EACH ROW
BEGIN
    INSERT INTO pet (pet_name, person_id)
    VALUES (CONCAT(NEW.name, ' dog'), NEW.id);
END //
DELIMITER ;
