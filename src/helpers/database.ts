import { connect, set } from "mongoose";
import { grey as g, blue as b } from 'chalk';

export default () => {
    if (!process.env.MONGO_URL) return console.log(`${g.bold('[')}${b.bold('DATABASE')}${g.bold(']')} Running without a database connection. All database reliant commands will not function properly.`);
    set('strictQuery', false);
    connect(process.env.MONGO_URL!, { dbName: 'bot' }).then(() => {
        console.log(`${g.bold('[')}${b.bold('DATABASE')}${g.bold(']')} Successfully connected to the database.`);
    });
};
