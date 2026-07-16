-- • id — auto-incrementing primary key
-- • title — text, cannot be empty
-- • author_id — integer, must refer to an existing author
-- • price — numeric with 2 decimal places, must be greater than 0
-- • in_stock — boolean, default true
-- • published_date — date
-- • created_at — timestamptz, default current time

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author_id INTEGER,
    price NUMERIC(10, 2) CHECK(price > 0),
    in_stock BOOLEAN DEFAULT true,
    published_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);