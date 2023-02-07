export default () => {
    if (!process.env.BOT_TOKEN) {
        console.error('BOT_TOKEN variables were not defined. Application can not start!');
        process.exit(9);
    };
};
