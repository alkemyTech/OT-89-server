# Server Base - Proyecto ONG

## Envinroment setup

1. Create database
2. Copy .env.example to .env and fill with database credentials.

To install dependencies, run

```bash
npm install
```

3. Migrations:

```bash
npx sequelize-cli db:migrate
```

4. Seeders:

```bash
npx sequelize-cli db:seed:all
```

## Start local server

```bash
npm start
```

## User seeds

> Admin Users:
> {firstName} {lastName} : {email} - {password}
>
> > Hugo Foncea : hf.admin@mail.com - admin123 ;
> > Emmanuel Ranone : er.admin@mail.com - admin123 ;
> > Antonio Ludueña : al.admin@mail.com - admin123 ;
> > Benjamin Potobsky : bp.admin@mail.com - admin123 ;
> > Fernanda Ramirez : : fr.admin@mail.com - admin123 ;
> > Ignacio Garcia : ig.admin@mail.com - admin123 ;
> > Juan Abal : ja.admin@mail.com - admin123 ;
> > Luciano Ibarra : li.admin@mail.com - admin123 ;
> > Marcos Caballero : mca.admin@mail.com - admin123 ;
> > Michel Chamarez : mch.admin@mail.com - admin123 ;
> > Martin Cappi : mcd.admin@mail.com - admin123 ;

> Regular Users:
> {firstName} {lastName} : {email} - {password}
>
> > Hugo Foncea : hf.user@mail.com - user123 ;
> > Emmanuel Ranone : er.user@mail.com - user123 ;
> > Antonio Ludueña : al.user@mail.com - user123 ;
> > Benjamin Potobsky : bp.user@mail.com - user123 ;
> > Fernanda Ramirez : : fr.user@mail.com - user123 ;
> > Ignacio Garcia : ig.user@mail.com - user123 ;
> > Juan Abal : ja.user@mail.com - user123 ;
> > Luciano Ibarra : li.user@mail.com - user123 ;
> > Marcos Caballero : mca.user@mail.com - user123 ;
> > Michel Chamarez : mch.user@mail.com - user123 ;
> > Martin Cappi : mcd.user@mail.com - user123 ;
