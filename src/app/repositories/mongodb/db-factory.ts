import {MongoClient} from "mongodb";
import c from "config"

const connectionString = c.get<string>("database.connection-string")
const dbName = c.get<string>("database.name")
const client: MongoClient = new MongoClient(connectionString);
const db = client.connect().then(client => client.db(dbName));

export default db;

