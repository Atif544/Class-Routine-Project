USE class_routine_db;

INSERT IGNORE INTO teachers (id, name, email, password, registeredAt) VALUES
(2, 'Dr.Nazrul Islam', 'nazrul@mbstu.ac.bd', 'teacher123', NOW()),
(3, 'Nargis Ma\'am', 'nargis@mbstu.ac.bd', 'teacher123', NOW()),
(4, 'Badrul Sir', 'badrul@mbstu.ac.bd', 'teacher123', NOW()),
(5, 'Zia Sir', 'zia@mbstu.ac.bd', 'teacher123', NOW());
(6, 'Dr.)

SELECT id, name, email, password, registeredAt FROM teachers WHERE id IN (2, 3, 4, 5);
