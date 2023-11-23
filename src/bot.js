import dotenv from "dotenv"
import { Client, GatewayIntentBits, Partials } from "discord.js"

dotenv.config()

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessageReactions,
	],
	partials: [Partials.Message, Partials.Reaction], // Enable partials for messages
})

const PREFIX = "$"

client.on("ready", () => {
	console.log(`${client.user.tag} has logged in`)
})

client.on("messageCreate", async (message) => {
	if (message.author.bot) return // return if the bot itself who sent the message

	if (message.content.startsWith(PREFIX)) {
		// store the command name and args after splitting the command and removing whitespaces
		const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/)

		if (CMD_NAME === "kick") {
			// check if the user has permission
			if (!message.member.permissions.has("KickMembers")) {
				return message.reply("You don't have permission to kick members")
			}
			if (args.length === 0) return message.reply("Please provide an ID")
			let member
			// fetch the wanted member
			try {
				member = await message.guild.members.fetch(args[0])
			} catch (err) {
				return message.reply("unknown user")
			}
			// kick the member
			if (member) {
				member
					.kick()
					.then((member) => message.channel.send(`${member} was kicked`))
					.catch((err) => message.channel.send("I don't have permission ):"))
			} else {
				message.channel.send("The member was not found")
			}
		} else if (CMD_NAME === "set-nickname") {
			if (!message.member.permissions.has("ChangeNickname"))
				return message.reply("You don't have permission to change nickname")
			if (args.length < 2) return message.reply("Please provide an ID and new nickname")
			let member
			try {
				member = await message.guild.members.fetch(args[0])
			} catch (err) {
				return message.reply("unknown user")
			}
			if (member) {
				member
					.setNickname(args[1])
					.then((member) => message.channel.send(`${member}'s nickname has been changed`))
					.catch((err) => message.channel.send("I don't have permission"))
			} else {
				message.channel.send("The member was not found")
			}
		} else if (CMD_NAME === "ban") {
			if (!message.member.permissions.has("BAN_MEMBERS"))
				return message.reply("You don't have permission to ban members")

			if (args.length === 0) return message.reply("Please provide an ID")
			message.guild.members
				.ban(args[0])
				.then((member) => message.reply(`${member} has been banned`))
				.catch((err) => message.reply("I don't have permission"))
		}
	}
})

client.on("messageReactionAdd", (reaction, user) => {
	const { name } = reaction.emoji
	const member = reaction.message.guild.members.cache.get(user.id)
	// get the message ID
	if (reaction.message.id === "1177238017623207976") {
		switch (name) {
			case "🍎": // set role ID
				member.roles.add("1177249703226773544")
				break
			case "🍌":
				member.roles.add("1177249654732226614")
				break
			case "🍑":
				member.roles.add("1177249595538018396")
				break
		}
	}
})

client.on("messageReactionRemove", (reaction, user) => {
	console.log("rem")
	const { name } = reaction.emoji
	const member = reaction.message.guild.members.cache.get(user.id)
	if (reaction.message.id === "1177238017623207976") {
		switch (name) {
			case "🍎": // set role ID
				member.roles.remove("1177249703226773544")
				break
			case "🍌":
				member.roles.remove("1177249654732226614")
				break
			case "🍑":
				member.roles.remove("1177249595538018396")
				break
		}
	}
})

client.login(process.env.DISCORD_BOT_TOKEN)
