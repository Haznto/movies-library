create table if not exists movies_list(
    id serial primary key,
    movie_id integer,
    title varchar(255),
    overview varchar(10000),
    poster_path varchar (1000),
    user_comment varchar(255)
); 

-- insert into movies_list(movie_id,title,overview,poster_path) values (2321,'bananana','nice','nowhere');