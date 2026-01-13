CREATE TABLE breeds (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT,
    pronunciation TEXT,
    alternate_name TEXT,
    country_of_origin TEXT,
    category TEXT,
    photo_url TEXT
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE attributes (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    value NUMERIC,
    description TEXT
);

CREATE TABLE breed_properties (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER REFERENCES breeds(id) ON DELETE CASCADE,
    attribute_id INTEGER REFERENCES attributes(id) ON DELETE CASCADE,
);