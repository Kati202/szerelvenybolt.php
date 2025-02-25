CREATE DATABASE IF NOT EXISTS szerelvenybolt;
USE szerelvenybolt;

CREATE TABLE termekek
(id INT AUTO_INCREMENT PRIMARY KEY,
nev VARCHAR(255) NOT NULL,
kep VARCHAR(255) NOT NULL,
ar INT NOT NULL
);

INSERT INTO termekek (nev,kep,ar) VALUES
('Csaptelep','img/csaptelep.jpg',5990),
('Mosogató','img/mosogato.jpg',12990),
('WC kagyló','img/wc.jpg',24990);