const { PrismaClient } = require("@prisma/client");
const express = require( "express" );
const app = express();
const port = 5000; // default port to listen
const prisma = new PrismaClient();
var cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/register', async(req:any, res:any)=>{
    const email = req.body.email
    const password = req.body.password
    try{
        const user = await prisma.mutualAid.create({
            data: [
                {email: email, password:password}
            ]
        })
        res.json(user);
    } catch (e) {
        res.json(e)
    }
});

app.post('/login', async(req:any, res:any) => {
    const email = req.body.email
    const password = req.body.password
    try{
        const user = await prisma.mutualAid.find({
            where: {
                email:{
                    equals: email
                },
                password:{
                    password:password
                }
            }
        })
        res.send(user);
    }catch(e){
        res.send({message: "Wrong email/password combination"})
    }
})
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
    const {name, neighborhood, phone, email, website, give_help, need_help, address_one, address_two, city, state, zip, tags } = req.body;
    try { 
        const location = await prisma.mutualAid.create({
            data: {
                name,
                neighborhood,
                phone,
                email,
                website,
                give_help,
                need_help,
                address_one,
                address_two,
                city,
                state,
                zip,
                tags
            }
        })
        res.json(location)
    } catch (e) {
        res.json(e)
    }
})