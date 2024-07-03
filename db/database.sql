CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  github_username VARCHAR(255),
  name VARCHAR(255),
  location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Languages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  language VARCHAR(255)
);

ALTER TABLE Users
ALTER COLUMN github_username SET NOT NULL,
ADD CONSTRAINT unique_github_username UNIQUE (github_username),
ALTER COLUMN name SET NOT NULL,
ALTER COLUMN location SET NOT NULL;

ALTER TABLE Languages
DROP CONSTRAINT IF EXISTS user_id_fk,
ADD CONSTRAINT user_id_fk
   FOREIGN KEY (user_id)
   REFERENCES Users(id)
   ON DELETE CASCADE,
ALTER COLUMN language SET NOT NULL,
ADD CONSTRAINT unique_user_language
   UNIQUE (user_id, language);