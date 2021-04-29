import { PrismaClient } from '@prisma/client';

var fs = require('fs');
var csv = require('csv-parse');
const prisma = new PrismaClient();

async function importFromCSV() {
    var mutualaids: string[] = []
    fs.createReadStream('mutualaid.csv')
        .pipe(csv())
        .on('data', function (data: string) {
            return mutualaids.push(data)
        })
        .on('end', function () {
            addToDB(mutualaids.slice(1, mutualaids.length))
    });
};

async function addToDB(values: string[]) {
    for (var i=0; i<values.length; i++){
        var details = {
            name: values[i][0],
            neighborhood: values[i][1],
            phone: values[i][2],
            email: values[i][3],
            website: values[i][4],
            need_help: values[i][5],
            give_help: values[i][6],
            address_one: values[i][7],
            address_two: values[i][8],
            city: values[i][9],
            state: values[i][10],
            zip: values[i][11]
        }
        const loc = await prisma.mutualAid.create({data: details})
    }
}

async function validateHuman(token: String): Promise<boolean> {
    const secret =  process.env.SECRET_KEY;
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        {
            method: "POST",
        }
    );
    const data = await response.json();
    return data.success;
}

importFromCSV()
    .catch(e => {
        throw e
    })
    .finally(async() => {
        await prisma.$disconnect()
    })