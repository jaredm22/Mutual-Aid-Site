# Boston Mutual Aid Site

## Team Mejia Development Team

* Aira Cosino
* Jared Min
* Jeffrey Jin
* Johanne Antoine
* Suhail Singh


## Technologies Used  
For the backend we used Prisma as our ORM, Express.js for the backend server, and React for the frontend.

## Requirements
### Frontend
For dev on the frontend you'll need to install:
- React (instructions to install can be found [here](https://reactjs.org/docs/create-a-new-react-app.html))

### Backend
For dev on the backend you'll need to install: 
- Express (instructions to install can be found [here](https://expressjs.com/en/starter/installing.html))
- Prisma (instructions to install can be found [here](https://www.prisma.io/docs/getting-started/quickstart-typescript))

## Quickstart

### Frontend
1. Go into frontend folder
```bash
$ cd frontend
```
2. Install the node packages
```bash
$ npm install
```
3. Create a file called .env.development inside the frontend folder. Add your MapBox Access Token (You can create a Mapbox account [here](https://account.mapbox.com))) as a variable named GATSBY_MAPBOX_ACCESS_TOKEN to the. Then run: 
```bash
$ npm run develop
```
The site should be running on [http://0.0.0.0:8000](http://0.0.0.0:8000)\n
Make sure to have backend running before running the frontend.

### Backend
1. Go into backend folder
```bash
$ cd backend
```
2. Create a .env file in the backend folder and add your database url as a environment variable called DATABASE_URL (Please contact the dev team if you would like to use the original database url).
   
3. Set up the database for prisma and import the mutual aid data (not necessary if using original database).
```bash
$ npx prisma introspect
$ npx prisma generate
$ npx ts-node script.ts
```

4. Start the server
```bash
$ npm install
$ npm start
```
The server should be running on [http://0.0.0.0:5000](http://0.0.0.0:5000)
