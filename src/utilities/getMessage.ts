export default (guild: string, channel: string, message: string): string => {
    return `https://discord.com/channels/${guild}/${channel}/${message}`;
};
