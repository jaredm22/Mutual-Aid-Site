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
        var phones: string[] = [values[i][6]]
        var emails: string[] = [values[i][7]]
        var links: string[] = [values[i][9]]
        if (values[i][6].indexOf(',') > -1) {
            phones = values[i][6].split(",")
        }
        if (values[i][7].indexOf(',') > -1) {
            emails = values[i][7].split(",")
        }
        if (values[i][9].indexOf(',') > -1) {
            links = values[i][9].split(",")
        }
        var details = {
            name: values[i][0],
            address_one: values[i][1],
            address_two: values[i][2],
            city: values[i][3],
            state: values[i][4],
            zip: values[i][5],
            phone: phones,
            email: emails,
            description: values[i][8],
            links: links
        }
        const loc = await prisma.mutualAid.create({data: details})
    }
}

importFromCSV()
    .catch(e => {
        throw e
    })
    .finally(async() => {
        await prisma.$disconnect()
    })