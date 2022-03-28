const Discord = require('discord.js')
const Schema = require('../../schema/leave-schema')

module.exports = {
    name: "setleave",
    description: "sets a leave channel",
    category: "welcome and leave",
    premissions: ["ADMINISTRATOR"],
    devOnly: false,
    run: async ({bot, message, args }) => {
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply("Please specify a channel  you would like to be your welcome channel!")

        Schema.findOne({ guildId: message.guild.id }, async (err, data) => {
            if (data){
                data.channelId = channel.id
                data.save();
            } else {
                new Schema({ 
                    guildId: message.guild.id,
                    channelId: channel.id,
                }).save();
            }
            message.reply(`New leave channel is now set as: **${channel}** `)
        })
    }
}