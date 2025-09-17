-- seed_initial_data.sql
INSERT INTO users (name,email,phone,password_hash,role,wallet,avatar)
VALUES
('Mrs Ada','ada@sw2.test','08010000001','<bcrypt-hash-placeholder>','teacher',0,'sw2_logo.png'),
('Tobi','tobi@sw2.test','08010000002','<bcrypt-hash-placeholder>','student',10000,'sw2_logo.png'),
('Mr Donor','donor@sw2.test','08010000003','<bcrypt-hash-placeholder>','sponsor',50000,'sw2_logo.png');

INSERT INTO plans (name,price,interval,duration_days) VALUES
('Daily',100,'daily',1),
('Weekly',500,'weekly',7),
('Monthly',1500,'monthly',30);