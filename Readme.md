# Discord bot

creating a Discord bot to:

    1- Kick members: $kick member_id
    2- Change nickname: $set-nickname member_id new_name
    3- ban user: $ban user_id
    3- Set roles depending on reactions. 

## how to run 

    1- [npm install] command
    2- Create a [.env] file and add `DISCORD_BOT_TOKEN` To get this token, you should create a bot on Discord and copy its token. 


### How to create a discord bot
    1- Go to `https://discord.com/developers/applications`.
    2- Create a new application and name your bot.
    3- Copy the `APPLICATION ID` of the bot.
    4- Authorize the bot from `https://discord.com/oauth2/authorize?client_id=APPLICATION_ID&scope=bot` after replacing the `APPLICATION_ID`.
    5- Add the bot to the server.
    6- Make sure the bot has the privilege to see message contents and be an administrator.
