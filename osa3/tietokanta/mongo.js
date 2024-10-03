const {MongoClient, ServerApiVersion} = require("mongodb");

const uri = `mongodb://root:root@localhost:27017/phonebook`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const database = client.db('phonebook');

        const name = process.argv[3];
        const number = process.argv[4];
        const phonebook = database.collection('phonebook');

        if (name != undefined && number != undefined) {
            const result = await phonebook.insertOne({name: name, number: number});
            if (result.acknowledged) {
                console.log(`added ${name} number ${number} to phonebook`);
            } else {
                throw new Error("Inserting to DB failed");
            }
        } else {
            const cursor = phonebook.find();
            while (await cursor.hasNext()) {
                const row = await cursor.next();
                console.log(`${row.name} ${row.number}`)
            }
        }
    } catch (e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);