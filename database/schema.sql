CREATE TABLE users(
	id uuid default gen_random_uuid(),
	name text not null,
	email text unique not null,
	password text not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp,
	deleted_at timestamp
);