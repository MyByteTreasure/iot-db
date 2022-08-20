import db from "./repositories/mongodb/db-factory";
import observable from "../mocks/message-generator";
import {bufferCount} from "rxjs";
import {getOrCreateTimeSeriesCollection, insertRecords} from "./repositories/iot-record-repository";


const messages = observable;
const database = db;

const iotCollection = getOrCreateTimeSeriesCollection<iotRecord>(database, "example");


messages
    .pipe(bufferCount<iotRecord>(100))
    .subscribe(records => {
            insertRecords<iotRecord>(records, iotCollection)
                .then(result => console.log(result.insertedCount))
                .catch(err => console.log(err));
    });
