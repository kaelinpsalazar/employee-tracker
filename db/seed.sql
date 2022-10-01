use employeemanager_db

INSERT INTO department (name)
VALUES 
('sales'),
('engineering'),
('finance'),
('legal');

INSERT INTO role (title, salary, department_id)
VALUES
('sales lead', 100000, 1),
('sales person', 80000, 1),
('senior engineer', 150000, 2),
('software engineer', 120000, 2),
('accountant', 125000, 3),
('controller', 160000, 3),
('legal team lead', 200000, 4),
('lawyer', 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);
