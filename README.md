# Boston Mutual Aid Site

## Team Mejia Development Team

* Aira Cosino
* Jared Min
* Jeffrey Jin
* Johanne Antoine
* Suhail Singh

## Prisma Commands
### Migrate models to Postgresql on Heroku
`npx prisma db push --preview-feature`
### Update database to reflect prisma schema
`prisma generate`
### Open Prisma studio
`npx prisma studio`

## Run backend commands
* `npm install`
* `npx ts-node .`

## Import mutual aid locations from CSV to database
`npx ts-node script.ts`
## Frontend 
Add your MapBox Access Token as a variable named GATSBY_MAPBOX_ACCESS_TOKEN to a file called .env.development file in the frontend folder. Then run: 
```
npm run develop
```
The site will be running on localhost:8000. 