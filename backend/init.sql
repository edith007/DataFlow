ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'edith';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;