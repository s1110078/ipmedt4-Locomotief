- sudo mysql -u root -p
- CREATE USER 'locomotief'@'%' IDENTIFIED BY 'Ipmedt4!'; (I = i)
- GRANT ALL PRIVILEGES ON *.* TO 'locomotief'@'%';
- FLUSH PRIVILEGES;
- CREATE DATABASE locomotief;

Als .env file er niet bij staat:
- Copy .env.example
- Rename .env
- Replace:
DB_DATABASE=locomotief
DB_USERNAME=locomotief
DB_PASSWORD=Ipmedt4!