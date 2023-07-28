CREATE USER minutiae@'%' identified by 'raspberry';
GRANT ALL privileges on *.* to minutiae@'%';
DROP USER 'root'@'localhost';
CREATE USER 'root'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';
FLUSH privileges;
CREATE DATABASE mariadb;
COMMIT;
quit
