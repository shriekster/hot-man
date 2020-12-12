BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Hoteluri" (
	"ID"	INTEGER,
	"Nume"	TEXT,
	"Judet"	TEXT,
	"Sector"	TEXT,
	"Strada"	TEXT,
	"Numar"	TEXT,
	"CodPostal"	TEXT,
	"Telefon"	TEXT,
	"Fax"	TEXT,
	"Email"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "CategoriiConfort" (
	"ID"	INTEGER,
	"Denumire"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "ModuriTarife" (
	"ID"	INTEGER,
	"Denumire"	TEXT,
	"Detalii"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "CategoriiSpatii" (
	"ID"	INTEGER,
	"Denumire"	TEXT,
	"Detalii"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "CategoriiPaturi" (
	"ID"	INTEGER,
	"Denumire"	TEXT,
	"NumarLocuri"	INTEGER,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "CoeficientiTarife" (
	"ID"	INTEGER,
	"Procent"	REAL,
	"Alias"	TEXT,
	"Detalii"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "StatusSpatii" (
	"ID"	INTEGER,
	"Denumire"	TEXT,
	"Detalii"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "ActualizariTarife" (
	"ID"	INTEGER,
	"Data"	TEXT,
	"Detalii"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "ScopuriSosire" (
	"ID"	INTEGER,
	"Denumire"	TEXT,
	"Detalii"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "Roluri" (
	"ID"	INTEGER,
	"Denumire"	TEXT,
	"Descriere"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "UtilizatoriRoluri" (
	"ID"	INTEGER,
	"UtilizatorID"	INTEGER,
	"RolID"	INTEGER,
	FOREIGN KEY("RolID") REFERENCES "Roluri"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("UtilizatorID") REFERENCES "Utilizatori"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "Tarife" (
	"ID"	INTEGER,
	"ActualizareID"	INTEGER,
	"CategorieSpatiuID"	INTEGER,
	"NumarLocuriSpatiu"	INTEGER,
	"CategorieConfortID"	INTEGER,
	"Valoare"	REAL,
	"ModTarifID"	INTEGER,
	"_Tip"	TEXT,
	FOREIGN KEY("ModTarifID") REFERENCES "ModuriTarife"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("ActualizareID") REFERENCES "ActualizariTarife"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("CategorieConfortID") REFERENCES "CategoriiConfort"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("CategorieSpatiuID") REFERENCES "CategoriiSpatii"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "Spatii" (
	"ID"	INTEGER,
	"Numar"	INTEGER,
	"CategorieSpatiuID"	INTEGER,
	"Etaj"	INTEGER,
	"StatusSpatiuID"	INTEGER,
	"TarifID"	INTEGER,
	PRIMARY KEY("ID"),
	FOREIGN KEY("CategorieSpatiuID") REFERENCES "CategoriiSpatii"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("TarifID") REFERENCES "Tarife"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("StatusSpatiuID") REFERENCES "StatusSpatii"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "Turisti" (
	"ID"	INTEGER,
	"CNP"	TEXT UNIQUE,
	"Nume"	TEXT,
	"Prenume"	TEXT,
	"Grad"	TEXT,
	"Institutie"	TEXT,
	"Localitate"	TEXT,
	"SerieActIdentitate"	TEXT,
	"NumarActIdentitate"	TEXT,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "SolicitariCazare" (
	"ID"	INTEGER,
	"HotelID"	INTEGER,
	"UtilizatorID"	INTEGER,
	"DataInceput"	TEXT,
	"DataSfarsit"	TEXT,
	PRIMARY KEY("ID"),
	FOREIGN KEY("UtilizatorID") REFERENCES "Utilizatori"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("HotelID") REFERENCES "Hoteluri"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "DocumenteSolicitari" (
	"ID"	INTEGER,
	"SolicitareCazareID"	INTEGER,
	"Serie"	TEXT,
	"Numar"	TEXT,
	"DataEmitere"	TEXT,
	"Emitent"	TEXT,
	PRIMARY KEY("ID"),
	FOREIGN KEY("SolicitareCazareID") REFERENCES "SolicitariCazare"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "TuristiSolicitari" (
	"ID"	INTEGER,
	"SolicitareCazareID"	INTEGER,
	"CNP"	TEXT,
	"Grad"	TEXT,
	"Nume"	TEXT,
	"Prenume"	TEXT,
	PRIMARY KEY("ID"),
	FOREIGN KEY("SolicitareCazareID") REFERENCES "SolicitariCazare"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "Cazari" (
	"ID"	INTEGER,
	"HotelID"	INTEGER,
	"UtilizatorID"	INTEGER,
	FOREIGN KEY("HotelID") REFERENCES "Hoteluri"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("UtilizatorID") REFERENCES "Utilizatori"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "SpatiiCazari" (
	"ID"	INTEGER,
	"CazareID"	INTEGER,
	"SpatiuID"	INTEGER,
	PRIMARY KEY("ID"),
	FOREIGN KEY("SpatiuID") REFERENCES "Spatii"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("CazareID") REFERENCES "Cazari"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "PaturiSpatii" (
	"ID"	INTEGER,
	"SpatiuID"	INTEGER,
	"CategoriePatID"	INTEGER,
	"NumarPaturi"	INTEGER,
	"NumarPaturiOcupate"	INTEGER,
	"NumarPaturiSuplimentare"	INTEGER,
	"NumarPaturiSuplimentareOcupate"	INTEGER,
	PRIMARY KEY("ID"),
	FOREIGN KEY("CategoriePatID") REFERENCES "CategoriiPaturi"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("SpatiuID") REFERENCES "Spatii"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "TuristiCazari" (
	"SpatiuCazareID"	INTEGER,
	"TuristID"	INTEGER,
	"ScopSosireID"	INTEGER,
	"DataInceput"	TEXT,
	"DataSfarsit"	TEXT,
	"CoeficientTarifID"	INTEGER,
	"Detalii"	TEXT,
	FOREIGN KEY("TuristID") REFERENCES "Turisti"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("ScopSosireID") REFERENCES "ScopuriSosire"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("SpatiuCazareID") REFERENCES "SpatiiCazari"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("CoeficientTarifID") REFERENCES "CoeficientiTarife"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "DocumenteCazari" (
	"ID"	INTEGER,
	"CazareID"	INTEGER,
	"TuristID"	INTEGER,
	"Serie"	TEXT,
	"Numar"	TEXT,
	"Emitent"	TEXT,
	"DataEmiterii"	TEXT,
	"PerioadaValabilitate"	TEXT,
	"DataFinalValabilitate"	TEXT,
	"Detalii"	TEXT,
	FOREIGN KEY("CazareID") REFERENCES "Cazari"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	PRIMARY KEY("ID"),
	FOREIGN KEY("TuristID") REFERENCES "Turisti"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "Plati" (
	"ID"	INTEGER,
	"CazareID"	INTEGER,
	"TuristID"	INTEGER,
	"NumarZile"	INTEGER,
	"TarifPerZi"	REAL,
	"Suma"	REAL,
	"UtilizatorID"	INTEGER,
	"NumarChitanta"	TEXT,
	"Data"	TEXT,
	"Detalii"	TEXT,
	FOREIGN KEY("CazareID") REFERENCES "Cazari"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	PRIMARY KEY("ID"),
	FOREIGN KEY("UtilizatorID") REFERENCES "Utilizatori"("ID") ON UPDATE CASCADE ON DELETE NO ACTION,
	FOREIGN KEY("TuristID") REFERENCES "Turisti"("ID") ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE TABLE IF NOT EXISTS "Utilizatori" (
	"ID"	INTEGER,
	"CNP"	TEXT UNIQUE,
	"Grad"	TEXT,
	"Nume"	TEXT,
	"Prenume"	TEXT,
	"Utilizator"	TEXT UNIQUE,
	"Parola"	TEXT,
	"Extra"	TEXT,
	"Session"	TEXT,
	PRIMARY KEY("ID")
);
INSERT INTO "CategoriiConfort" ("ID","Denumire") VALUES (1,'1'),
 (2,'2'),
 (3,'3');
INSERT INTO "ModuriTarife" ("ID","Denumire","Detalii") VALUES (1,'per loc',NULL),
 (2,'per spatiu',NULL);
INSERT INTO "CategoriiSpatii" ("ID","Denumire","Detalii") VALUES (1,'camera',NULL),
 (2,'garsoniera',NULL),
 (3,'apartament',NULL),
 (4,'virtual',NULL);
INSERT INTO "CategoriiPaturi" ("ID","Denumire","NumarLocuri") VALUES (1,'simplu',1),
 (2,'dublu',2);
INSERT INTO "CoeficientiTarife" ("ID","Procent","Alias","Detalii") VALUES (1,0.0,'Misiune',NULL),
 (2,10.0,'Detasat',NULL),
 (3,20.0,'Mutat',NULL),
 (4,50.0,'Statiune',NULL),
 (5,100.0,'Integral',NULL);
INSERT INTO "StatusSpatii" ("ID","Denumire","Detalii") VALUES (1,'indisponibil',NULL),
 (2,'murdar',NULL),
 (3,'necesita atentie',NULL),
 (4,'in curatenie',NULL),
 (5,'liber',NULL),
 (6,'partial liber',NULL),
 (7,'ocupat',NULL);
INSERT INTO "ScopuriSosire" ("ID","Denumire","Detalii") VALUES (1,'Interes personal',NULL),
 (2,'Misiune',NULL),
 (3,'Din afara MApN',NULL),
 (4,'Extern','(straini)');
INSERT INTO "Roluri" ("ID","Denumire","Descriere") VALUES (0,'admin','Admin'),
 (1,'operator','Operator'),
 (2,'manager','Manager');
INSERT INTO "UtilizatoriRoluri" ("ID","UtilizatorID","RolID") VALUES (0,0,0),
 (1,1,1);
INSERT INTO "Utilizatori" ("ID","CNP","Grad","Nume","Prenume","Utilizator","Parola","Extra","Session") VALUES (0,'#','#','#','#','admin','IFckTyjzH/qwhFiAHJ6M0DvmSgkeCA5FqCMRysTwYyw=','*Ddq!c}?==?J',NULL),
 (1,'1931017152493','Slt.','Moldoveanu','Dan','daniel','dj+NvdHICLGeOrtzSd/FoxOX4ImH2ca5+kjPMHR8nmc=','AVTJqrZ5Byadzy61',NULL);
COMMIT;
