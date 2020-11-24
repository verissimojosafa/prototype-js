"use strict";
const path = require('path')
const dbPath = path.join(__dirname, '/../database/database.sqlite3');

const sqlite3 = require('sqlite3').verbose();
let db;

module.exports = {
    getAll() {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                return console.error(err.message);
            }

            console.log('Connected database file')
        });
        const sql = "SELECT * FROM todolist";
        let todolists = [];

        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) {
                    throw err;
                }
                todolists = rows.map(row => ({
                    [row.id]: {
                        name: row.name,
                        priority: Number(row.priority)
                    }
                }));

                resolve(todolists)

                db.close();
            });
        })
    },
    insertData(name, priority) {
        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                return console.error(err.message);
            }

            console.log('Connected database file')
        });

        return new Promise((resolve, reject) => {
            db.run(`INSERT INTO todolist(name, priority) VALUES (?,?)`, [name, Number(priority)], function (err) {
                if (err) {
                    return console.log(err.message);
                }

                console.log(`A row has been inserted with rowid ${this.lastID}`);
                resolve(this.lastID);
                db.close();
            });
        })
    }
}