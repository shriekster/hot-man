--
-- File generated with SQLiteStudio v3.2.1 on Mon Dec 14 16:07:08 2020
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: ActualizariTarife
CREATE TABLE ActualizariTarife (
    ID      INTEGER,
    Data    TEXT,
    Detalii TEXT,
    PRIMARY KEY (
        ID
    )
);


-- Table: CategoriiConfort
CREATE TABLE CategoriiConfort (
    ID       INTEGER,
    Denumire TEXT,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO CategoriiConfort (
                                 ID,
                                 Denumire
                             )
                             VALUES (
                                 1,
                                 '1'
                             );

INSERT INTO CategoriiConfort (
                                 ID,
                                 Denumire
                             )
                             VALUES (
                                 2,
                                 '2'
                             );

INSERT INTO CategoriiConfort (
                                 ID,
                                 Denumire
                             )
                             VALUES (
                                 3,
                                 '3'
                             );


-- Table: CategoriiPaturi
CREATE TABLE CategoriiPaturi (
    ID          INTEGER,
    Denumire    TEXT,
    NumarLocuri INTEGER,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO CategoriiPaturi (
                                ID,
                                Denumire,
                                NumarLocuri
                            )
                            VALUES (
                                1,
                                'simplu',
                                1
                            );

INSERT INTO CategoriiPaturi (
                                ID,
                                Denumire,
                                NumarLocuri
                            )
                            VALUES (
                                2,
                                'dublu',
                                2
                            );


-- Table: CategoriiSpatii
CREATE TABLE CategoriiSpatii (
    ID       INTEGER,
    Denumire TEXT,
    Detalii  TEXT,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO CategoriiSpatii (
                                ID,
                                Denumire,
                                Detalii
                            )
                            VALUES (
                                1,
                                'camera',
                                NULL
                            );

INSERT INTO CategoriiSpatii (
                                ID,
                                Denumire,
                                Detalii
                            )
                            VALUES (
                                2,
                                'garsoniera',
                                NULL
                            );

INSERT INTO CategoriiSpatii (
                                ID,
                                Denumire,
                                Detalii
                            )
                            VALUES (
                                3,
                                'apartament',
                                NULL
                            );

INSERT INTO CategoriiSpatii (
                                ID,
                                Denumire,
                                Detalii
                            )
                            VALUES (
                                4,
                                'temporar',
                                NULL
                            );


-- Table: Cazari
CREATE TABLE Cazari (
    ID           INTEGER,
    HotelID      INTEGER,
    UtilizatorID INTEGER,
    PRIMARY KEY (
        ID
    ),
    FOREIGN KEY (
        UtilizatorID
    )
    REFERENCES Utilizatori (ID) ON UPDATE CASCADE
                                ON DELETE NO ACTION,
    FOREIGN KEY (
        HotelID
    )
    REFERENCES Hoteluri (ID) ON UPDATE CASCADE
                             ON DELETE NO ACTION
);


-- Table: CoeficientiTarife
CREATE TABLE CoeficientiTarife (
    ID      INTEGER,
    Procent REAL,
    Alias   TEXT,
    Detalii TEXT,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO CoeficientiTarife (
                                  ID,
                                  Procent,
                                  Alias,
                                  Detalii
                              )
                              VALUES (
                                  1,
                                  0.0,
                                  'Misiune',
                                  NULL
                              );

INSERT INTO CoeficientiTarife (
                                  ID,
                                  Procent,
                                  Alias,
                                  Detalii
                              )
                              VALUES (
                                  2,
                                  10.0,
                                  'Detasat',
                                  NULL
                              );

INSERT INTO CoeficientiTarife (
                                  ID,
                                  Procent,
                                  Alias,
                                  Detalii
                              )
                              VALUES (
                                  3,
                                  20.0,
                                  'Mutat',
                                  NULL
                              );

INSERT INTO CoeficientiTarife (
                                  ID,
                                  Procent,
                                  Alias,
                                  Detalii
                              )
                              VALUES (
                                  4,
                                  50.0,
                                  'Statiune',
                                  NULL
                              );

INSERT INTO CoeficientiTarife (
                                  ID,
                                  Procent,
                                  Alias,
                                  Detalii
                              )
                              VALUES (
                                  5,
                                  100.0,
                                  'Integral',
                                  NULL
                              );


-- Table: DocumenteCazari
CREATE TABLE DocumenteCazari (
    ID                    INTEGER,
    CazareID              INTEGER,
    TuristID              INTEGER,
    Serie                 TEXT,
    Numar                 TEXT,
    Emitent               TEXT,
    DataEmiterii          TEXT,
    PerioadaValabilitate  TEXT,
    DataFinalValabilitate TEXT,
    Detalii               TEXT,
    FOREIGN KEY (
        CazareID
    )
    REFERENCES Cazari (ID) ON UPDATE CASCADE
                           ON DELETE NO ACTION,
    PRIMARY KEY (
        ID
    ),
    FOREIGN KEY (
        TuristID
    )
    REFERENCES Turisti (ID) ON UPDATE CASCADE
                            ON DELETE NO ACTION
);


-- Table: DocumenteSolicitari
CREATE TABLE DocumenteSolicitari (
    ID                 INTEGER,
    SolicitareCazareID INTEGER,
    Serie              TEXT,
    Numar              TEXT,
    DataEmitere        TEXT,
    Emitent            TEXT,
    PRIMARY KEY (
        ID
    ),
    FOREIGN KEY (
        SolicitareCazareID
    )
    REFERENCES SolicitariCazare (ID) ON UPDATE CASCADE
                                     ON DELETE NO ACTION
);


-- Table: Hoteluri
CREATE TABLE Hoteluri (
    ID         INTEGER,
    Nume       TEXT,
    Judet      TEXT,
    Localitate TEXT,
    Strada     TEXT,
    Numar      TEXT,
    CodPostal  TEXT,
    Telefon    TEXT,
    Fax        TEXT,
    Email      TEXT,
    PRIMARY KEY (
        ID
    )
);


-- Table: ModuriTarife
CREATE TABLE ModuriTarife (
    ID       INTEGER,
    Denumire TEXT,
    Detalii  TEXT,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO ModuriTarife (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             1,
                             'per loc',
                             NULL
                         );

INSERT INTO ModuriTarife (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             2,
                             'per spatiu',
                             NULL
                         );


-- Table: PaturiSpatii
CREATE TABLE PaturiSpatii (
    ID                             INTEGER,
    SpatiuID                       INTEGER,
    CategoriePatID                 INTEGER,
    NumarPaturi                    INTEGER,
    NumarPaturiOcupate             INTEGER,
    NumarPaturiSuplimentare        INTEGER,
    NumarPaturiSuplimentareOcupate INTEGER,
    FOREIGN KEY (
        SpatiuID
    )
    REFERENCES Spatii (ID) ON UPDATE CASCADE
                           ON DELETE NO ACTION,
    FOREIGN KEY (
        CategoriePatID
    )
    REFERENCES CategoriiPaturi (ID) ON UPDATE CASCADE
                                    ON DELETE NO ACTION,
    PRIMARY KEY (
        ID
    )
);


-- Table: Plati
CREATE TABLE Plati (
    ID            INTEGER,
    CazareID      INTEGER,
    TuristID      INTEGER,
    NumarZile     INTEGER,
    TarifPerZi    REAL,
    Suma          REAL,
    UtilizatorID  INTEGER,
    NumarChitanta TEXT,
    Data          TEXT,
    Detalii       TEXT,
    FOREIGN KEY (
        TuristID
    )
    REFERENCES Turisti (ID) ON UPDATE CASCADE
                            ON DELETE NO ACTION,
    FOREIGN KEY (
        CazareID
    )
    REFERENCES Cazari (ID) ON UPDATE CASCADE
                           ON DELETE NO ACTION,
    PRIMARY KEY (
        ID
    ),
    FOREIGN KEY (
        UtilizatorID
    )
    REFERENCES Utilizatori (ID) ON UPDATE CASCADE
                                ON DELETE NO ACTION
);


-- Table: Roluri
CREATE TABLE Roluri (
    ID        INTEGER,
    Denumire  TEXT,
    Descriere TEXT,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO Roluri (
                       ID,
                       Denumire,
                       Descriere
                   )
                   VALUES (
                       0,
                       'admin',
                       'Admin'
                   );

INSERT INTO Roluri (
                       ID,
                       Denumire,
                       Descriere
                   )
                   VALUES (
                       1,
                       'operator',
                       'Operator'
                   );

INSERT INTO Roluri (
                       ID,
                       Denumire,
                       Descriere
                   )
                   VALUES (
                       2,
                       'manager',
                       'Manager'
                   );


-- Table: ScopuriSosire
CREATE TABLE ScopuriSosire (
    ID       INTEGER,
    Denumire TEXT,
    Detalii  TEXT,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO ScopuriSosire (
                              ID,
                              Denumire,
                              Detalii
                          )
                          VALUES (
                              1,
                              'Interes personal',
                              NULL
                          );

INSERT INTO ScopuriSosire (
                              ID,
                              Denumire,
                              Detalii
                          )
                          VALUES (
                              2,
                              'Misiune',
                              NULL
                          );

INSERT INTO ScopuriSosire (
                              ID,
                              Denumire,
                              Detalii
                          )
                          VALUES (
                              3,
                              'Din afara MApN',
                              NULL
                          );

INSERT INTO ScopuriSosire (
                              ID,
                              Denumire,
                              Detalii
                          )
                          VALUES (
                              4,
                              'Extern',
                              '(straini)'
                          );


-- Table: SolicitariCazare
CREATE TABLE SolicitariCazare (
    ID           INTEGER,
    HotelID      INTEGER,
    UtilizatorID INTEGER,
    DataInceput  TEXT,
    DataSfarsit  TEXT,
    FOREIGN KEY (
        HotelID
    )
    REFERENCES Hoteluri (ID) ON UPDATE CASCADE
                             ON DELETE NO ACTION,
    FOREIGN KEY (
        UtilizatorID
    )
    REFERENCES Utilizatori (ID) ON UPDATE CASCADE
                                ON DELETE NO ACTION,
    PRIMARY KEY (
        ID
    )
);


-- Table: Spatii
CREATE TABLE Spatii (
    ID                INTEGER,
    Numar             INTEGER,
    CategorieSpatiuID INTEGER,
    Etaj              INTEGER,
    StatusSpatiuID    INTEGER,
    TarifID           INTEGER,
    FOREIGN KEY (
        StatusSpatiuID
    )
    REFERENCES StatusSpatii (ID) ON UPDATE CASCADE
                                 ON DELETE NO ACTION,
    PRIMARY KEY (
        ID
    ),
    FOREIGN KEY (
        CategorieSpatiuID
    )
    REFERENCES CategoriiSpatii (ID) ON UPDATE CASCADE
                                    ON DELETE NO ACTION,
    FOREIGN KEY (
        TarifID
    )
    REFERENCES Tarife (ID) ON UPDATE CASCADE
                           ON DELETE NO ACTION
);


-- Table: SpatiiCazari
CREATE TABLE SpatiiCazari (
    ID       INTEGER,
    CazareID INTEGER,
    SpatiuID INTEGER,
    FOREIGN KEY (
        CazareID
    )
    REFERENCES Cazari (ID) ON UPDATE CASCADE
                           ON DELETE NO ACTION,
    FOREIGN KEY (
        SpatiuID
    )
    REFERENCES Spatii (ID) ON UPDATE CASCADE
                           ON DELETE NO ACTION,
    PRIMARY KEY (
        ID
    )
);


-- Table: StatusSpatii
CREATE TABLE StatusSpatii (
    ID       INTEGER,
    Denumire TEXT,
    Detalii  TEXT,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO StatusSpatii (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             1,
                             'indisponibil',
                             NULL
                         );

INSERT INTO StatusSpatii (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             2,
                             'murdar',
                             NULL
                         );

INSERT INTO StatusSpatii (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             3,
                             'necesita atentie',
                             NULL
                         );

INSERT INTO StatusSpatii (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             4,
                             'in curatenie',
                             NULL
                         );

INSERT INTO StatusSpatii (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             5,
                             'liber',
                             NULL
                         );

INSERT INTO StatusSpatii (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             6,
                             'partial liber',
                             NULL
                         );

INSERT INTO StatusSpatii (
                             ID,
                             Denumire,
                             Detalii
                         )
                         VALUES (
                             7,
                             'ocupat',
                             NULL
                         );


-- Table: Tarife
CREATE TABLE Tarife (
    ID                 INTEGER,
    ActualizareID      INTEGER,
    CategorieSpatiuID  INTEGER,
    NumarLocuriSpatiu  INTEGER,
    CategorieConfortID INTEGER,
    Valoare            REAL,
    ModTarifID         INTEGER,
    _Tip               TEXT,
    PRIMARY KEY (
        ID
    ),
    FOREIGN KEY (
        ModTarifID
    )
    REFERENCES ModuriTarife (ID) ON UPDATE CASCADE
                                 ON DELETE NO ACTION,
    FOREIGN KEY (
        CategorieConfortID
    )
    REFERENCES CategoriiConfort (ID) ON UPDATE CASCADE
                                     ON DELETE NO ACTION,
    FOREIGN KEY (
        ActualizareID
    )
    REFERENCES ActualizariTarife (ID) ON UPDATE CASCADE
                                      ON DELETE NO ACTION,
    FOREIGN KEY (
        CategorieSpatiuID
    )
    REFERENCES CategoriiSpatii (ID) ON UPDATE CASCADE
                                    ON DELETE NO ACTION
);


-- Table: Turisti
CREATE TABLE Turisti (
    ID                 INTEGER,
    CNP                TEXT    UNIQUE,
    Nume               TEXT,
    Prenume            TEXT,
    Grad               TEXT,
    Institutie         TEXT,
    Localitate         TEXT,
    SerieActIdentitate TEXT,
    NumarActIdentitate TEXT,
    PRIMARY KEY (
        ID
    )
);


-- Table: TuristiCazari
CREATE TABLE TuristiCazari (
    SpatiuCazareID    INTEGER,
    TuristID          INTEGER,
    ScopSosireID      INTEGER,
    DataInceput       TEXT,
    DataSfarsit       TEXT,
    CoeficientTarifID INTEGER,
    Detalii           TEXT,
    FOREIGN KEY (
        CoeficientTarifID
    )
    REFERENCES CoeficientiTarife (ID) ON UPDATE CASCADE
                                      ON DELETE NO ACTION,
    FOREIGN KEY (
        ScopSosireID
    )
    REFERENCES ScopuriSosire (ID) ON UPDATE CASCADE
                                  ON DELETE NO ACTION,
    FOREIGN KEY (
        SpatiuCazareID
    )
    REFERENCES SpatiiCazari (ID) ON UPDATE CASCADE
                                 ON DELETE NO ACTION,
    FOREIGN KEY (
        TuristID
    )
    REFERENCES Turisti (ID) ON UPDATE CASCADE
                            ON DELETE NO ACTION
);


-- Table: TuristiSolicitari
CREATE TABLE TuristiSolicitari (
    ID                 INTEGER,
    SolicitareCazareID INTEGER,
    CNP                TEXT,
    Grad               TEXT,
    Nume               TEXT,
    Prenume            TEXT,
    FOREIGN KEY (
        SolicitareCazareID
    )
    REFERENCES SolicitariCazare (ID) ON UPDATE CASCADE
                                     ON DELETE NO ACTION,
    PRIMARY KEY (
        ID
    )
);


-- Table: Utilizatori
CREATE TABLE Utilizatori (
    ID         INTEGER,
    LocNastere        TEXT,
    Grad       TEXT,
    Nume       TEXT,
    Prenume    TEXT,
    Utilizator TEXT    UNIQUE,
    Parola     TEXT,
    Extra      TEXT,
    PRIMARY KEY (
        ID
    )
);

INSERT INTO Utilizatori (
                            ID,
                            LocNastere,
                            Grad,
                            Nume,
                            Prenume,
                            Utilizator,
                            Parola,
                            Extra
                        )
                        VALUES (
                            0,
                            '#',
                            '#',
                            '#',
                            '#',
                            'admin',
                            'IFckTyjzH/qwhFiAHJ6M0DvmSgkeCA5FqCMRysTwYyw=',
                            '*Ddq!c}?==?J'
                        );

INSERT INTO Utilizatori (
                            ID,
                            LocNastere,
                            Grad,
                            Nume,
                            Prenume,
                            Utilizator,
                            Parola,
                            Extra
                        )
                        VALUES (
                            1,
                            '1920923152504',
                            'Lt.',
                            'Moldoveanu',
                            'Dan',
                            'daniel',
                            'NdzAyNEbgYWdWOvKTbz7LFoCde9gBQ6oRAmdFZfqkRY=',
                            'sbY9tmKktt6XolYV'
                        );

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
