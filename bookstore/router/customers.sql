-- • id — auto-incrementing primary key
-- • full_name — text, cannot be empty
-- • email — text, must be unique and cannot be empty
-- • phone — text, can be empty
-- • registered_at — timestamptz, default current time

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    registered_at TIMESTAMPTZ DEFAULT NOW()
);