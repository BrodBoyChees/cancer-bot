// const Discord = require('discord.js')
// const Schema = require('../schema/welcome-schema')



// const run = async (message , interaction) => {
//         const channel = message.mentions.channels.first()
//         if(!channel) return interaction.reply("Please specify a channel  you would like to be your welcome channel!")

//         Schema.findOne({ guildId: message.guild.id }, async (err, data) => {
//             if (data){
//                 data.channelId = channel.id;
//                 data.save();
//             } else {
//                 new Schema({ 
//                     guildId: message.guild.id,
//                     channelId: channel.id,
//                 }).save();
//             }
//             return interaction.reply(`New welcome channel is now set as: **${channel}** `)
//         })
// }

// module.exports = {
//     name: "setwelcome",
//     description: "set a channel to be welcome",
//     perm: "ADMINISTRATOR",
//     options: [
//         {
//             name: "channel", description: "set a channel to be welcome",
//             type: "INTEGER", required: true
//         }
//     ],run
// }