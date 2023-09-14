DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS sondage;

CREATE TABLE user (
  Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL
);

CREATE TABLE sondage (
  Id INT PRIMARY KEY AUTO_INCREMENT,
  Title varchar(255) NOT NULL,
  Content TEXT NOT NULL,
  UserId INT NOT NULL,
    CONSTRAINT fk_sondage_user
    FOREIGN KEY (UserId)
    REFERENCES user(Id)
);

CREATE TABLE interaction (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Note FLOAT,
    UserId INT NOT NULL,
    SondageId INT NOT NULL,
    CONSTRAINT fk_interaction_user
    FOREIGN KEY (UserId)
    REFERENCES user(Id),
    CONSTRAINT fk_interaction_sondage
    FOREIGN KEY (SondageId)
    REFERENCES sondage(Id),
    CONSTRAINT uc_interaction_sondage_user UNIQUE (SondageId, UserId)
);