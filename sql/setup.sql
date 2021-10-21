DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tracks CASCADE;
DROP TABLE IF EXISTS recordings;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email text UNIQUE not null,
    password_digest text not null
    -- first_name text not null
    -- last_name text not null
    -- tel text not null
);

CREATE TABLE tracks (
    id BIGINT PRIMARY KEY,
    track_id BIGINT unique,
    track_name text NOT NULL,
    owner_user_id INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE recordings(
    id BIGINT PRIMARY KEY,
    key VARCHAR(3) NOT NULL,
    duration INTEGER NOT NULL,
    timing INTEGER NOT NULL,
    octave INTEGER NOT NULL,
    track_id INTEGER NOT NULL REFERENCES tracks(track_id)
);
