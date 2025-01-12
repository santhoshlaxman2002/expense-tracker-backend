-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

create table "public".users(
	id uuid primary key default gen_random_uuid(),
	name text not null,
	email text unique not null,
	password text not null,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp,
	deleted_at timestamp
)

create table "public".categories (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    name text not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    deleted_at timestamp
);

create table "public".expenses(
	id uuid default gen_random_uuid(),
	user_id uuid references users(id) on delete cascade,
	category_id uuid references categories(id) on delete set null,
	name text not null,
	amount decimal(10,2) not null,
	description text,
	created_at timestamp default current_timestamp,
	updated_at timestamp default current_timestamp,
    deleted_at timestamp
)
