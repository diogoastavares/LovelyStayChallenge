CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Languages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  language VARCHAR(255)
);

ALTER TABLE Users
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN location SET NOT NULL;

ALTER TABLE Languages
DROP CONSTRAINT IF EXISTS user_id_fk,
ADD CONSTRAINT user_id_fk
   FOREIGN KEY (user_id)
   REFERENCES Users(id)
   ON DELETE CASCADE;