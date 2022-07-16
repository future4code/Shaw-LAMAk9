import { bandTableName, showTableName, userTableName } from "../../model/TableNames";
import { BaseDatabase } from "../BaseDatabase";


class Migrations extends BaseDatabase {
    createTables = async () => {
        try {
            await this.connection.raw(`

                CREATE TABLE IF NOT EXISTS ${userTableName} (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
                );
        
                CREATE TABLE IF NOT EXISTS ${bandTableName} (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) UNIQUE NOT NULL,
                    music_genre VARCHAR(255) NOT NULL,
                    responsible VARCHAR(255) UNIQUE NOT NULL 
                );
        
                CREATE TABLE IF NOT EXISTS ${showTableName} (
                    id VARCHAR(255) PRIMARY KEY,
                    week_day VARCHAR(255) NOT NULL,
                    start_time INT NOT NULL,
                    end_time INT NOT NULL,
                    band_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY(band_id) REFERENCES ${bandTableName}(id)
                );

            `)
                .then(() => { console.log("Tables created") })
        } catch (error: any) {
            console.log(error.sqlMessage || error.message)
        }
    }

    // insertUsers = async () => {
    //     try {
    //         await this.connection(userTableName)
    //             .insert(users)
    //             .then(() => { console.log("Users created") })
    //     } catch (error: any) {
    //         console.log(error.sqlMessage || error.message)
    //     }
    // }

    // insertBands = async () => {
    //     try {
    //         await this.connection(bandTableName)
    //             .insert(bands)
    //             .then(() => { console.log("Posts created") })
    //     } catch (error: any) {
    //         console.log(error.sqlMessage || error.message)
    //     }
    // }

    // insertShows = async () => {
    //     try {
    //         await this.connection(showTableName)
    //             .insert(shows)
    //             .then(() => { console.log("Post likes created") })
    //     } catch (error: any) {
    //         console.log(error.sqlMessage || error.message)
    //     }
    // }

    closeConnection = async () => {
        this.connection.destroy()
    }
}

const migrations = new Migrations()
migrations.createTables()
// .then(migrations.insertUsers)
// .then(migrations.insertBands)
// .then(migrations.insertShows)
.then(migrations.closeConnection)