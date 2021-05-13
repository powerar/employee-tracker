INSERT INTO department (name)
    VALUES
        ('sales'),
        ('support'),
        ('IT');

INSERT INTO role (title, salary, department_id)
    VALUES
        ('Sales Associate', 50000, 1),
        ('Support Analyst', 70000, 2),
        ('Helpdesk Analyst', 60000, 3),
        ('Support Analyst Jr', 30000, 2),
        ('Helpdesk Analyst Jr', 30000, 3),
        ('Support Manager', 90000, 2),
        ('Sales Manager', 90000, 1),
        ('IT Manager', 90000, 3),
        ('CEO', 200000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ('Andrew', 'Power', 2, 2),
        ('Conan', "O'Brien", 6, 4),
        ('Will', 'Ferrel', 4, 2),
        ('Nick', 'Offerman', 9, 4),
        ('Megan', 'Mullaly', 7, 4);