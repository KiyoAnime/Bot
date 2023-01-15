export default () => {
    if (!process.env.BOT_TOKEN || !process.env.MONGO_URL) {
        console.error('BOT_TOKEN or MONGO_URL variables were not defined. Application can not start!');
        process.exit(9);
    };
};
