-- • id — auto-incrementing primary key
-- • name — text, cannot be empty
-- • birth_year — integer, must be between 1000 and 2100
-- • country — text, with a default value of 'Unknown'

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    birth_year integer CHECK(birth_year BETWEEN 1000 AND 2100),
    country TEXT DEFAULT 'Unknown'
);