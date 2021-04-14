const { PrismaClient } = require("@prisma/client");
const express = require( "express" );
const app = express();
const port = 8000; // default port to listen
const prisma = new PrismaClient();
var cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// start the Express server
app.listen(port, () => {
    console.log( `Server started at http://localhost:${ port }` );
});

app.get('/listAllLocations', async (req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany()
    res.json(locations)
})

app.get('/locationInfo/findByZip/:zip', async (req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany({
        where: {
            zip: {
                equals: req.params.zip
            }
        }
    })
    res.json(locations)
})

app.get('/locationInfo/findByNeighborhood/:neighborhood', async(req:any, res:any) => {
    const locations = await prisma.mutualAid.findMany({
        where: {
            neighborhood: {
                equals: req.params.neighborhood
            }
        }
    })
    res.json(locations)
})


app.post('/location/add', async (req:any, res:any) => {
    const {name, address_one, address_two, city, state, zip, phone, email, links, description, neighborhood } = req.body;
    try { 
        const location = await prisma.mutualAid.create({
            data: {
                name,
                address_one,
                address_two,
                city,
                state,
                zip,
                phone,
                email,
                links,
                description,
                neighborhood
            }
        })
        res.json(location)
    } catch (e) {
        res.json(e)
    }
})