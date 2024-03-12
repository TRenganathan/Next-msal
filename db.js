import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://trnathan98:trnathan98@cluster0.dkdkdqs.mongodb.net/?retryWrites=true&w=majority';
const options = {
   
};

let client;
let database;

async function connectDB() {
    if (!client) {
        client = new MongoClient(uri, options);
        await client.connect();
        console.log('Connected to MongoDB');
        database = client.db('userTable');
    }
    return database;
}

export { connectDB };
