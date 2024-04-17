import * as SQLLite from 'expo-sqlite';

const database = SQLLite.openDatabase('places.db');

export function init() {
    const promise = new Promise((resolve, reject) => {
        //real datatype contains decimals
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT,
            lat REAL NOT NULL, 
            lng REAL NOT NULL
        )`,
                [],
                () => {
                    console.log("SUCCESS")
                    resolve();
                },
                //first param transaction that failed, second the error
                // _ means you are taking the argument for technical reasons but not using it
                (_, error) => {
                    console.log("error gg", error)
                    reject(error)
                })
        });
    });

    return promise;
}

export function insertPlace(place) {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                [place.title, place.imageUri, place.address, place.location['lat'], place.location["lng"]],
                (_, result) => {
                    console.log("result", result)
                    resolve(result);
                },
                //first param transaction that failed, second the error
                // _ means you are taking the argument for technical reasons but not using it
                (_, error) => {
                    console.log("error", error)
                    reject(error)
                })
        },
        )

        return promise;
    })
}

export function fetchPlaces() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql("SELECT * FROM places", [],
            (_, result) => {
                console.log("fetch", result)
                resolve(result);
            },
            (_, error) => {
                console.log("fetch error", error)
                reject(error);
            })
        });
    });

    return promise;
}