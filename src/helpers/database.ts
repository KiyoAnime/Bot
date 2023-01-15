import { connect, set } from "mongoose";
import { grey as g, blue as b } from 'chalk';

export default () => {
    set('strictQuery', false);
    connect(process.env.MONGO_URL!, { dbName: 'bot' }).then(() => {
        console.log(`${g.bold('[')}${b.bold('DATABASE')}${g.bold(']')} Successfully connected to the database.`);
    });
};
