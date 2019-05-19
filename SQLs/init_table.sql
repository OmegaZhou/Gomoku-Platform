drop table if exists USER;
drop procedure if exists SIGN_UP;
drop procedure if exists SIGN_IN;

create table USER(user_id INTEGER primary key,user_name VARCHAR(10),user_password VARCHAR(20));
insert into USER values(0,'root','');

delimiter //
create procedure SIGN_UP(in name VARCHAR(10),in password VARCHAR(20),out is_success INTEGER)
begin
    DECLARE cnt INT;
    if ((select user_id from USER where user_name=name) is null) then
        select max(user_id) into cnt from USER;
        insert into USER values(cnt+1,name,password);
        set is_success=1;
    else
        set is_success=0;
    end if;
    select is_success;
end//
delimiter ;


delimiter //
create procedure SIGN_IN(in name VARCHAR(10),in password VARCHAR(20),out is_success INTEGER)
begin
    DECLARE id INTEGER;
    select user_id into id from USER where user_name=name AND user_password=password;
    select id;
    if id is null then
        set is_success=0;
    else
        set is_success=1;
    end if;
    select is_success;
end//
delimiter ;
    