create TABLE planos (
    id INT UNSIGNED not null AUTO_INCREMENT,
    planos varchar(255) not null,
    minutos int not null,
    PRIMARY KEY (id)
);

INSERT into planos (planos, minutos)
VALUES
    ("Falemais30", 30),
    ("Falemais60", 60),
    ("Falemais120", 120);


select * from planos