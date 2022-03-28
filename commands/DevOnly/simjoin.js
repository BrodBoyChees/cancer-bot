module.exports = {
    name: "simjoin",
    description: "simulates a join!",
    premissions: [],
    devOnly: false,
    run: async ({bot, message, args}) => {
        bot.emit('guildMemberAdd', message.member);
    }
}