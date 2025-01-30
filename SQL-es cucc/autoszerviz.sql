CREATE DATABASE autoszerviz;
USE autoszerviz;

CREATE TABLE tulajdonos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    telefonszam VARCHAR(20) NOT NULL
);


CREATE TABLE szerelo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    telefonszam VARCHAR(20) NOT NULL,
    munka TEXT NOT NULL
);


CREATE TABLE auto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marka VARCHAR(50) NOT NULL,
    tulajdonos_id INT,
    szerelo_id INT,
    FOREIGN KEY (tulajdonos_id) REFERENCES tulajdonos(id) ON DELETE SET NULL,
    FOREIGN KEY (szerelo_id) REFERENCES szerelo(id) ON DELETE SET NULL
);

INSERT INTO tulajdonos (nev, telefonszam) VALUES
('Kovács Péter', '06201234567'),
('Nagy Anna', '06301234567'),
('Tóth Sándor', '06701234567'),
('Szabó Erika', '06209876543'),
('Varga Béla', '06307654321');


INSERT INTO szerelo (nev, telefonszam, munka) VALUES
('Molnár János', '06201112222', 'Olajcsere'),
('Farkas László', '06302223333', 'Fékjavítás'),
('Kiss Zoltán', '06703334444', 'Motorjavítás'),
('Németh Gábor', '06204445555', 'Gumi csere'),
('Horváth Tamás', '06305556666', 'Futómű beállítás');


INSERT INTO auto (marka, tulajdonos_id, szerelo_id) VALUES
('Opel Astra', 1, 1),
('Volkswagen Golf', 2, 2),
('Ford Focus', 3, 3),
('Toyota Corolla', 4, 4),
('BMW 320i', 5, 5);