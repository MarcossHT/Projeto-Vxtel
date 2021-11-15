create TABLE tarifas (
    id INT UNSIGNED not null AUTO_INCREMENT,
    origem INT not null,
    destino INT not null,
    tarifa DECIMAL(3,2) not null,
    PRIMARY KEY (id)
);

insert into tarifas (origem, destino, tarifa)
VALUES 
    (11, 16, 1.90),
    (16, 11, 2.90),
    (11, 17, 1.70),
    (17, 11, 2.70),
    (11, 18, 0.90),
    (18, 11, 1.90);


SELECT * from tarifas