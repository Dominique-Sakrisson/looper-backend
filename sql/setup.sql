DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email text UNIQUE not null,
    password_digest text not null
    -- first_name text not null,
    -- last_name text not null
    -- tel text not null
);
