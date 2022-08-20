import * as Crypto from "crypto";
import {Observable, Subscriber} from "rxjs";

const generateRandomRecord = (sensorId: string): iotRecord => {
    return {
        sensorId: sensorId,
        temp: 20 + (Math.random() * 10),
        timestamp: new Date()
    }
}

const generator = (subscriber: Subscriber<iotRecord>) => {
    setInterval(() => {
        subscriber.next(generateRandomRecord("mc_1"));
        subscriber.next(generateRandomRecord("mc_2"))
        subscriber.next(generateRandomRecord("mc_3"))
        subscriber.next(generateRandomRecord("mc_4"))
        subscriber.next(generateRandomRecord("mc_5"))
        subscriber.next(generateRandomRecord("mc_6"))
    }, 1000);
}
const observable = new Observable(generator);

export default observable;