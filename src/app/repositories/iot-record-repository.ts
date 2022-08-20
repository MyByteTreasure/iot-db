import {Collection, Db, OptionalUnlessRequiredId} from "mongodb";

export const collectionExists = (db: Promise<Db>, collectionName: string): Promise<boolean> => {
    return db.then(db => db.listCollections({}, {nameOnly: true}))
        .then(colls => colls.map(el => el.name).toArray())
        .then(nameArr => !!nameArr.find(el => el === collectionName))
}

export const connectToCollection = <T>(db: Promise<Db>, collectionName: string) => {
    return db.then(db => db.collection<T>(collectionName));
}

export const createTimeSeriesCollection = <T>(db: Promise<Db>, collectionName: string) => {
    return db.then(db => db.createCollection<T>(collectionName, {timeseries: {
            timeField: "timestamp",
            granularity: "minutes"
        }}))
}

export const getOrCreateTimeSeriesCollection = <T>(db: Promise<Db>, collectionName: string): Promise<Collection<T>> => {
    return collectionExists(db, collectionName)
        .then(exists => exists ? connectToCollection<T>(db, collectionName) : createTimeSeriesCollection<T>(db, collectionName));
}

export const insertRecord = <T>(record: OptionalUnlessRequiredId<T>, collection: Promise<Collection<T>>) => {
    return collection.then(collection => collection.insertOne(record))
}
export const insertRecords = <T>(record: OptionalUnlessRequiredId<T>[], collection: Promise<Collection<T>>) => {
    return collection.then(collection => collection.insertMany(record))
}