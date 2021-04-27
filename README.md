# Boston Mutual Aid Site

## Team Mejia Development Team

* Aira Cosino
* Jared Min
* Jeffrey Jin
* Johanne Antoine
* Suhail Singh


## Technologies Used  
We used Prisma as an ORM, Express.js for the backend server, and React for the frontend.

## Quickstart

### Frontend
1. Add REACT_APP_GOOGLE_KEY to .env file in \frontend
2. Go into frontend folder
```bash
$ cd frontend
```
3. Install the node packages
```bash
$ npm install
```
4. Add your MapBox Access Token as a variable named GATSBY_MAPBOX_ACCESS_TOKEN to a file called .env.development file in the frontend folder. Then run: 
```
$ npm run develop
```
The site will be running on localhost:8000. 

### Backend
1. Add DATABASE_URL to .env file in \backend 
2. In the \backend\prisma
```bash
$ npx prisma generate
```
3. In the \backend
```bash
$ npm install
$ npx ts-node .
```
## Other Backend Commands
### Migrate models to Postgresql on Heroku
`npx prisma db push --preview-feature`
### Update database to reflect prisma schema
`npx prisma generate`
### Open Prisma studio
`npx prisma studio`
### Import mutual aid locations from CSV to database
`npx ts-node script.ts`


