const Discord = require('discord.js')

require("dotenv").config()

// const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "n.",
    owners: ["504311046954156035"]
}

client.commands =  new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()


client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)


client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)


client.on("interactionCreate", (interaction) =>{
    if (!interaction.isCommand()) return
    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server.")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return interaction.reply("Invalid slash command")
    
    if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms)) 
    return interaction.reply("You do not have permission for this command.")

    slashcmd.run(client, interaction)

})

module.exports = bot

const WelcomeSchema = require('./schema/welcome-schema');


 client.on("guildMemberAdd", async (member, guild) => {
     WelcomeSchema.findOne({ guildId: member.guild.id }, async (err, data) =>{
         if(!data) return;
        
         const user = member.user;
         const channel = member.guild.channels.cache.get(data.channelId);
         const img = await generateImagewelcome(member)
         channel.send({
            content: `<@${member.id}> welcome to the server`,
            files: [img]
        })
     })
    
 })

 const leaveSchema = require('./schema/leave-schema');


 client.on("guildMemberAdd", async (member, guild) => {
     leaveSchema.findOne({ guildId: member.guild.id }, async (err, data) =>{
         if(!data) return;
        
         const user = member.user;
         const channel = member.guild.channels.cache.get(data.channelId);
         const imgleave = await generateImageleave(member)
         channel.send({
            content: `<@${member.id}> left the server`,
            files: [imgleave]
        })
     })
    
 })
 
client.login(process.env.TOKEN)