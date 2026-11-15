const Aoijs = require("aoi.js")

const bot = new Aoijs.Bot({
token: process.env.DISCORD_TOKEN || "YOUR_BOT_TOKEN_HERE", 
prefix: "$getServerVar[prefix]",
fetchInvites: true
})

bot.client.setMaxListeners(50) 
bot.onMessage() 
bot.onInteractionCreate();

//Last Updated on 7:27pm (Wednesday, Nov 3)

/////NQN System/////
bot.client.on("message", async (message) => {
  if (message.author.bot) return;
  let msg = message.content;
 
  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
  if (!emojis) return;
  emojis.forEach(m => {
    let emoji = bot.client.emojis.cache.find(x => x.name === m)
    if (!emoji) return;
    let temp = emoji.toString()
    if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
    else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  })
 
  if (msg === message.content) return;
 
  let webhook = await message.channel.fetchWebhooks();
  let number = randomNumber(1, 2);
  webhook = webhook.find(x => x.name === "AQUA-MoD" + number);
 
  if (!webhook) {
    webhook = await message.channel.createWebhook(`AQUA-MoD` + number, {
      avatar: bot.client.user.displayAvatarURL({ dynamic: true })
    });
  }
 
  await webhook.edit({
    name: message.member.nickname ? message.member.nickname : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  })
 
  message.delete().catch(err => { })
  webhook.send(msg).catch(err => { })
 
  await webhook.edit({
    name: `AQUA-MoD` + number,
    avatar: bot.client.user.displayAvatarURL({ dynamic: true })
  })
 
 
})
 
//function
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//////////////////////////////////

bot.status({
 text:"$getVar[status]",
 type:"PLAYING",
 status:"dnd",
 time: 12
})

bot.status({
      text: "aqa help | aqa changelogs",
      type: "PLAYING",
      status: "online",
      time: 12
})

bot.status({
      text:  "Developed and Maintained by NeeL_Official#5794",
      type: "WATCHING",
      status: "dnd",
      time: 12
})

bot.status({
      text: "Moderation in $serverCount Servers and $numberSeparator[$allMembersCount] Users!!",
      type: "STREAMING",
      status: "idle",
      time: 12
})

bot.status({
      text: "with AoI.js",
      type: "PLAYING",
      status: "idle",
      time: 12
})

bot.variables({
prefix: "aqa ",
status: "",
muterole: "",
suggestchannel: "",
suggest_system: "no",
AFK: "off/",
time: "",
warn: "0",
message: "0",
PREMIUM: "false", 
cbw : "",   
/////Levelling System///// 
levelling:"false",
  level_msg:"{user.mention}, you just levelled up to {level}!",
  level_channel:"",
  level_roles:"",
  level_order:"",
  exp:"0",
  level_card:"https://wallpapercave.com/wp/wp2704825.jpg",
  level_msges:"",
  level_morder:"",
  req:"100",
  rank:"0",  
//////////////////////
/////Snipe system/////
allsnipe: "",
user_ID: "undefinied",
user_message: "undefinied",
snipe_msg: "",
snipe_author: "",
snipe_channel: "",
snipe_date: "",   
msgEditorID: "undefined",
esnipeOldMsg: "undefined",
//////////////////////
/////Invite System/////
invite: "0",
joinch: "",
leavech: "",
//////////////////////////
/////Welcomer System/////   
joinlogs: "disabled",
joinmessage:  "Hello {user.name},we hope you will enjoy here!",
joinchannel: "{user.name} just left us!",
leavemessage:   "",
leavechannel: "",
////////////////////////////   
/////Anti-Raid System/////
autokickbot: "false", 
antibotlogs: "", 
antiraid: "false", 
antiraidlogs: "",
antiraidmute: "false",
//////////////////////////
/////Anti-Link/////
link: "false", 
promotionchnl: "", 
////////////////////////
/////Profile System/////
age:"",
name:"Data Not Set",
pet:"Data Not Set",
country:"Data Not Set",
hobbies:"Data Not Set",
about:"Data Not Set",   
//////////////////////////////
/////Reaction Roles/////
rrr: "",
rrmid: "",
//////////////////////////////
bl:"",//Bot Logs channel
nc:"",//Nuke Channel
//////////////////////////////
color: "34eb86", 
chatbotchannel: "Not Set",
logchannel: "",    
/////Third-party API keys (bring your own — the originals were removed)/////
// shortener_api_key  -> api.avux.ga/shortener (sent as the X-API-Key header)
// thum_api_key       -> image.thum.io (the "auth" segment of the screenshot URL)
shortener_api_key: "",
thum_api_key: "",
})
 
bot.loopCommand({
	channel: "000000000000000000",
			code: `$editChannel[000000000000000000;$default;Member Count: $numberSeparator[$membersCount;,];$default;$default;$default;$default]`,
						executeOnStartup: true,
										every: 120000,
														});

bot.command({
name:"changelogs",
code:`
$title[Latest Updates!]
$description[
»Added Welcomer commands!
»Added Userinfo command! 
»Added snipe command! 
»Fixed Bugs
»Added childhood games rock,paper and scissors!
»Added lock and unlock command 
»Improved antilink! 
»Removed create channel command!]
$footer[This updates may be late to show here! That's why join Official Server!]
$color[RANDOM] `
})
 
bot.command({
name: "stealemoji",
code: `
$title[Emoji Added]
$color[RANDOM]
$description[Successfully add emoji $addEmoji[https://cdn.discordapp.com/emojis/$findNumbers[$message[1]];$message[2];yes] with name $message[2]]
$footer[By $username[$authorID]]
$addTimestamp
$suppressErrors[❌Not a valid emoji or an emoji ID, Correct usage $getServerVar[prefix] stealemoji (emoji) (name)]
$onlyIf[$charCount[$message[2]]>=2;❌Your emoji name must be longer than two characters]
$onlyIf[$findNumbers[$message[1]]!=;;❌Not a valid emoji or an emoji ID]
$onlyIf[$message[2]!=;❌Please provide a name to add this emoji]
$onlyIf[$message[1]!=;❌Please provide an emoji to add]
$onlyPerms[manageemojis;❌You don't have manage_emojis permissions to add emojis to the server]`
})
 
bot.command({
  name: "deleteemoji",
  code: `$if[$stringstartswith[$message[1];<]==true]
    $deleteemojis[$customemoji[$emoji[$resolveemojiid[$emojisfrommessage[$message[1]]];name];$guildid]]
    $wait[1s]
    $addfield[Success!;Deleted the emoji with the name \`$message[1]\`.]
    $color[#206694]
    $else
    $deleteemojis[$customemoji[$get[name];$guildid]]
    $wait[1s]
    $addfield[Success!;Deleted the emoji with the name \`$get[name]\`.]
    $color[#206694]
    $let[name;$replacetext[$messageslice[0;$argscount]; ;_;-1]]
    $endif
    $onlyBotPerms[manageemojis;:x: I need \`Manage Emojis\` to do that]
    $onlyPerms[manageemojis;:x: You need \`Manage Emojis\` to do that]
    $suppresserrors[Oops!:It seems this is not an existing emoji in this server, please send the name of a valid emoji]
  `
})

bot.command({
name: "hack",
aliases: ["gethack", "showinfo"],
code: `Hacking $username[$mentioned[1;yes]] in few seconds...
$editIn[3s;[○] Discord token: \`$randomString[20]\`;[◐] Email: $randomText[lordly123451234523@gmail.com;$username1234iamcool123@gmail.com;iainteverseentwoprettybestfriends@gmail.com;poopybutt$username@gmail.com;$usernamediesfromcoolness@gmail.com;verycoolrealgmail@gmail.com;discordbotsorg@gmail.com;walmartofficial123@gmail.com;asdfdrtertrt@gmail.com];[◓] Password: $randomText[whatthefack;poop;passwordispassword;haha$username;ilovemoney;$username;iselldrugs;aefertewr;The bisector went through the binary.;cringegamer.xd;xX69$username420Xx];[◑] Last message sent: "$randomText[bro how do i tell her..;Love you step bro;I'm stuck in the dryer step bro;Sweet home alabama.;Frog you all.;tiktok sucks lol;i love watching weird things on weird websites haha;Is 3 inches enough;She left me on read;what would happen if i got hacked lmao;AquA MoD is the best bot wtf lol;i love gacha;is 3 inches good or wat]";[◒] Location: $randomText[Canada;Earth;America;White house;Currently at home;Outside.];[●] Hack complete;[◉] All data has been deleted and is being sent to the internet.;[◎] *The totally real and dangerous hack is complete*]
$onlyIf[$mentioned[1]!=;Woah wait, where is the person who is to be hacked bruh]
$onlyIf[$authorID!=$mentioned[1];....Hacking yourself?.Sed lyf] 
`
}) 

bot.command({
name: "<@790043677225385985>",
nonPrefixed: true,
code: `$title[Hello!]
$color[#0000FF]
$description[Hello $username

My Prefix is **“$getServerVar[prefix]”**
Default is \`aqa\`
You can type ($getServerVar[prefix] help) for commands

======━━━━❰･❉･❱━━━━======

 <:NX_point:767282764746981417>   Want to add me to your server?
 [Click here](https://discord.com/oauth2/authorize?client_id=790043677225385985&scope=bot&permissions=2147483647) <a:verified:759079058340053104>

 <:NX_point:767282764746981417>  Want to join official server?
 [Click here](https://discord.gg/kMmtceF) <a:verified:759079058340053104>


======━━━━❰･❉･❱━━━━======]
$footer[Thank You]
`})

bot.command({
 name: "$alwaysExecute", 
 code: `  
$suppressErrors[{color:RED} {title:Error!} {description:Something went wrong... Turn chatbot off, and try again later.}]
$reply[$messageID;> **\`$username#$discriminator[$authorID]\`** » __$jsonRequest[https://api.affiliateplus.xyz/api/chatbot?message=$message&botname=AQUA-MoD&ownername=NeeL_Official;message]__;no]
$wait[2s]
$botTyping[1s] 
$onlyIf[$channelID==$getServerVar[chatbotchannel];] `
 }) 

 bot.command({
 name: "setchatbot",
 code: `$author[Successfully set chatbot channel!;https://media.discordapp.net/attachments/799897443424272404/858372122837516288/Chat_Mod.png] 
$description[Chabot is set to <#$mentionedChannels[1]> .]
 $setServerVar[chatbotchannel;$mentionedChannels[1]] 
$color[7289da]
 $onlyPerms[managechannels;> ❌ You need the **\`manage_channels\`** permission to set the chat-bot channel.]`
 }) 
 
bot.command({
name: "chatbotdisable",
code: `$resetServerVar[chatbotchannel]
$author[Disabled chatbot Successfuly;https://media.discordapp.net/attachments/799897443424272404/858372122837516288/Chat_Mod.png] 
$color[05fab5] 
$onlyPerms[managechannels;> You need the **\`manage_channels\`** permission to remove the chat-bot channel]
`
})   

bot.command({
 name: "avatar",
 aliases: "av",
 code: `
$color[RED]
$title[**Avatar of $username[$findUser[$message]]#$discriminator[$findUser[$message]]**]
$description[[Link]($userAvatar[$findUser[$message]])]
$image[$userAvatar[$findUser[$message]?size=2048]]
$footer[That's the avatar]
 `
})
/////Button HElp////
bot.command({
    name: "help",
    code: `
    $buttonCollector[$get[id];$authorID;1m;1,2,3,4,5,6,7,9;await1,await2,await3,await4,await5,await6,await7,await9;Only $userName can use this interaction,,64]
       $let[id;$apiMessage[$channelId;;{title:$customEmoji[dawn_help] Help}{description:
**Dear $username, Thank you for use the help command please choose what you need you need help with under this message.**

┎━─━─━─━─━─━─━─━─━┒
 
Help Command Pages:
 
1️⃣ - Page 1 (Admin Commands)
 
2️⃣ - Page 2 (Bot Commands)
 
3️⃣ - Page 3 (Fun Commands)
 
4️⃣ - Page 4 (Level Commands)
 
5️⃣ - Page 5 (Music Commands)
 
6️⃣ - Page 6 (Welcomer Commands)
 
7️⃣ - Page 7 (Bot-Owner Commands)
 
Note: Use \`$getServerVar[prefix] <command>\`. <> Not necessary
 
┖━─━─━─━─━─━─━─━─━┚ 
    
**⚠ You have 3 minutes before all the buttons stop working!**}
{color:RANDOM}{footer: Page 0/7};{actionRow:Previous Page,2,1,0,,true:Next Page,2,1,1,,false};;yes]]`
}) 
bot.awaitedCommand({
    name: "await1",
    code: `$interactionReply[;{title:Page 1 (Admin Commands)} {description: $customEmoji[dawn_okmod] *__MoDeration Panel__*
 
[👥] **Members Category**
**\`\`\`
ban, banalt, softban, unban, kick, set-mute, temp-mute, warn, removewarn, checkwarn, addrole, massgiverole, masstakerole, modnick, setnick, dehoist, userinfo, serverinfo
\`\`\`**
 
[#️⃣] **Channel Category**
**\`\`\`
slowmode, purge, clear, instanuke, nuke, antilinkon, antilinkoff, promo-channel, reset-promo, lock, unlock, viewlock, viewunlock, lockall, snipe, snipeall, editsnipe, quote, createchannel, poll, stealemoji, deleteemoji
\`\`\`**
 
[$customEmoji[dawn_mod]] **ANTI-RAID BETA**
**\`\`\`
set-antibotlogs, antibotraid, set-antiraidlogs, antiraid, antiraidmute
\`\`\`**
 

     }{color:RANDOM}{footer: Page 1/7};{actionRow:Previous Page,2,1,9,,false:Next Page,2,1,2,,false};;7]`})

bot.awaitedCommand({
    name: "await2",
    code: `$interactionReply[;{title:Page 2(Bot Commands)} {description: $customEmoji[dawn_info] __*Bot Commands*__
 
**\`\`\`
ping, support, botinfo, report, changelogs
\`\`\`**
}{color:RANDOM}{footer: Page 2/7};{actionRow:Previous Page,2,1,1,,false:Next Page,2,1,3,,false};;7]`})
                 
bot.awaitedCommand({
    name: "await3",
    code: `$interactionReply[;{title:Page 3(Fun Commands)} {description:
$customEmoji[dawn_neonhappy] __*Fun Commands*__
 
**\`\`\`
afk, avatar, dm, hack, calculate, reminder, snipe, translate, messages, rps, shortener, pastebin, roast, weather, profile-setup, profile
\`\`\`**
}{color:RANDOM}{footer:Page 3/7};{actionRow:Previous page,2,1,2,,false:Next Page,2,1,4,,false};;7]`})

bot.awaitedCommand({
    name: "await4",
    code: `$interactionReply[;{title:Page 4(Level Commands)} {description:
🎚️ __***Level Commands***__
 
**\`\`\`
set-levelling, level-role, level-message, rank, set-card, rankboard
\`\`\`**
 
$customEmoji[dawn_point] __***Aliases***__
**\`\`\`
- levelling
- lrole
- lmsg
- level
- card
- top
\`\`\`**
       }{color:RANDOM}{footer: Page 4/7};{actionRow:Previous Page,2,1,3,,false:Next Page,2,1,5,,false};;7]`})

 bot.awaitedCommand({
    name: "await5",
    code: `$interactionReply[;{title:Page 5(Music Commands)}{description:
$customEmoji[dawn_rotatingcd] __*Music*__
 
**\`\`\`
play, pause, resume, loop, now playing, stop, skip, skipto, clearqueue, queue, volume, filter, lyrics, voicemute, voiceunmute
\`\`\`**
       }{color:RANDOM}{footer: Page 5/7};{actionRow:Previous Page,2,1,4,,false:Next Page,2,1,6,,false};;7]
`})
bot.awaitedCommand({
    name: "await6",
    code: `
$interactionReply[;{title:Page 6(Welcomer Commands)} {description:
\👋 __*Welcomer Commands*__
 
**\`\`\`
setjoinchannel, setleavechannel, setjoinmsg, setleavemsg, autoroleon, autoroleoff, joinlogson, joinlogsoff, welcomerinfo, stoplogs
\`\`\`**
 
◈ __*Invite Tracker*__
 
**\`\`\`
setjoinch, setleavech, inviter, invboard
\`\`\`**
}
 {color:RANDOM}{footer: Page 6/7};{actionRow:Previous Page,2,1,5,,false:Next Page,2,1,7,,false};;7]
`
                 })

bot.awaitedCommand({
    name: "await7",
    code: `
$interactionReply[;{title:Page 7(Bot-Owner Only)} {description:
$if[$checkContains[$botOwnerID;$authorID]==true]
**__Bot-Owner Commands__**
 
\`\`\`
setstatus, reboot, eval, djseval, destroy, setbotname
\`\`\`
$endif 
 
\`\`\`
These commands can be only seen by the bot owner meanwhile check bot other features or read this quote below
\`\`\`
__Quote__: "**$jsonRequest[https://www.no-api-key.com/api/v2/quotes;quote]**"

__Quote By__: **$jsonRequest[https://www.no-api-key.com/api/v2/quotes;author]**
}{color:RANDOM}{footer: Page 7/7};{actionRow:Previous Page,2,1,6,,false:Next Page,2,1,0,,true};;7]`
              })

bot.awaitedCommand({
    name: "await9",
    code: `$interactionReply[;{title:$customEmoji[dawn_help] Help}{description:
**Dear $username, Thank you for use the help command please choose what you need you need help with under this message.**

┎━─━─━─━─━─━─━─━─━┒
 
Help Command Pages:
 
1️⃣ - Page 1 (Admin Commands)
 
2️⃣ - Page 2 (Bot Commands)
 
3️⃣ - Page 3 (Fun Commands)
 
4️⃣ - Page 4 (Level Commands)
 
5️⃣ - Page 5 (Music Commands)
 
6️⃣ - Page 6 (Welcomer Commands)
 
7️⃣ - Page 7 (Bot-Owner Commands)
 
Note: Use \`$getServerVar[prefix] <command>\`. <> Not necessary
 
┖━─━─━─━─━─━─━─━─━┚ 
    
**⚠ You have 3 minutes before all the buttons stop working!**}
{color:RANDOM}{footer: Page 0/7};{actionRow:Previous Page,2,1,0,,true:Next Page,2,1,1,,false};;7]`})
///////////////////////////////////////////////
/////Moderation Commands/////

bot.command({
 name:"ban",
 code: `
$ban[$mentioned[1];$noMentionMessage]
$wait[1s]
$sendDm[$mentioned[1];{title:Ban evading!}{description:You are banned in $serverName, due to $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]] }]
$color[RANDOM] 
$title[<:dawn_okmod:824925777425465394> Banned successfully]
$addField[About:;
Reason:
> $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]
Date:
> $day $month $year
]
$addField[User information;
$userTag[$findUser[$message[1]]] - $findUser[$message[1]]]
$addField[Moderator;
$userTag - $authorID]
$thumbnail[$userAvatar[$findUser[$message[1]]]]
$channelSendMessage[$getServerVar[logchannel];{title::hammer: | New Case: BAN}{description:
**Actioned by**
<@$authorID>

 **Target**
$findUser[$message[1]] [<@$findUser[$message[1]]>]

**Reason**
**\`$replaceText[$replaceText[$checkCondition[$message[2]==];true;None];false;$message[2]]\`**

Date:
> $day $month $year}{color:$getServerVar[color]}]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than you on role position.]
$onlyIf[$findUser[$message[1]]!=$authorID;**⛔ - You can't ban yourself (Or else, I couldn't find that user)**]
$onlyIf[$findUser[$message[1]]!=$clientID;**⛔ - I can't ban myself, that's illegal**]
$onlyIf[$findUser[$message[1]]!=$ownerID;**⛔ - I can't ban the owner of the server**]
$onlyIf[$findUser[$message[1]]!=$authorID;**⛔ - You can't ban yourself (Or else, I couldn't find that user)**]
$onlyIf[$isBanned[$findUser[$message[1]]]==false;**⛔ - This user has already been banned on this server**]
$onlyIf[$message!=;**⛔ - Please specify the user you want to ban. Correct usage:** \`$getServerVar[prefix]ban <@User> [Reason\\]\`]
$onlyPerms[ban;**⛔ - To use this you require the \`BAN_MEMBERS\` permission**]
$onlyBotPerms[ban;**⛔ - I don't have enough perms to execute this command. Permissions missing:** \`BAN_MEMBERS\`]`
})

bot.command({
name: "banalt",
aliases: ['balt' , 'bana'],
code:`
$if[$creationdate[$mentioned[1];time]>30]
$ban[$mentioned[1]]
$username[$mentioned[1]]#$discriminator[$mentioned[1]] has been banned from $servername because there account was younger than 30d
$deletecommand
their account is $creationdate[$mentioned[1];time] old
$else
sorry $username that user is older than 30d old
$deletecommand
$endif`
})
 
bot.command({ 
    name: "softban", 
    code: `
$unban[$mentioned[1]]
$wait[1s]
$ban[$mentioned[1];SoftBanned;7]
$wait[1s]
$title[Softban]
$description[Softbanned <@$mentioned[1]>

Reason: **\`$replaceText[$replaceText[$checkCondition[$message[2]==];true;None];false;$message[2]]\`**]
$footer[$randomText[Note- Softban is same like kick;Tip- It is mostly used by mods for deleting user messages when they break rules instead of kicking them]]
$onlyPerms[ban;You need \`ban\` permission] 
$color[$getServerVar[color]]
$channelSendMessage[$getServerVar[logchannel];{title::hammer: | New Case: SOFTBAN}{description:
**Actioned by**
<@$authorID>

 **Target**
$findUser[$message[1]] [<@$findUser[$message[1]]>]

**Reason**
**\`$replaceText[$replaceText[$checkCondition[$message[2]==];true;None];false;$message[2]]\`**

Date:
> $day $month $year}{color:$getServerVar[color]}]
$onlyIf[$findUser[$message[1]]!=$authorID;**⛔ - You can't ban yourself (Or else, I couldn't find that user)**]
$onlyIf[$isBanned[$findUser[$message[1]]]==false;**⛔ - This user has already been banned on this server**]
$onlyIf[$message!=;**⛔ - Please specify the user you want to ban. Correct usage:** \`$getServerVar[prefix]ban <@User> [Reason\\]\`]
$onlyPerms[ban;**⛔ - To use this you require the \`BAN_MEMBERS\` permission**]
$onlyBotPerms[ban;**⛔ - I don't have enough perms to execute this command. Permissions missing:** \`BAN_MEMBERS\`]
`
})

bot.command({
 name: "unban",
 code: `
$sendDM[$findUser[$message];{title:▸ 🔧┇Unban} {description::rotating_light: Your ban has been removed on the server \`$serverName[$guildID]\`}{color:4bcb30}{timestamp:ms}]
$unban[$message[1];By $userTag[$authorID] Reason:$messageSlice[1]]
$channelSendMessage[$channelID;{author: 🔧Unban🔧} {description: 👤** __ID__ **:
\`$username[$message]\` (**$message**)
👮 **__ By__**:
<@$authorID>}{color:4bcb30}{footer:$username:$authorAvatar} {timestamp:ms}]
$onlyBotPerms[ban; {title:▸ :cross:┇ERROR} {description: :alert: The bot does not have sufficient permissions to do this}{footer:$username:$authorAvatar}{color: ff1000}{delete:10s}{timestamp:ms}]
$onlyIf[$message!=;{title: ▸:cross: ┇ERROR} {description: Usage: \`$getServerVar[prefix] unban <ID>\`}{color: 4bcb30}{footer:$username:$authorAvatar} {timestamp:ms}{delete:10s}]
$onlyPerms[ban;{title: ▸:cross: ┇ERROR}{description::alert: You don't have sufficient permissions to do this}{footer:$username:$authorAvatar}{color:ff1000} {delete:10s}{timestamp}] `
});

bot.command({
 name: "kick",
 desc:"kick a user",
 cat: "moderator",
 usage: "kick <mention> (optional reason)",
 code: `$kick[$mentioned[1]]
$if[$mentioned[1]==]
Please mention someone
$elseIf[$message[2]==]
$author[$username[$mentioned[1]] was Kicked ;$userAvatar[$mentioned[1]]]
$description[
**Tag:** $userTag[$findUser[$message[1]]]
**Mention:** <@$findUser[$message[1]]>
**ID:** $findUser[$message[1]]]
 $addField[Kicked by:; $userTag[$authorID]]
$addField[Reason:; No Reason]
$color[RED]
$sendDM[$mentioned[1];You has been kicked from **$serverName** for: 
>>> **No Reason**]
$endelseIf
$elseIf[$message[2]==$message[2]]
$author[$username[$mentioned[1]] was Kicked;$userAvatar[$mentioned[1]]]
$description[
**Tag:** $userTag[$findUser[$message[1]]]
**Mention:** <@$findUser[$message[1]]>
**ID:** $findUser[$message[1]]]
 $addField[**Kicked by:**; $userTag[$authorID]]
$addField[**Reason:**; $noMentionMessage]
$color[RED]
$sendDM[$mentioned[1];You has been kicked from **$serverName** for:  
>>> **$noMentionMessage**]
$endelseIf
$endif

$onlyIf[$findUser[$message[1]]!=$clientID;❌I can't kick my self!]
$onlyIf[$findUser[$message[1]]!=$authorID;❌You can't kick yourself!]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];❌You can't kick someone with higher or the same roles as you]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];❌I can't kick someone with higher or the same roles as me]
$onlyIf[$memberExists[$findUser[$message[1]]]==true;❌Couldn't find a member with this ID/name/mention in the server]
$onlyIf[$findUser[$message[1]]!=$ownerID;❌I can't modify the server owner]
$onlyBotPerms[kick;❌ The bot doesn't have enough permissions!]
$onlyPerms[kick;❌You don't have enough permission!]`
}) 

bot.command({
    name: "purge",
    code: `

$deleteIn[30s]
$botTyping
$color[#$random[0;999999]]
$clear[100;$mentioned[1]] 
$title[***Chat Cleared!***]
$description[$username cleared ($username[$mentioned[1]]) messages from chat]
$footer[$username;$authorAvatar] 
$addTimestamp 
$argsCheck[>1;> Mention a user to purge their messages!]
$suppressErrors[{title:Discord Limitation/Permissions}{description:Because of Discord ToS i can't purge 2 week older messages or I don't have permission to \`manage messages\`}{footer:You can “aqa nuke” also if there are older messages}{color:#ebd915}]
$onlyPerms[managemessages;> You don't have permission to use this command ]
`})

bot.command({
 name: "instanuke",
 code: `
 $djsEval[
 d.message.channel.clone()
 .then(c => {
 d.message.channel.delete()
 c.setPosition(d.message.channel.position)
 c.send(d.message.author.tag + ' nuked this channel! https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831')

 })
 .catch(() => d.message.channel.send('I dont have enough perms'))
]
$cooldown[10s;Wait few seconds before nuking channels again!]
$onlyPerms[managechannels;{title:Missing permissions!} {description:You are missing the \`MANAGE_CHANNELS\` permission which is needed to run this command} {color:RANDOM}]`
}) 

bot.command({
name:"nuke",
category:"Mod",
explanation:"Deletes and re-creates the channel. If no channel is specified, then the current channel is nuked.",
bot:"Manage Channels",
user:"Manage Channels",
usage:"nuke [channel]",
example:"nuke",
explain:"Nukes the current channel.",
code:`$reactioncollector[$splittext[1];$authorid;1m;✔️,❌;confirm,deny;{description:Time up!}{delete:2s}]
$textsplit[$sendmessage[{author:Petition to nuke a channel!}{description:<@$authorid>, are you sure that you want to nuke <#$findchannel[$message;yes]>? 
React with ✔️ to confirm
React with :x: to deny}{color:RANDOM}{footer:If you confirm, $channelname[$findchannel[$message;yes]] will be deleted and recreated with all same permissions};yes]; ]
$setservervar[nc;$findchannel[$message;yes]]
$onlybotperms[managechannels;Permissions I require the given permissions for the execution of this command#COLON# \`Manage Channels\`. Permissions not granted, execution cancelled.]
$onlyperms[managechannels;{description:Permissions required for execution of the command#COLON# \`Manage Channels\`. You do not have the necessary permissions!}{color:FF0000}]`})
 
bot.awaitedCommand({
name:"confirm",
code:`$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was nuked!:$authoravatar}{description:<@$authorid> nuked the channel with the name $channelname, and the new created channel was <#$splittext[1]>!}{color:FF0000}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$channelsendmessage[$splittext[1];{image:https#COLON#//media2.giphy.com/media/oe33xf3B50fsc/200.gif}{author:Nuked by $usertag!:$authoravatar}{color:FF0000}{timestamp};no]
$wait[1s]
$deletechannels[$getservervar[nc]]
$textsplit[$clonechannel[$getservervar[nc];yes]; ]`})

bot.awaitedCommand({
name:"deny",
code:`Nuke cancelled! :sweat_drops:`})

bot.command({
name:"slowmode",
code:`
$if[$message==$message]
$slowmode[$channelID;$splitText[1]$splitText[2]]
> New slowmode set to \`$splitText[1]$splitText[2]\`
$onlyIf[$isNumber[$splitText[1]]==true;Put a valid number before the **/** !]
$onlyIf[$checkContains[$toLowercase[$splitText[2]];s;m;h]==true;After the **/** just use s, m or h! 
\`\`\`
Ex: $getServerVar[prefix] slowmode 1/s 
\`\`\`]
$onlyPerms[managechannels;Without permission]
$textSplit[$message;/]
$elseIf[$message==remove]
$slowmode[$channelId;0s]
\`\`\`
Slowmode removed!
\`\`\`
$onlyPerms[managechannels;Without permission]
$endelseIf
$endIf
`
})

bot.command({
name: "temp-mute",
aliases:["temp-Mute","tempMute","tmute"],
code: `
$setTimeout[$message[1];
author: $authorID
userID: $findUser[$messageSlice[1];no]
role: $getServerVar[muterole]]

$sendMessage[<@!$authorID> has silenced <@!$findUser[$messageSlice[1];no]> for $message[1];no]
$giveRole[$findUser[$message;no];$getServerVar[muterole]]
$sendDM[$findUser[$messageSlice[1];no];You have been muted in **$serverName**, by \`$userTag[$authorID]\` for __$message[1]__]
$channelSendMessage[$getServerVar[logchannel];{title::hammer: | New Case: MUTE}{description:
**Actioned by**
<@$authorID>

 **Target**
$findUser[$message[1]] [<@$findUser[$message[1]]>]

**Reason**
**\`$replaceText[$replaceText[$checkCondition[$message[2]==];true;None];false;$message[2]]\`**}{color:$getServerVar[color]}]

$onlyIf[$highestRole[$authorID]>$role[$highestRole[$findUser[$messageSlice[1];no]];position];:x: This user has a rank equal to or higher than yours! Ask someone of greater power to do this]
$onlyIf[$hasRole[$findUser[$messageSlice[1];no];$getServerVar[muterole]]==false;:x: The user is already muted!]
$onlyIf[$memberExists[$findUser[$messageSlice[1];no];$guildID]==true;:x:
User was not found]
$onlyIf[$findUser[$messageSlice[1];no]!=$authorID;:x: You cannot silence yourself!]
$onlyIf[$findUser[$messageSlice[1];no]!=$ownerID;:x: I can't silence the owner]
$onlyIf[$findUser[$messageSlice[1];no]!=undefined;:x: Mention or enter the ID of the person you want to mute]
$onlyIf[$checkContains[$toLowercase[$message[1]];s;m;h;d;w]==true;:x: An error has occurred over time, please check that you have spelled it correctly!]
$onlyIf[$isNumber[$cropText[$message[1];$math[$charCount[$message[1]]-1]]]==true;:x: An error has occurred over time, please check that you have spelled it correctly!]
$onlyIf[$math[$charCount[$message[1]]-1]!=0;:x: An error has occurred over time, please check that you have spelled it correctly!]
$onlyIf[$message[1]!=;:x: Please set the time!]
$onlyIf[$getServerVar[muterole]!=;:x: There is no defined role!.Set it by \`$getServerVar[prefix] set-mute @role\`!]
$onlyPerms[manageroles;:x: You don't have enough permissions!]
`});

bot.timeoutCommand({
code: `$takeRole[$timeoutData[userID];$timeoutData[role]]
$sendDM[$timeoutData[userID];Now you can rewrite to __$serverName__]
`});

bot.command({
 name: "set-mute",
 code: `
$setServerVar[muterole;$mentionedRoles[1]] 
> Set Mute Role to <@&$mentionedRoles[1]>
$argsCheck[>1;Please mention a role muted] 
$onlyPerms[manageroles;You need manage roles permission]
`
});

bot.command({
 name: "poll",
 code: `
 $title[📊•New Poll!]
 $color[DEB008]
 $addField[2️⃣ Option 2;\`$splitText[3]\`]
 $addField[1️⃣ Option 1;\`$splitText[2]\`]
 $addField[❔ Question;\`$splitText[1]\`]
 $footer[Poll by $username | $authorID;$authorAvatar]
 $addReactions[1️⃣;2️⃣]
 $deletecommand
 $onlyPerms[managemessages;:x: **You require \`Manage Messages\` permissions to use that!**]
 $textSplit[$noMentionMessage;/]
 $argsCheck[>1;:x: **Invalid Usage! \`aqa question/option 1/option 2\`**]
 `
})

bot.command({
  name: "unlock", 
  code: `$color[02FFCF]
$modifyChannelPerms[$channelID;+sendmessages;$guildID]
$title[🔓Channel Unlocked]
$description[<#$channelID> has been **unlocked** by ** $username **
Reason: $message]
$footer[Now,you can chat!]
$deletecommand 
$onlyPerms[manageserver;❌You can't do that \`manage_server\` perm needed! {delete:3s}]
`
})

bot.command({
  name: "lockdown",
  aliases: ['lock'], 
  code: `$color[02FFCF]
$modifyChannelPerms[$channelID;-sendmessages;$guildID]
$title[🔒Channel on Lockdown]
$description[<#$channelID> has been put under **lockdown** by **$username**
**Only Mods/Admins can talk until unlocked.**
Reason: $message]
$footer[Sorry for the inconvenience!]
$deletecommand 
$onlyPerms[manageserver;❌ You can't do that \`manage_server\` perm needed! {delete:3s}]
`
})

bot.command({
name: "lockall",
aliases: ['lock all', 'lockdown all'], 
code: `
$forEachGuildChannel[lockall]
$color[daace3]
$description[:dw_warning: Successfully Lcoked All Channels]
$onlyPerms[manageserver;{description:**You are missing \`MANAGE_SERVER\` perm!**}{color:ff0000}{delete:60s}]
$onlyBotPerms[manageserver;embedlinks;externalemojis;addreactions;**Error**
\`\`\`kt
Error Type: Missing Perms
Make Sure I Have MANAGE_SERVER, EMBED_LINKS, EXTERNAL_EMOJIS, ADD_REACTIONS Perms!
\`\`\`]
$suppressErrors[{description:An error occurred, run \`$getServerVar[prefix] report\` if this happen again...}{color:ff0000}]
`
});

bot.awaitedCommand({
name: "lockall",
code: `
$modifyChannelPerms[$channelID;-sendmessages;$guildID]
$suppressErrors
`
}); 

bot.command({
name:"viewlock",
aliases:"vl",
category:"Mod",
explanation:"Disable reading messages for the specified role/user or the guild. Only executable by someone with the manage channels permissions.",
user:"Manage Channels",
bot:"Manage Channels",
usage:"viewlock [role/user]",
example:"viewlock bot-users",
explain:"View-locks the channel for the role **bot-users**. If it is a user, then it is view-locked for a user, else for the guild.",
code:`$if[$memberexists[$findmember[$message[1];no]]==true]
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-locked for a user!:$authoravatar}{description:<@$authorid> view-locked <#$channelid>, for the __user__ <@$findmember[$message[1];no]>!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:FF0000}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$modifychannelperms[$channelid;-viewchannel;$findmember[$message[1];no]]
View-locked the channel **$channelname** for the __user__ **$usertag[$findmember[$message[1];no]]**
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$highestrole[$findmember[$message[1];no]]]];{description:The user is **above/equal to me** in position of roles!}{color:FF0000}]
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$authorid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$highestrole[$findmember[$message[1];no]]]];{description:The user is **above/equal to you** in position of roles!}{color:FF0000}]
$elseif[$roleexists[$findrole[$message]]==true]
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-locked for a role!:$authoravatar}{description:<@$authorid> view-locked <#$channelid>, for the __role__ <@&$findrole[$message]>!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:FF0000}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$modifychannelperms[$channelid;-viewchannel;$findrole[$message]]
View-locked the channel **$channelname** for the __role__ **$rolename[$findrole[$message]]**
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$findrole[$message]]];{description:The role is **above/equal to me** in position!}{color:FF0000}]
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$findrole[$message]]];{description:The role is **above/equal to you** in position!}{color:FF0000}]
$endelseif
$else
$modifychannelperms[$channelid;-viewchannel;$guildid]
View-locked the channel **$channelname** for __the whole server__!
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-locked for the guild!:$authoravatar}{description:<@$authorid> view-locked <#$channelid>, for the __whle guild__!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:FF0000}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$endif
$onlybotperms[managechannels;{description:I do not have the required permissions! Required permissions#COLON# \`Manage Channels\`}{color:FF0000}]
$onlyperms[managechannels;{description:You do not have the permission \`Manage Channels\` to execute this!}{color:FF0000}]`})

bot.command({
name:"viewunlock",
aliases:"vul",
category:"Mod",
explanation:"Enable reading messages for the specified role/user or the guild. Only executable by someone with the manage channels permissions.",
user:"Manage Channels",
bot:"Manage Channels",
usage:"viewunlock [role/user]",
example:"viewunlock bot-users",
explain:"View-unlocks the channel for the role **bot-users**. If it is a user, then it is view-unlocked for a user, else for the guild.",
code:`$if[$memberexists[$findmember[$message[1];no]]==true]
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-unlocked for a user!:$authoravatar}{description:<@$authorid> view-unlocked <#$channelid>, for the __user__ <@$findmember[$message[1];no]>!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:GREEN}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$modifychannelperms[$channelid;+viewchannel;$findmember[$message[1];no]]
View-unlocked the channel **$channelname** for the __user__ **$usertag[$findmember[$message[1];no]]**
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$highestrole[$findmember[$message[1];no]]]];{description:The user is **above/equal to me** in position of roles!}{color:FF0000}]
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$authorid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$highestrole[$findmember[$message[1];no]]]];{description:The user is **above/equal to you** in position of roles!}{color:FF0000}]
$elseif[$roleexists[$findrole[$message]]==true]
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-unlocked for a role!:$authoravatar}{description:<@$authorid> view-unlocked <#$channelid>, for the __role__ <@&$findrole[$message]>!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:GREEN}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$modifychannelperms[$channelid;+viewchannel;$findrole[$message]]
View-unlocked the channel **$channelname** for the __role__ **$rolename[$findrole[$message]]**
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$findrole[$message]]];{description:The role is **above/equal to me** in position!}{color:FF0000}]
$onlyif[$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;1];false;$roleposition[$highestrole[$clientid]]]<$replacetext[$replacetext[$checkcondition[$authorid==$ownerid];true;2];false;$roleposition[$findrole[$message]]];{description:The role is **above/equal to you** in position!}{color:FF0000}]
$endelseif
$else
$modifychannelperms[$channelid;+viewchannel;$guildid]
View-unlocked the channel **$channelname** for __the whole server__!
$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:A channel was view-unlocked for the guild!:$authoravatar}{description:<@$authorid> view-unlocked <#$channelid>, for the __whle guild__!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:GREEN}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$endif
$onlybotperms[managechannels;{description:I do not have the required permissions! Required permissions#COLON# \`Manage Channels\`}{color:FF0000}]
$onlyperms[managechannels;{description:You do not have the permission \`Manage Channels\` to execute this!}{color:FF0000}]`})
 
bot.command({
 name: "createchannel",
 aliases: ["cc"],
 prefix: "$getServerVar[prefix]",
 code: `
 $addField[Channel type;$message[2];yes]
 $addField[Channel name;$message[1];yes]
 $addField[Created by;$username;yes]
 $color[$getServerVar[color]]
 $description[You may find the details below.]
 $title[Channel created successfully]
 $createChannel[$message[1];$toLowercase[$message[2]];no;$message[3]]
 $argsCheck[<3;{title::x: Command failed!}{description:Please use the correct number of arguments!
 
 \`$getServerVar[prefix]createchannel (name) (text or voice) (category ID)\`}{color:$getServerVar[color]}]
 $onlyPerms[managechannels;{title::x: Command failed!}{description:User who ran the command does not have the \`Manage Channels\` permission.}{color:$getServerVar[color]}]
 $suppressErrors[{title::x: Command failed!}{description: Invalid arguments! Make sure to use the format below:
 
 \`$getServerVar[prefix]createchannel (name) (type) (category ID)\`}{color:$getServerVar[color]}]
 $cooldown[5s;{title::x: Rate limited!}{description: Please try again in $toLowercase[%time%]!}{color:$getServerVar[color]}]
`
})
//////////////////////////////////////////////////////////

bot.readyCommand({
channel: "000000000000000000",
code: ` $title[Online]
$description[$customEmoji[dawn_online] I'm online and ready to serve!
**__QUOTE__**
“$jsonRequest[https://api.fc5570.ml/quote;quote]”

**Author**- $jsonRequest[https://api.fc5570.ml/quote;author]]
$footer[Updates/Fixing • NeeL]
$addTimestamp
$color[RANDOM]
$log[Ready on $userTag[$clientID] | Proudly Developed by DAWN DEVELOPMENT™ Team!]
$log[─────────────────────   ──────────────────] 
$log[ █▀▀█ █▀▀█ █░▒█ █▀▀█     █▀▄▀█ █▀▀▀█ █▀▀▄
 █▄▄█ █░▒█ █░▒█ █▄▄█     █▒█▒█ █░░▒█ █░▒█
 █░▒█ ▀▀█▄ ▀▄▄▀ █░▒█     █░░▒█ █▄▄▄█ █▄▄▀] 
$log[─────────────────────   ──────────────────]`
})

bot.command({
    name: "ping",
    code: `
$title[🏓Pong!]
$image[attachment://ping.jpg]
$attachment[https://falsiskremlin.sirv.com/resim_2020-11-28_113400.png?text.0.text=$ping%20ms&text.0.position.x=-10%25&text.0.position.y=-25%25&text.0.size=60&text.0.color=ffffff&text.0.font.family=Play&watermark.0.image=%2FImages%2Fresim_2020-11-28_113954.png&watermark.0.position.x=-35%25&watermark.0.scale.width=200&watermark.0.scale.height=200;ping.jpg]
$footer[📶Latency]
$author[$username] 
$cooldown[5s;Recently ping command was used! wait %time% to use again!]
$color[ffdbac]`
}) 


bot.command({
    name: "dm",
    aliases: "message",
    code: `
$channelSendMessage[$channelID;> $username,Message sent successfully!]
$dm[$mentioned[1]]
$title[Message from $username from **$serverName[$guildID]**]
$description[
—————————«🔹»—————————

**Message:** *$noMentionMessage*

—————————«🔹»—————————]
$footer[If found abuse/inappropriate usage of this command,please contact bot owner(NeeLz_Official#5794)/your server owner]
$color[#f0fff9]
$cooldown[35s;❌ STOP SPAMMING DM'S!]
$onlyIf[$isUserDMEnabled[$mentioned[1]]==true;$username[$mentioned[1]]'s DMs aren't enabled!]
$suppressErrors[> Mention Someone]`
})

/////Levelling System/////

//Code 1: Set Levelling
bot.command({
name:"set-levelling",
aliases:"levelling",
usage:"set-levelling (reset/<optional channel> <optional message>)",
description:"Set your levelling. If no message is specified, the original message is sent.",
category:"Levelling",
code:`$if[$message==reset]
$setservervar[levelling;false]
I successfully reset levelling for this server!
$else
$setservervar[levelling;true]
$setservervar[level_channel;$findchannel[$message[1]]]
$setservervar[level_msg;$replacetext[$replacetext[$checkcondition[$message[2]==];true;$getservervar[level_msg]];false;$nomentionmessage]]
Levelling system successfully set up! If you did not use any place holders, and want to use them, check below ->
>>> {user.name} -> $username
{user.mention} -> <@$authorid>
{level} -> 1
$onlyif[$mentionedchannels[1]!=;Could not find the channel or you didn't mention it!]
$endif
$onlyperms[manageserver;Not enough permissions! You need manage server permissions to execute this!]`})
 
 
//Code 2: Level Roles
bot.command({
name:"level-role",
aliases:"lrole",
category:"Levelling",
usage:"lrole add/remove <level> <role>",
description:"Add a level up role!",
code:`$if[$message[1]==add]
$setservervar[level_order;$getservervar[level_order]$message[2]/]
$setservervar[level_roles;$getservervar[level_roles]$findrole[$messageslice[2]]/]
I successfully added $rolename[$findrole[$messageslice[2]]] to the level \`$message[2]\`
$onlyif[$isnumber[$message[2]]==true;Not a valid number!]
$argscheck[>2;Enter atleast 3 arguments! $getservervar[prefix]lrole <add/remove> <level> <role>]
$elseif[$message[1]==remove]
$setservervar[level_order;$replacetext[$getservervar[level_order];$message[2]/;;1]]
$setservervar[level_roles;$replacetext[$getservervar[level_roles];$splittext[$findtextsplitindex]/;;1]]
I successfully removed the role of the level \`$message[2]\`
$onlyif[$findtextsplitindex[$message[2]]!=0;Could not find the role!]
$textsplit[$getservervar[level_order];/]
$endelseif
$else
Use either \`add\` or \`remove\`!
$endif
$onlyperms[manageserver;Not enough permissions!]`})
 
//Code 3: Level Message
bot.command({
name:"level-message",
aliases:"lmsg",
category:"Levelling",
usage:"lmsg add/remove <role> <message>",
description:"Add a custom level up message for a specific level!",
code:`$if[$message[1]==add]
$setservervar[level_morder;$getservervar[level_morder]$message[2]/]
$setservervar[level_msges;$getservervar[level_msges]$messageslice[2]/]
I successfully added the message **$messageslice[2]** to the level \`$message[2]\`
$argscheck[>2;Enter atleast 3 arguments! $getservervar[prefix]lmsg <add/remove> <level> <message>]
$elseif[$message[1]==remove]
$setservervar[level_morder;$replacetext[$getservervar[level_morder];$message[2]/;;1]]
$setservervar[level_msges;$replacetext[$getservervar[level_msges];$advancedtextsplit[$getservervar[level_msges];/;$findtextsplitindex[$message[2]]]/;;1]]
I successfully removed the role of the level \`$message[2]\`
$textsplit[$getservervar[level_morder];/]
$onlyif[$findtextsplitindex[$message[2]]!=0;Could not find the level!]
$endelseif
$else
Use either \`add\` or \`remove\`!
$endif
$onlyif[$isnumber[$message[2]]==true;Not a valid number!]
$onlyperms[manageserver;Not enough permissions!]`})
 
//Code 4: Rank
bot.command({
name:"rank",
aliases:"level",
category:"Levelling",
description:"Check the rank of a user.",
usage:"rank <optional user>",
code:`$if[$message==]
$author[Rank of $usertag[$get[user]];$authoravatar]
$image[attachment://rank_card.jpg]
$attachment[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$get[user]]; ;+;-1]&avatar=$userAvatar[$get[user]]?size=4096&level=$getUserVar[rank;$get[user]]&rank=&currentxp=$getUserVar[exp;$get[user]]&nextlevelxp=$getUserVar[req;$get[user]]&previouslevelxp=0&custombg=$getUserVar[level_card]&xpcolor=00FF00&isboosting=false;rank_card.jpg]
$color[RANDOM]
$addtimestamp
$let[user;$authorid]
$else
$suppresserrors
$addtimestamp
$color[RANDOM]
$author[Rank of $usertag[$get[user]];$authoravatar]
$image[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$get[user]]; ;+;-1]&avatar=$userAvatar[$get[user]]?size=4096&level=$getUserVar[rank;$get[user]]&rank=&currentxp=$getUserVar[exp;$get[user]]&nextlevelxp=$getUserVar[req;$get[user]]&previouslevelxp=0&custombg=$getUserVar[level_card]&xpcolor=#00FF00&isboosting=false]
$let[user;$replacetext[$replacetext[$checkcondition[$findMember[$djseval[message.guild.members.fetch().then(a => a.find(x =>x.user.username.toLowerCase().includes('$message'.toLowerCase())).user.id);yes];no]==undefined];true;$findmember[$message;yes]];false;$findMember[$djseval[message.guild.members.fetch().then(a => a.find(x =>x.user.username.toLowerCase().includes('$message'.toLowerCase())).user.id);yes];no]]]
$endif
$onlyif[$getservervar[levelling]==true;The levelling system is disabled!]`})
 
//Code 5: Levelling Card
bot.command({
name:"set-card",
aliases:"card",
description:"Set a custom rank card!",
usage:"set-card <link>",
category:"Levelling",
code:`$setuservar[level_card;$message]
$description[Successfully set your rank card! Preview below!]
$image[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$get[user]]; ;+;-1]&avatar=$userAvatar[$get[user]]?size=4096&level=$getUserVar[rank;$get[user]]&rank=&currentxp=$getUserVar[exp;$get[user]]&nextlevelxp=$getUserVar[req;$get[user]]&previouslevelxp=0&custombg=$getUserVar[level_card]&xpcolor=00FF00&isboosting=false]
$let[user;$authorid]
$cooldown[$replacetext[$replacetext[$isvalidlink[$message];true;1d];false;1s];Wait for a %time% to set this again!]
$onlyif[$isvalidlink[$message]==true;Not a valid link!]`})

//Code 6: Always reply
bot.command({
name:"$alwaysExecute",
code:`$suppresserrors
$giverole[$authorid;$advancedtextsplit[$getservervar[level_roles];/;$findtextsplitindex[$getuservar[rank]]]]
$textsplit[$getservervar[level_order];/]
$setuservar[rank;$sum[$getuservar[rank];1]]
$setUserVar[req;$truncate[$sum[$getuservar[req];$math[$getuservar[req]*1/2]]]]
$setuservar[exp;0]
$channelsendmessage[$replacetext[$replacetext[$checkcondition[$getservervar[level_channel]==];true;$channelid];false;$getservervar[level_channel]];<@$authorid>{author:$usertag levelled up!:$authoravatar}{thumbnail:$authoravatar}{timestamp}{description:$replacetext[$replacetext[$replacetext[$get[msg];{user.name};$username];{user.mention};<@$authorID>];{level};$sum[$getUserVar[rank];1]]}{color:BLUE}]
$let[msg;$getservervar[$replacetext[$replacetext[$checkcondition[$findtextsplitindex[$sum[$getuservar[rank]];]==0];true;level_msg];false;level_msges]]]
$textsplit[$getservervar[level_morder];/]
$onlyIf[$getUserVar[exp]>=$getUserVar[req];]
$onlyif[$getservervar[levelling]==true;]
$suppresserrors`})
 
 
//Code 7: Always Reply
bot.command({
name:"$alwaysExecute",
code:`$setUserVar[exp;$sum[$getUserVar[exp];$random[4;8]]]
$cooldown[7s]
$onlyif[$getservervar[levelling]==true;]`})
 
 
bot.command({
 name: "rankboard",
 aliases: "top",
 code: `
$deletecommand
$title[**__$serverName[$guildID]'s__** Levelling Leaderboard]
$description[
$replaceText[$replaceText[$replaceText[$userLeaderBoard[rank;asc;⟨{top}⟩ 🏅 {username} : {value}];⟨1⟩ 🏅; ⟨1⟩ 🥇 ]
;⟨2⟩ 🏅;⟨2⟩ 🥈];⟨3⟩ 🏅;⟨3⟩ 🥉] 
]
$footer[$randomText[Tip- Chat more to be on top;Tip- Don't spam to be on top through;Tip- Follow server rules and keep the chat safe!;Do you know that you can invite me by $getServerVar[prefix] invite!]]
$thumbnail[$authorAvatar]
$addTimestamp  
`
});
 
/////////////////////////////////////////////////////////////////////////////////////////
/////Bot Owner Commands/////
bot.command({
 name: "destroy",
 code: `
 $djsEval[const Discord = require('discord.js')
 setTimeout(() => {client.destroy()}, 3000)
 let clown = new Discord.MessageEmbed()
 .setTitle('> Turning bot off in \`3 seconds...\`')
.setColor('RED')
 message.channel.send(clown)]
 
$onlyForIDs[000000000000000001;Only my owner can use this command!]
`
}) 
 
bot.command({
name:"reboot",
code: `
$djsEval[setTimeout(() => {process.exit()}, 3000)]
$title[Rebooting!]
$description[> Bot is going to restart in 3 seconds.]
$footer[Note- Bot may not respond for some secs after that all will be normal again!]
$color[GREEN]
$addCmdReactions[✅]
$onlyForIDs[000000000000000001;You are not allowed to use this command.] 
$cooldown[30s;> ⚠ Bot can crash,after %time% you can run the command again!]`
}) 

bot.command({
 name: "eval",
 code:`
$eval[$message]
$onlyForIDs[000000000000000001;000000000000000002;❌ Only for **Bot Owner**!]
 `
})

bot.command({
  name: "setbotname",
  aliases: ["set-bot-name"],
  code: `
    $title[Set the bot name to $message!]
    $setBotName[$message]
    $onlyForIDs[$botOwnerID;]
  `
})

bot.command({
 name: "djseval",
 code:`
$djsEval[$message]
$onlyForIDs[000000000000000001;000000000000000002;❌ Only for **Bot Owner**!]
 `
})

bot.command({
 name: "setstatus",
 code: `$setvar[status;$message]
 $title[Bot Status has Been Changed]
 $description[New Status: $message]
 $color[$getrolecolor[$highestrole[$clientID]]]
$onlyForIDs[000000000000000001;{title:Bot Owner Only}{color:BLACK}]`
})
////////////////////////////////////////////////////////////////////////////////////////

bot.command({
 name: "calculate",
 code: `
 $djsEval[
 try {
 const m = require('mathjs')
 const ans = m.evaluate('$message')
 d.message.channel.send('Answer is ' + ans)
 } catch {
 d.message.channel.send('Provide valid calculation!')
 }
 ]
 `
})

bot.command({
name: "clear",
code: `$clear[$message] I deleted $message message.
$deleteIn[3s]
$onlyPerms[managemessages;You need a “manage messages” perm.]
$onlyBotPerms[managemessages;I not have manage messages perm.]
`
})

bot.command({
    name: "support",
    aliases: ["invite" , "donate"] , 
    code: ` $title[SUPPORT]
$color[ff6347]
$description[
😿 Want to add me in your server?
**[My Invite Link](https://discord.com/oauth2/authorize?client_id=790043677225385985&scope=bot%20applications.commands&permissions=2147483647)**

🥺 Want to support/donate us?
**[Donation Link](https://ko-fi.com/dawndevs)**

🆘 Wanna join our ~~dead~~ Cool support server?
**[Support Server link](https://discord.gg/GkXGcQ8Tkh)**
]
$footer[Join Us $username!]
$addTimestamp
$addCmdReactions[💛]
` 
})

bot.command({
 name: "botinfo", 
 aliases: ['botstats','stats'],
 description: "Check the bot's information/stats",
 usage: "",
 category: "information",
 code: `$title[$username[$clientID] Stats]
 $color[GREEN]
 $thumbnail[$userAvatar[$clientID]]
$description[ 
> 🤖**__Bot Info__**
▪︎ Name: \`$username[790043677225385985]\`
▪ ID: \`$clientID\`
▪ Birthday: \`$creationDate[$clientID]\`
▪︎ Owner: “**\`$userTag[$botOwnerID]\`**”
▪︎ Prefix: "**\`$getServerVar[prefix]\`**"
▪︎ Total Commands: **\`$commandsCount\`**
▪︎ Latency: **\`$botPingms\`**
▪︎ Uptime: **\`$uptime\`**
▪︎ Servers: **\`$serverCount\`**
▪︎ Users: **\`$allMembersCount\`**
▪ Each server users average: **\`$numberseparator[$truncate[$divide[$allmemberscount;$servercount]];,]\`**
▪︎ RAM Usage: **\`$ram MB\`**
▪︎ Memory Usage: **\`$djsEval[process.memoryUsage().rss / 1024 / 1024;yes] MB\`**

> $customEmoji[dawn_cpu]**__CPU Info__**
▪︎ CPU Usage: **\`$cpu%\`**
▪︎ CPU Model: **\`$djsEval[require ('os').cpus()[0].model;yes]\`**
▪︎ CPU Platform: **\`$djsEval[require ('os').platform();yes]\`**

> $customEmoji[dawn_botversion]**__Package Info__**
▪︎ Aoi.js: **\`v$packageVersion\`**
▪︎ Node.js: **\`$nodeVersion\`**
]
 
 $addTimestamp
 $cooldown[5s;{description:A bit too fast there. Wait for **%time%**!}{color:GREEN} ]`
 })

bot.command({
 name: "enable-suggest",
 code: ` 
$setServerVar[suggest_system;true]
Enabled! 
$onlyPerms[manageserver;You need manage server permissions]`
 })

bot.command({
 name: "disable-suggest",
 code: `
$setServerVar[suggest_system;no]
Disabled!
$onlyPerms[manageserver;You need manage server permissions]`
 })
 
 bot.command({
 name: "set-suggest-channel",
 code: `
$setServerVar[suggestchannel;$mentionedChannels[1]] 
Set suggest channel to <#$mentionedChannels[1]> 
$argsCheck[>1;Please mention a channel] 
$onlyPerms[manageserver;You need manage server permission]
$onlyIf[$getServerVar[suggest_system]==true;Suggest system is not enabled!]
`
 })

bot.command({
 name: "suggest",
 code: `
 $useChannel[$getServerVar[suggestchannel]]
 $title[**New Suggestion!**]
 $description[
**Username**: $username[$authorID]
Suggestion: **$message**]
 $color[RANDOM]
 $footer[✔ Like it / ❌  Didn't like it]
 $thumbnail[$userAvatar[$authorID]]
 $addCmdReactions[✔]
 $addReactions[✔;❌] 
$onlyIf[$getServerVar[suggestchannel]!=;This server has no suggest channel run **<setsuggestchannel** to set one!]
$onlyIf[$getServerVar[suggest_system]==true;Suggest system is not enabled!]

 `
 })
 
bot.command({
     name : "report",
     code : `
     $channelSendMessage[$channelID; > Your Report has been sent successfully!.Thanks for reporting]

$useChannel[000000000000000000]
$title[AQUA MoD Report Received]
$description[
**Username:** *$username#$discriminator[$authorID]*
**UserID:** \`$userID[$username]\`
**Server:** **$serverName[$guildID]**
**ServerID:** \`$guildID\`
**Channel-ID:** \`$channelID\`
**Server Link**: $getServerInvite[$guildID]

**Issue**: ***$message***]
$footer[Report Received]
$addTimestamp
$deletecommand
$cooldown[60m;NeeL is working on it.Please do not spam or you will be bot banned.Cooldown time left- **%time%**]
$addCmdReactions[‼️]
$color[93bdfc]`
 })
 
 bot.command({
 name: "afk",
 aliases: ["busy"],

 code: `
$setUserVar[AFK;$replaceText[$replaceText[$checkCondition[$splitText[1]==off];true;on];false;off]/$replaceText[$replaceText[$checkCondition[$message==];true;none];false;$message]]
$description[$replaceText[$replaceText[$checkCondition[$splitText[1]==on];true;Welcome back <@$authorID>!];false;<@$authorID> , You are now AFK.Do **\`$getServerVar[prefix] afk\`** to unafk again!

Reason: $replaceText[$replaceText[$checkCondition[$noMentionMessage==];true;none];false;$noMentionMessage]]]
$deleteIn[25s]
$footer[$username#$discriminator[$userID[$username]];$authorAvatar]
$addTimestamp
$color[RANDOM]
$setUserVar[time;$replaceText[$replaceText[$checkCondition[$splitText[1]==off];true;$dateStamp];false;]]
$changeNickname[$replaceText[$replaceText[$checkCondition[$ownerID==$authorID];true;$clientID];false;$authorID];$replaceText[$replaceText[$checkCondition[$splitText[1]==off];true;$replaceText[$replaceText[$checkCondition[$ownerID==$authorID];true;$username[$clientID]];false;⟨AFK⟩$nickname[$authorID]]];false;$replaceText[$replaceText[$checkCondition[$ownerID==$authorID];false;$username];true;$username[$clientID]]]]
$textSplit[$getUserVar[AFK];/]
$suppressErrors[> Give bot perms to **\`manage_nickname\`** and keep the bot above the role who wants to be afk so the member/owner nickname could be changed!]


`
})

bot.command({
 name: "$alwaysExecute",
 code: `


$onlyIf[$splitText[1]==on;]

$title[**AFK**]

$description[<@$mentioned[1;yes]> is AFK.

**REASON**:$splitText[2]]

$textSplit[$getUserVar[AFK;$mentioned[1]];/]

$addField[AFK FOR;$parseDate[$sub[$dateStamp;$getUserVar[time;$mentioned[1]]];time]]

$footer[$username#$discriminator[$userID[$username]];$authorAvatar]

$addTimestamp

$color[RANDOM]

$onlyIf[$checkContains[$message;<@$mentioned[1]>;<@!$mentioned[1]>]==true;]
$deleteIn[15s]
`,
nonPrefixed: true
})

bot.command({ 
    name: "remindme",
    aliases: ['reminder'],
    code: ` $channelSendMessage[$channelID;<@$authorID> 🔔 Reminder for **\`$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A message wasn't provided.];false;$messageSlice[1]]\`**]
$wait[$replaceText[$replaceText[$checkCondition[$noMentionMessage[1]==];true;24d];false;$noMentionMessage[1]]]
$channelSendMessage[$channelID; {title:Reminder Sucessfully Set}{description: 🔔 | $username[$authorID] Reminder Set ✅ for \`$replaceText[$replaceText[$checkCondition[$noMentionMessage[1]==];true;Undefined];false;$noMentionMessage[1]]\`

Message: \`$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]\`}{color:RANDOM}] $argsCheck[1>;Write Time to Remind You ,Max 24 Days]
$onlyIf[$message!=;Please enter the time to remind you!
> Use \`s\` for second, \`m\` for minute, \`h\` for hours!

Example- $getServerVar[prefix] remindme **10s** 
/or/
$getServerVar[prefix] remindme **10s** \`work\`]` 
})

/////Warn System/////

bot.command({
    name: "warn",
    code: `
$title[<:nxwarning:768457370811760642>WARNING!]
$description[<@$mentioned[1]> Has been Warned by <@$authorID>
Reason : $noMentionMessage]
$footer[AQUA Moderation]
$channelSendMessage[$getServerVar[logchannel];{title::hammer: | New Case: WARN}{description:
**Actioned by**
<@$authorID>

 **Target**
$findUser[$message[1]] [<@$findUser[$message[1]]>]

**Reason**
**\`$replaceText[$replaceText[$checkCondition[$message[2]==];true;None];false;$message[2]]\`**}{color:$getServerVar[color]}]
$deletecommand
$color[00FF00]
$setUserVar[warn;$sum[$getUserVar[warn;$mentioned[1]];1];$mentioned[1]]
$onlyIf[$findUser[$message[1]]!=$clientID;{description:I can't warn myself...rude!}{color:BLACK}]
$onlyIf[$findUser[$message[1]]!=$authorID;{description:You can't warn yourself!}{color:BLACK}]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];{description:You can't warn someone with higher or the same roles as you!}{color:BLACK}]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];{description:I can't warn someone with higher or the same roles as me!}{color:BLACK}]
$onlyIf[$memberExists[$findUser[$message[1]]]==true;{description:I can't warn someone with higher or the same roles as me!}{color:BLACK}]
$onlyIf[$message[1]!=;{description:Please mention a valid member!}{color:BLACK}]
$onlyIf[$getServerVar[logchannel]!=;This Server Has No Logging Channel! Set it by \`$getServerVar[prefix]setlogchannel (channel)\`]
$onlyBotPerms[managemessages;{description:I dont have permission to execute this command!}{color:BLACK}]
$onlyPerms[managemessages;{description:You dont have permission to execute this command!}{color:BLACK}]
$deletecommand
`
})

bot.command({
    name: "checkwarn",
    code: `
$deletecommand
$title[<:nx_checkwarn:768459108654776331>CHECK WARNINGS]
$description[<@$mentioned[1]> has **$getUserVar[warn;$mentioned[1]]** warnings!!]
$footer[Moderation Commands]
$color[$getServerVar[color]]  
$onlyIf[$findUser[$message[1]]!=$clientID;{description:I can't warn myself...rude!}{color:BLACK}]
$onlyIf[$findUser[$message[1]]!=$authorID;{description:You can't warn yourself!}{color:BLACK}]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];{description:You can't warn someone with higher or the same roles as you!}{color:BLACK}]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];{description:I can't warn someone with higher or the same roles as me!}{color:BLACK}]
$onlyIf[$memberExists[$findUser[$message[1]]]==true;{description:I can't warn someone with higher or the same roles as me!}{color:BLACK}]
$onlyIf[$message[1]!=;{description:Please mention a valid member!}{color:BLACK}]
$onlyBotPerms[managemessages;{description:I dont have permission to execute this command!}{color:BLACK}]
$onlyPerms[managemessages;{description:You dont have permission to execute this command!}{color:BLACK}]

`
})

bot.command({
    name: "removewarn",
    code: `
$title[<:nx_removewarn:768458687324880906>REMOVE WARNINGS]
$description[Removed $noMentionMessage Warning(s) from <@$mentioned[1]>!]
$footer[Moderation Commands]
$color[$getServerVar[$color]]
$setUserVar[warn;$sub[$getUserVar[warn];$noMentionMessage];$mentioned[1]] 
$onlyIf[$findUser[$message[1]]!=$clientID;{description:I can't warn myself...rude!}{color:BLACK}]
$onlyIf[$findUser[$message[1]]!=$authorID;{description:You can't warn yourself!}{color:BLACK}]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];{description:You can't warn someone with higher or the same roles as you!}{color:BLACK}]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];{description:I can't warn someone with higher or the same roles as me!}{color:BLACK}]
$onlyIf[$memberExists[$findUser[$message[1]]]==true;{description:I can't warn someone with higher or the same roles as me!}{color:BLACK}]
$onlyIf[$message[1]!=;{description:Please mention a valid member!}{color:BLACK}]
$onlyBotPerms[managemessages;{description:I dont have permission to execute this command!}{color:BLACK}]
$onlyPerms[managemessages;{description:You dont have permission to execute this command!}{color:BLACK}]
$suppressErrors[Some error occurred.If it happens again report it!]`
})

bot.command({
    name: "logchannel",
    aliases: ['setlogchannel'],
    code: `
    $setServerVar[logchannel;$mentionedChannels [1]]
    $description[Log channel set up successfully]
    $color[GREEN]
    $onlyIf[$mentionedChannels[1]!=;Mark channel!]
    $onlyPerms[manageserver; You do not have **\`manage_server\`** permission]`
})

/////////////////////////////////////////////////////////////////
bot.command({
  name: "dehoist",
  code: `
  $suppressErrors
  $if[$checkContains[$username[$mentioned[1]];!;/;.]==true]
    Successfully dehoisted $username[$mentioned[1]]!
    $changeNickname[$mentioned[1];$replaceText[$replaceText[$replaceText[$username[$mentioned[1]];!;;-1];/;;-1];.;;-1]]
  $elseif[$checkContains[$nickname[$mentioned[1]];!;/;.]==true]
    Successfully dehoisted $username[$mentioned[1]]!
    $changeNickname[$mentioned[1];$replaceText[$replaceText[$replaceText[$nickname[$mentioned[1]];!;;-1];/;;-1];.;;-1]]
  $argsCheck[>1;Mention a user to dehoist]
  $onlyPerms[managenicknames;You need the \`MANAGE_NICKNAMES\` permission in order to use this]
  $endelseif
  $endif
  `
})

bot.command({
 name: "modnick",
 aliases: ['mn'],
 code: `  
$changeNickname[$mentioned[1];Moderated_nickname$random[11;9999]]
> **$userTag[$findUser[$mentioned[1];no]]** now has a modnick!.You can mention him/her by <@$mentioned[1]> now!
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user has a higher role than you.**]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user has a higher than me**]
$onlyPerms[managenicknames;{description:You need \`MANAGE_NICNAME\` permission}{footer: This will automatically change mentioned name to a mentionable name}]

$deleteIn[30s]
 
 `
 }) 
 
bot.command({
name: "setnick",
code: `
> Nickname changed successfully of **$userTag[$findUser[$mentioned[1];no]]**!
$changeNickname[$findUser[$message[1]];$messageSlice[1]]
$if[$message[2]==]
$changeNickname[$findUser[$message[1]];$username[$findUser[$message[1]]]]
$endif
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user has a higher role than you.**]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user has a higher than me**]
$onlyPerms[managenicknames;{description:You need \`Manage_nicknames\` permissions!}{footer:If you don't give any text it will reset the nickname!}]
$argsCheck[>1;> First mention the user then set a nickname!]
$suppressErrors[Nickname reset **successfully**]`
})
 
bot.command({
 name: "addrole",
 code: `
 $title[Success!]
 $description[Successfully gave $username[$mentioned[1]] the role <@&$roleID[$nomentionmessage]>]
 $footer[Role given by $username;$authoravatar]
 $onlyPerms[manageroles;To think you can use this command without \`ManageRoles\` perms, you must be either a troll or an idiot]
 $color[RANDOM]
 $giverole[$mentioned[1];$roleID[$nomentionmessage]]
 $argsCheck[>2;Hey, do you really think you can give someone a role without mentioning them or specifying the role name?]
 $argsCheck[>1;Hey, do you really think you can give someone a role without mentioning them or specifying the role name?]
 $suppressErrors[An error occurred while giving the role]`
})

bot.command({
name:"massgiverole",
aliases:"role-everyone",
category:"Mod",
explanation:"Give a role to every user in the server.",
bot:"Manage Roles, Embed Links",
user:"Manage Roles",
usage:"mass-role <role name/id/mention>",
example:"mass-role Testing",
explain:"Gives everyone the role **Testing**.",
code:`$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:Mass Role Assigning!:$authoravatar}{description:<@$authorid> started a mass role assigning, giving the role <@&$findrole[$message]> to everyone!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:RANDOM}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$foreachmember[role]
$onlybotperms[manageroles;{description:Permissions required for execution of the command#COLON# \`Manage Roles\`. I do not have the necessary permissions!}{color:FF0000}]
$onlyif[$roleexists[$findrole[$message]]==true;Role not found!]
$onlyperms[manageroles;{description:Permissions required for execution of the command#COLON# \`Manage Roles\`. You do not have the necessary permissions!}{color:FF0000}]`})

bot.awaitedCommand({
name:"role",
code:`$giverole[$authorid;$findrole[$message]]
Roled $usertag
$deletein[2s]
$suppresserrors[]`})

bot.command({
name:"masstakerole",
aliases:"takerole-everyone",
category:"Mod",
explanation:"Take a role from every user in the server.",
bot:"Manage Roles, Embed Links",
user:"Manage Roles",
usage:"mass-takerole <role name/id/mention>",
example:"mass-takerole Testing",
explain:"Takes the role **Testing** from every member.",
code:`$if[$serverchannelexists[$getservervar[bl]]==true]
$channelsendmessage[$getservervar[bl];{author:Mass Role Taking!:$authoravatar}{description:<@$authorid> started a mass role taking, taking the role <@&$findrole[$message]> from everyone!\n\n[Jump To Message](https://discord.com/channels/$guildid/$channelid/$messageid)}{color:RANDOM}{footer:$username[$clientid] bot-mod logs}{timestamp}{thumbnail:$useravatar[$get[user]]}]
$else
$endif
$foreachmember[trole]
$onlybotperms[manageroles;{description:Permissions required for execution of the command#COLON# \`Manage Roles\`. I do not have the necessary permissions!}{color:FF0000}]
$onlyif[$roleexists[$findrole[$message]]==true;Role not found!]
$onlyperms[manageroles;{description:Permissions required for execution of the command#COLON# \`Manage Roles\`. You do not have the necessary permissions!}{color:FF0000}]`})

bot.awaitedCommand({
name:"trole",
type:"awaitedCommand",
code:`$takerole[$authorid;$findrole[$message]]
Un-roled $usertag
$deletein[2s]
$suppresserrors[]`})

bot.command({
name: "$alwaysExecute",
code: `$setUserVar[message;$sum[$getUserVar[message;$authorID];1];$authorID]
$suppressErrors`
})

bot.command({
name: "messages",
code: `
$thumbnail[$authorAvatar]
$title[***___MESSAGE SYSTEM ___***]
$description[
**You wrote:** $getUserVar[message;$authorID] **messages!**]
$color[GOLD]
$footer[$username • $authorID]
$addTimestamp`
})

//Invite  system
bot.joinCommand({
    channel: "$getServerVar[joinch]",
    code: `
$setUserVar[invite;$sum[$getUserVar[invite;$userInfo[inviter]];1];$userInfo[inviter]]
$title[Hello]
$description[**$username[$userInfo[inviter]]** invited **$username[$authorID]** and now has **$getUserVar[invite;$userInfo[inviter]]** invitations]
$color[RANDOM]
$footer[$username;$authorAvatar]
$addTimestamp`
})
bot.onJoined()
 
bot.leaveCommand({
    channel: "$getServerVar[leavech]",
    code: `
$setUserVar[invite;$sub[$getUserVar[invite;$userInfo[inviter]];1];$userInfo[inviter]]
> $username[$authorID] (**\`$authorID\`**) Has left the server **$username[$userInfo[inviter]]** (**\`$userInfo[inviter]\`**) now has **$getUserVar[invite;$userInfo[inviter]]** invitations`
})
bot.onLeave()
 
//Files:
 
bot.command({
    name: "joinch",
    aliases: ['setjoinch'],
    code: `
    $setServerVar[joinch;$mentionedChannels [1]]
    $description[Invite tracker welcome channel set up successfully]
    $color[GREEN]
    $onlyIf[$mentionedChannels[1]!=;Mark channel!]
    $onlyPerms[manageserver; You do not have **\`manage_server\`** permission]`
})
 
bot.command({
    name: "leavech",
    aliases: ['setleavech'],
    code: `
    $setServerVar[leavech;$mentionedChannels[1]]
    $description[Invite tracker leave channel successfully set!]
    $color[RED]
    $onlyIf[$mentionedChannels[1]!=;Mark Channel]
    $onlyPerms[manageserver; You do not have **\`manage_server\`** permission]`
})
 
//Additional commands:
 
bot.command({
    name: "inviter",
    code: `
$title[Inviter]
$description[<@$authorID> Was invited by <@$userInfo[inviter]>]
$color[RANDOM]
$footer[$username;$authorAvatar] 
$addTimestamp
$argsCheck[>1;Please mention someone to see his/her invites btw to see your invites mention yourself!] `
})
 
bot.command({
    name: "invboard",
    aliases: ['invites'],
    code: `
    $title[Invites]
    $description[$userLeaderboard[invite; asc; {top} - {username} ** {value} ** invitations]]
    $color[GREEN]
    $footer[$username;$authorAvatar]
 $addTimestamp`
})

/////Music Commands/////
//PLAY SONG COMMANDS #1 
bot.musicStartCommand()
bot.command({
 name: "play",
  usage: "play <song_name/song_url>",
   aliases: ["p"],
    description: "play music from youtube",
     code: `> $replaceText[$replaceText[$checkCondition[$queueLength>=1];false;];true;👍 **Joining the voice channel \`$channelName[$voiceID[$authorID]]\` and bring the 📄 file to \`$channelName[$channelID]\`**]

> **$replaceText[$replaceText[$checkCondition[$queueLength>=1];false;> Added to queue 📥];true;Playing 🎶] \`$playSong[$message;0s;yes;yes;Error when retrieving data,\n out from voice . . .]\`**
$sendMessage[
> $customEmoji[dawn_musicbeats]  Searching 🔎 \`$message\`
;no]
$onlyIf[$voiceID[$clientID]==;{execute:play1}]
$argsCheck[>1;{author:Error}{description:Please provide the music title/url of the music you wish to play.}{footer:Music}{color:FF0000}]
$onlyIf[$voiceID!=;{author:Error}{description: AQUA MoD does not detect that you are joining the voice channel}{footer:©️ AQUA MoD | Music}{color:FF0000}]
$cooldown[3s;{description:Please wait %time%}{color:ff2050}]
$onlyBotPerms[connect;speak;{description:⚠️ AQUA MoD has no permissions for speak/connect}{color:ff2050}]
`}) 

//PLAY SONG COMMANDS #2

bot.awaitedCommand({
 name: "play1",
  code: `> $replaceText[$replaceText[$checkCondition[$voiceID[$clientID]!=];true;];false;👍 **Joined the voice channel \`$channelName[$voiceID[$authorID]]\` and brought the 📄 file to \`$channelName[$channelID]\`**]

> **$replaceText[$replaceText[$checkCondition[$queueLength<=1];false; Added to queue 📥];true;Playing 🎶] \`$playSong[$message;0s;yes;Error when retrieving data,\n out from voice . . .]\`**
$sendMessage[
> $customEmoji[dawn_musicbeats]  Searching 🔎 \`$message\`
;no]
$onlyIf[$voiceID[$authorID]==$voiceID[$clientID];{description:Sorry it looks like AQUA MoD is being used in voice <#$voiceID[$clientID]>}{color:RED}]
$argsCheck[>1;{author:Error}{description:Please provide the music title/url of the music you wish to play.}{footer:Music}{color:FF0000}]
`
}) 

//JOIN COMMAND
bot.command({
 name: "joinvc",
  code: `$sendMessage[**Success joined voice channel \`$channelName[$voiceID[$authorID]]\` and bound :page_facing_up: to \`$channelName[$channelID]\`**;no]
  $clearSongQueue
  $pauseSong
  $description[$playSong[random;0s;no;error]]
  $onlyIf[$voiceID[$clientID]==;{execute:music1}]
  $onlyIf[$voiceID!=;{description:You must join voice channel first}{color:RED}]
  $suppressErrors`
  })
  bot.awaitedCommand({
   name: "music1",
    code: `$description[I am still playing in <#$voiceID[$clientID]>]
    $color[RED]`
    })
    
    //LEAVE COMMAND
    bot.command({
     name: "leavevc",
      code: `$sendMessage[**Success leave voice channel \`$channelName[$voiceID[$authorID]]\`**;no]
      $stopSong
      $description[$playSong[random;0s;no;error]]
      $onlyIf[$voiceID[$clientID]==;{execute:music2}]
      $onlyIf[$voiceID[$clientID]!=;{description:Im not in voice channel}{color:RED}]
      $onlyIf[$voiceID!=;{description:You must join voice channel first}{color:RED}]
      $suppressErrors`
      })
      bot.awaitedCommand({
       name: "music2",
        code: `$description[I am still playing in <#$voiceID[$clientID]>]
        $color[RED]`
        }) 


bot.command({
name: "pause",
code: `$pauseSong
⏸️ Paused.
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})

bot.command({
name: "resume",
code: `$resumeSong
▶️ Resumed!
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})

bot.command({
name: "loop",
code: `$replaceText[$replaceText[$checkCondition[$loopQueue==true];true;Loop now **on**];false;Loop now **off**]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})

bot.command({
name: "nowplaying",
code: `$author[Now playing;https://cdn.discordapp.com/emojis/729630163750354955.gif?size=1024]
$title[$songInfo[title]]
$description[$addField[Duration;$songInfo[duration]]
$addField[URL;$songInfo[url]]]
$footer[$botPingms to load it.]
$thumbnail[$songInfo[thumbnail]]
$color[a09fff]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})

bot.command({
name: "stop",
code: `$stopSong
$sendMessage[Leaving...;no]
$sendMessage[⏹️ Stopped.;no]
$onlyIf[$queueLength!=0;Nothing song was playing.]`
})

bot.command({
name: "skip",
code: `$skipSong
⏩ Skipped!
$onlyIf[$queueLength>2;Only have **$queueLength song**.]
$onlyIf[$queueLength!=0;Nothing song was playing.]
$onlyIf[$voiceID!=;You need to join the voice channel first!]`
})

bot.command({
name: "clearqueue",
code: `$clearSongQueue
$stopSong
$editIn[125ms;✅ Cleared queue. from **$queueLength song** to **0**] ⚠️ Clearing...
$onlyIf[$queueLength!=0;Nothing song was playing.]`
})

bot.command({
name: "queue",
code: `$reactionCollector[$splitText[1];$authorID;1m;🏠,⬆️,⬇️;home,queue1,queue2;yes]
$textSplit[$sendMessage[{title: Queue}{description:Queue length: \`$queueLength\`
$queueLength songs in queue
More songs can be played with $getServerVar[prefix] play \`<song name>\`
}{footer:For more queue list react with ⬆️,⬇️!}{color:RANDOM};yes]; ] `})

bot.awaitedCommand({
    name: "home",
    code: `$editMessage[$message[1];{title:Queue}{description:Queue length: \`$queueLength\`
$queueLength songs in queue
More songs can be played with $getServerVar[prefix] play \`<song name>\`
}{footer:For more queue list react with ⬆️,⬇️!}{color:RANDOM}]`
})

bot.awaitedCommand({
 name: "queue1",
 code: `$editMessage[$message[1];{title: Queue List} {description: 
Current songs in the Queue: **$queueLength**

$queue[1;6]

> Queue Length 1-5}{footer:🏠 Go back home!}{color:RANDOM}] 
$onlyIf[$queueLength>=5; $editMessage[$message[1];{title: Queue}{description: Need 5 songs to display the list!}{footer:🏠 Go back home!}{color:RANDOM}]] `
    
})

bot.awaitedCommand({
 name: "queue2",
 code: `$editMessage[$message[1];{title: Queue List} {description: Current songs in the Queue: **$queueLength**
$queue[5;10]
Queue Length 5-11}{footer:🏠 Go back home!}
{color:RANDOM}] 
$onlyIf[$queueLength>=10; $editMessage[$message[1];{title: Queue}{description: Need 10 songs to display the queue!}{footer:🏠 Go back home!}{color:RANDOM}]] `
    
})

bot.command({
 name: "volume",
 code: 
`$reactionCollector[$splitText[1];$authorID;1m;🔇,🔈,🔉,🔊;mute,vol50,vol100,vol200;yes]
$textSplit[$sendMessage[{title:<:dawn_volume:826800563697746000> Set volume} {description:Set the volume by reacting 📻:
1 - 🔇0%
2 - 🔈 50%
3 - 🔉 100%
4 - 🔊 150%}{color:FFACF5}{footer:Choose how high or low the volume should be!};yes]; ]`

}) 
bot.awaitedCommand({
 name: "mute",
 code: `$editMessage[$message[1]; {title:<:dawn_volume:826800563697746000> Done! }
{description:🔇 I have set volume to: 0% } {footer: To change again just react! } {color: #03a9f4} {thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/768px-Speaker_Icon.svg.png} ] $volume[1]` })

bot.awaitedCommand({
 name: "vol50",
 code: `$editMessage[$message[1]; {title:<:dawn_volume:826800563697746000> Done! }
{description:🔈 I have set volume to: 50% } {footer: To change again just react! } {color: #03a9f4} {thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/768px-Speaker_Icon.svg.png} ] $volume[50]` })
 
bot.awaitedCommand({
 name: "vol100",
 code: `$editMessage[$message[1]; {title:<:dawn_volume:826800563697746000> Done! }
{description:🔉 I have set volume to: 100% } {footer: To change again just react! } {color: #03a9f4} {thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/768px-Speaker_Icon.svg.png} ] $volume[100]` })

bot.awaitedCommand({
 name: "vol200",
 code: `$editMessage[$message[1]; {title:<:dawn_volume:826800563697746000> Done! }
{description:🔊 I have set volume to: 150% } {footer:To change again just react! } {color: #03a9f4} {thumbnail: https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/768px-Speaker_Icon.svg.png} ] $volume[150]` })


// lyrics of current song
bot.command({
name: "lyrics",
code:`$title[$songInfo[title]'s Lyrics.] 
$description[$jsonRequest[https://some-random-api.ml/lyrics?title=$songInfo[title];lyrics;No Lyrics Found for this song.]]
$suppressErrors[Failed finding lyrics with that song-name.]
$color[RANDOM]
$onlyIf[$voiceID!=;]
$onlyIf[$message==;]
`

})

bot.command({
 name: "skipto",
 aliases: ['jump'],
 cat: "Music",
 usage: "skipto (Song #)",
 desc: "Immediately skip to a song in the queue.",
 code:
 `
 $color[GREEN]
 $author[$userTag[$authorID];$authorAvatar]
 $title[Skipped to $message[1]]
 $description[Successfully jumped to $message[1] in the queue!]

 $footer[Requested by $userTag[$authorID];$authorAvatar]
 $addTimestamp

 $skipTo[$message[1]]

 $cooldown[5s;You're on cooldown! Please wait %time%.{delete:$getCooldownTime[user;skipto;$authorID;yes]ms}]

 $onlyIf[$isNumber[$message[1]]==true;Correct Usage: \`$getServerVar[prefix]skipto (Song #)\`{delete:10s}]
 $onlyIf[$voiceID==$voiceID[$clientID];{color:FF0000}{title:Error!}{description:You need to be in the same VC as the bot!}{delete:10s}]
 $onlyIf[$voiceID!=;{color:FF0000}{title:Error!}{description:You must connect to a voice channel!}{delete:10s}]
 $onlyIf[$queueLength>0;You don't have anything in the queue!{delete:10s}]

 $onlyIf[$checkContains[$channelType;text;news]==true;]

 $suppressErrors[Something went wrong...{delete:10s}]
 `
})
 
bot.command({
 name: "voicemute",
 code: `$if[$isNumber[$message[1]]==false]
$muteUser[$mentioned[1];yes]
$title[$userTag[$mentioned[1]] got muted in the voice-chats]
$description[Grund: $noMentionMessage]
$footer[Coded by Ohnezahn#8135 with dbd.js;$authorAvatar]
$addTimestamp
$elseIf[$isNumber[$message[1]]==true]
$muteUser[$message[1];yes]
$title[$userTag[$message[1]] got muted in the voice Chats]
$description[Reason: $replaceText[$message;$message[1] ;;1]]
$footer[Coded by Ohnezahn#8135 with dbd.js;$authorAvatar]
$endelseif
$endif
$onlyPerms[mutemembers;{title:Missing Permissions}{description:You need the \`Mute Members\` Perms}{footer:Coded by Ohnezahn#8135 with dbd.js:$authorAvatar}{color:RANDOM}{timestamp}]
$argsCheck[>1;{author:$userTag[$authorID]:$authorAvatar}{title:Missing Arguments!}{description:Please use <prefix>voicemute (@user/id)}{footer:AQUA MoD™:$authorAvatar}{timestamp}{color:RANDOM}]
 `
});


bot.command({
 name: "voiceunmute",
 code: `$if[$isNumber[$message[1]]==false]
$muteUser[$mentioned[1];no]
$title[$userTag[$mentioned[1]] got unmuted in the voice-chats]
$description[Reason: $noMentionMessage]
$footer[Coded by Ohnezahn#8135 with dbd.js;$authorAvatar]
$addTimestamp
$elseIf[$isNumber[$message[1]]==true]
$muteUser[$message[1];no]
$title[$userTag[$message[1]] got unmuted in the voice-chats]
$description[Reason: $replaceText[$message;$message[1] ;;1]]
$footer[AQUA MoD ™;$authorAvatar]
$endelseif
$endif
$onlyPerms[mutemembers;{title:Missing Permissions}{description:You do not have the \`Mute Members\` Permission}{footer:Coded by Ohnezahn#8135 with dbd.js:$authorAvatar}{color:RANDOM}{timestamp}]
$argsCheck[>1;{author:$userTag[$authorID]:$authorAvatar}{title:Missing Arguments!}{description:Please use <prefix>voiceunmute (@user/id)}{footer:Coded by Ohnezahn#8135 with dbd.js:$authorAvatar}{timestamp}{color:RANDOM}]
 `
}); 
 
bot.command({
name:"filter",
usage:"filter (Filter)",
desc:"Set a filter.",
code:`$reply[$messageID;{color:GREEN}{author:$userTag[$authorID]:$authorAvatar}{title:Filter Set}{description:Song $toLowercase[$message[1]] set$replaceText[$replaceText[$checkContains[$toLowercase[$message[2]];on;off];true;];false; to] **$message[2]**}{footer:Set by $userTag[$authorID]:$authorAvatar}{timestamp:ms};no] $songFilter[$toLowercase[$message[1]]:$message[2]] $if[$checkContains[$toLowercase[$message[1]];pitch;speed]==true]
$onlyIf[$message[2]<=1.9;$splitText[2]1.9\`!{delete:10s}] $onlyIf[$message[2]>=0;The minimum $toLowercase[$message[1]]$splitText[2]0\`!{delete:10s}] $onlyIf[$isNumber[$message[2]]==true;$splitText[1]$toLowercase[$message[1]] (0 to 1.9)\`{delete:10s}] $elseIf[$checkContains[$toLowercase[$message[1]];pulsator;contrast]==true]
$onlyIf[$message[2]<=99.9;$splitText[2]99.9\`!{delete:10s}] $onlyIf[$message[2]>=0;The minimum $toLowercase[$message[1]]$splitText[2]0\`!{delete:10s}] $onlyIf[$isNumber[$message[2]]==true;$splitText[1]$toLowercase[$message[1]] (0 to 99.9)\`{delete:10s}] $endelseIf $elseIf[$checkContains[$toLowercase[$message[1]];echo;gate;flanger;phaser;surround;earwax]==true]
$onlyIf[$checkContains[$message[2];on;off]==true;$splitText[1]$toLowercase[$message[1]] (On/Off)\`{delete:10s}] $endelseIf $endif $if[$toLowercase[$message[1]]==bass]
$onlyIf[$message[2]<=20;$splitText[2]20\`!{delete:10s}] $onlyIf[$message[2]>=-20;The minimum bass$splitText[2]-20\`!{delete:10s}] $onlyIf[$isNumber[$message[2]]==true;$splitText[1]bass (-20 to 20)\`{delete:10s}] $endif $cooldown[3s;You're on cooldown! Please wait %time%.{delete:$getCooldownTime[user;filter;$authorID;yes]ms}] $onlyIf[$checkContains[$toLowercase[$message[1]];pitch;bass;echo;speed;pulsator;contrast;gate;flanger;phaser;surround;earwax]==true;$splitText[1](Pitch/Bass/Echo/Speed/Pulsator/Contrast/Gate/Flanger/Phaser/Surround/Earwax)...\`{delete:10s}] $onlyIf[$voiceID==$voiceID[$clientID];{color:RED}{title:Error}{description:You must be in the same VC as the bot!}{delete:10s}] $onlyIf[$voiceID!=;{color:RED}{title:Error}{description:You must connect to a voice channel!}{delete:10s}] $onlyIf[$queueLength>0;You don't have anything in the queue!{delete:10s}] $textSplit[Correct Usage: \`$getServerVar[prefix]filter /The maximum $toLowercase[$message[1]] you can set is \`;/]`

})

/////Welcome system/////

bot.command({
 name: "setjoinchannel",
 code: `
$setServerVar[joinchannel;$mentionedChannels[1]]
Set Server Joinchannel To <#$mentionedChannels[1]>
$argsCheck[>1;Please Mention A Channel That you want it as Join Channel]
$onlyPerms[manageserver;You need manage server permission]`
 })

bot.command({
 name: "setleavechannel",
 code: `
$setServerVar[leavechannel;$mentionedChannels[1]]
Successfully Set Server Leave Channel To <#$mentionedChannels[1]>
$argsCheck[>1;Please Mention A Channel That You Want It As Leave Channel]
$onlyPerms[manageserver;You need manage server permission!]`
 });
 
 bot.command({
 name: "setleavemsg",
 code: `
$setServerVar[leavemessage;$message]
Set Server Leave Message To $message 
$argsCheck[>1; Please give me the message you wanna set!]
$onlyIf[$getServerVar[leavechannel]!=;This Server Has No leave channel! Set it by \`$getServerVar[prefix] setleavechannel
(channel)\`]
$onlyPerms[manageserver;You need manage server permission]`
});

bot.command({
 name: "setjoinmsg",
 code: `
$setServerVar[joinmessage;$message]
Set Server Join Message To $message 
$argsCheck[>1; Please give me the message you wanna set!]
$onlyIf[$getServerVar[joinchannel]!=;This Server Has No Join Channel! Set it by \`$getServerVar[prefix]setjoinchannel (channel)\`]
$onlyPerms[manageserver;You need manage server permission]`
 })
 
bot.joinCommand({
channel: "$getServerVar[joinchannel]",
code: `
<@$authorID>
$title[$customEmoji[dawn_join] WELCOME!]
$description[$replacetext[$replacetext[$replacetext[$replacetext[$getServerVar[joinmessage];{user.name};$username];{user.mention};<@$authorID>];{server.name};$serverName];{member.count};$membersCount]]
$image[attachment://welcome.jpg]
$attachment[https://api.xzusfin.repl.co/card?avatar=$replaceText[$authorAvatar;.webp;.png]?size=2048&middle=Welcome&name=$username%23$discriminator&bottom=We%20are%20now%20at%20$membersCount%20members%20:D&background=https://cdn.discordapp.com/attachments/789656208276848682/798106281189572645/default11.png&text=%23ffffff&avatarborder=%23FFFFFF&avatarbg=%23FF28b3;welcome.jpg]
$footer[Welcome to $serverName[$guildID]!]
$color[GREEN]

$onlyIf[$getServerVar[joinchannel]!=;]
$onlyIf[$getUserVar[joinlogs;$commandName]!=enabled;]
`
})

bot.leaveCommand({
channel: "$getServerVar[leavechannel]",
code: `
<@$authorID>
$title[$customEmoji[dawn_leave] GOODBYE!]
$description[$replacetext[$replacetext[$replacetext[$replacetext[$getServerVar[leavemessage];{user.name};$username];{user.mention};<@$authorID>];{server.name};$serverName];{member.count};$membersCount]]
$image[attachment://leave.jpg]
$attachment[https://api.xzusfin.repl.co/card?avatar=$replaceText[$authorAvatar;.webp;.png]?size=2048&middle=Goodbye!&name=$username%23$discriminator&bottom=We%20are%20now%20at%20$membersCount%20members%20:(&background=https://cdn.discordapp.com/attachments/789656208276848682/798106281189572645/default11.png&text=%23ffffff&avatarborder=%23FFFFFF&avatarbg=%23FF28b3;leave.jpg]
$footer[Goodbye from $serverName[$guildID] :/]
$color[ff2052]

$onlyIf[$getServerVar[leavechannel]!=;]
$onlyIf[$getUserVar[joinlogs;$commandName]!=enabled;]
`
 });

bot.command({ 
 name: "xxxxxxx",
    code: `
$setServerVar[joinlogs;true]
$title[Success!]
$description[<:nx_join:762248913418846219>Welcomer System has been enabled!]
$color[RANDOM]
$onlyIf[$getServerVar[joinchannel]!=;This Server Has No join channel! Set it by \`$getServerVar[prefix] setjoinchannel
(channel)\`]
`
})

bot.command({
    name: "xxxxx",
    code: `
$setServerVar[joinlogs;false]
$title[Success!]
$description[Welcomer System has been disabled!]
$color[RANDOM]
$onlyIf[$getServerVar[leavechannel]!=;This Server Has No leave channel! Set it by \`$getServerVar[prefix] setleavechannel
(channel)\`]
`
})
///////////////////////
bot.command({
name: "joinlogson",
code: `
$setUserVar[joinlogs;enabled;$commandInfo[$message[1];name]]
$description[The \`$commandInfo[$message[1];name]\` command was enabled!]
$onlyIf[$checkContains[$commandInfo[$message[1];code];#CHAR#onlyIf[#CHAR#getUserVar[command#SEMI##CHAR#commandName]!=disabled#SEMI#]]!=false;You can't enable this command!]
$onlyIf[$commandInfo[$message[1];name]!=;That command doesn't exist]
$onlyIf[$getServerVar[joinchannel]!=;This Server Has No join channel! Set it by \`$getServerVar[prefix] setjoinchannel
(channel)\`]
$onlyPerms[manageserver;no u]

`
})

bot.command({
name: "joinlogsoff",
code: `
$setUserVar[joinlogs;disabled;$commandInfo[$message[1];name]]
$description[The \`$commandInfo[$message[1];name]\` command was disabled!]
$onlyIf[$checkContains[$commandInfo[$message[1];code];#CHAR#onlyIf[#CHAR#getUserVar[command#SEMI##CHAR#commandName]!=disabled#SEMI#]]!=false;You can't disable this command!]
$onlyIf[$commandInfo[$message[1];name]!=;That command doesn't exist]
$onlyIf[$getServerVar[leavechannel]!=;This Server Has No leave channel! Set it by \`$getServerVar[prefix] setleavechannel
(channel)\`]
$onlyPerms[manageserver;no u]
`
})
///////////////////////
bot.command({ 
    name: "stoplogs",
    code: ` 
Resetting and Stopping the Welcomer System......
$resetServerVar[joinlogs]
$resetServerVar[joinmessage]
$resetServerVar[joinchannel]
$resetServerVar[leavemessage]
$resetServerVar[leavechannel]
$editIn[2s;The Welcomer System has been Sucessfully Stopped!]
$onlyPerms[manageserver;no u]
 
`
}) 

bot.command({ 
name: "welcomerinfo",
code: `
$title[Stats]
$description[
Welcomer and Autorole Stats for \`$serverName[$guildID]\`

<a:DAWN_arrow_right:774288927951552532>**Welcomer State:** 
\`$getServerVar[joinstate]\`

<a:DAWN_arrow_right:774288927951552532>**Welcome Channel:** 
\`#$channelName[$getServerVar[joinchannel]]\`

<a:DAWN_arrow_right:774288927951552532>**Goodbye Channel:** 
\`#$channelName[$getServerVar[leavechannel]]\`

<​a:DAWN_arrow_right:774288927951552532>**Welcome Message:** 
\`\`\` $getServerVar[joinmessage]\`\`\`

<​a:DAWN_arrow_right:774288927951552532>**Goodbye Message:** 
\`\`\` $getServerVar[leavemessage]\`\`\`
]
$color[RANDOM]
$addTimestamp
$suppressErrors[{title:Error!}{description:You need to first welcomer system then execute this command or some error occured!}{color:BLACK}]

`})
/////////////////////////////////
bot.command({
 name: "$alwaysExecute",
 code: `
$deletecommand
$title[$customEmoji[dawn_attention] Antilink Alert]
$description[ <@$authorID> You can not send link into \`$serverName\`  
Reason: **Antilink Enabled** 
] 
$footer[$customEmoji[dawn_cross] $username or **YOU** tried to send a link!.⚠️Don't try it again unless there is a promotion channel!] 
$dm[$authorID]
$channelSendMessage[$channelID;{description:$username tried to send a link but i blocked it!}{color:$getServerVar[color]}{delete:10s}]
$onlyIf[$checkContains[$message;https://;https://discord.gg;discord.gg;discord.com;https://discord.com;youtube.com/]==true;]
$onlyIf[$hasPerms[$authorID;admin;kick]!=true;] 
$onlyIf[$getServerVar[link]==true;]  
$onlyIf[$channelID!=$getServerVar[promotionchnl];]
$color[BLACK]

 `
}) 
 
bot.updateCommand({

channel: "$channelID",

code: `$deletecommand
$title[<a:nx_error:785829739700551711> Antilink Alert]
$description[$customEmoji[dawn_cross] <@$authorID> You can not send link into \`$serverName\`  

Reason: **Antilink Enabled** 

] 
$footer[ $username or **YOU** tried to send a link!.⚠️Don't try again to bypass the system!]
$dm[$authorID]
$channelSendMessage[$channelID;{description:$username tried to bypass antilink system but i blocked it!}{color:$getServerVar[color]}{delete:10s}]
$onlyIf[$checkContains[$message;https://;https://discord.gg;discord.gg;discord.com;https://discord.com;youtube.com/]==true;]

$onlyIf[$hasPerms[$authorID;admin;managemessages;kick]!=true;] 

$onlyIf[$getServerVar[link]==true;]  

$onlyIf[$channelID!=$getServerVar[promotionchnl];]

$color[BLACK]`

})
bot.onMessageUpdate()
 
bot.command({
 name: "antilinkon",
 code: `$setServerVar[link;true]
 $title[Antilinks System]
 $description[Antilink Enabled!

**\`\`\`
Now people with admin, kick or managemessages perms can only send links!
Keep the admin perms limited to owner role or anyone can abuse it!
\`\`\`**]
 $footer[Request by $username | $getServerVar[prefix]help]
 $addTimestamp
 $color[WHITE]
  $onlyBotPerms[managemessages;Bot missing permission **MANAGE MASSAGES**]
$onlyPerms[manageserver;Only people with \`manageserver\` can access this command]
`
})

bot.command({
 name: "antilinkoff",
 code: `$setServerVar[link;false]
 $title[Antilinks System]
 $description[Antilink Disable]
 $footer[Request by $username | $getServerVar[prefix] help]
 $addTimestamp
 $color[WHITE]
 $onlyBotPerms[managemessages;Bot missing permission **MANAGE MASSAGES**]
$onlyPerms[manageserver;Only people with \`manageserver\` can access this command]
 `
}) 
 
bot.command({ 

name: "promochannel",

code: ` 

$setServerVar[promotionchnl;$mentionedChannels[1]] 

$title[Promotion Channel]

$description[Promotion channel setted up to <#$mentionedChannels[1]>

\`\`\
Now,announce to user or say them that they can post links in #$mentionedChannels[1]
\`\`\`] 

$footer[Means antilink will ignore this channel]

$color[fffff]
$onlyPerms[manageserver;Only people with \`manageserver\` can access this command]` 

}) 
 
bot.command({ 
    name: "resetpromo", 
    code: `  
$title[Promotion Channel] 
$description[Promotion Channel was resetted so,no one except admins or mod can post links in any channel] 
$footer[Antilink System]
$resetServerVar[promotionchnl]
$onlyPerms[manageserver;Only people with \`manageserver\` can access this command]` 
})    

bot.command({ 
name:"userinfo",
aliases:['userinformation','whois','ui'], 
code:
`

$thumbnail[$userAvatar[$findUser[$message]]]
 $title[User Info]
 $addField[**Custom Status**;$getCustomStatus[$mentioned[1;yes]];yes]
 $addField[**Avatar**;[User Avatar\\]($userAvatar[$mentioned[1;yes];2048;yes]);yes]
$addField[** 💿 Server**;**Joined**: \`$memberJoinedDate[$mentioned[1;yes];time]\` ago

\`🔝\` **Highest Role**: <@&$highestRole[$mentioned[1;yes]]>

\`📃\` **Roles**: $userRoles[$mentioned[1;yes];mentions]

\`✅\` **Permissions**: \`$userPerms[$mentioned[1;yes]]\`;yes]
$addField[** :adult: Basic Info**; \`📛\` **Name**: $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]

\`💳\` **ID**: \`$mentioned[1;yes]\`

\`🌈\` **Status**: $replaceText[$replaceText[$replaceText[$replaceText[$status[$findUser[$message]];offline;:black_circle: Offline;-1];online;:green_circle: Online;-1];dnd;:red_circle: DND;-1];idle;:yellow_circle: Idle;-1]

\`🔶\` **Badges**: $getUserBadges[$mentioned[1;yes]]

\`💻\` **Platform**: $platform[$mentioned[1;yes]]

\`👶\` **Creation Date**: $creationDate[$mentioned[1;yes];date] (\`$creationDate[$mentioned[1;yes];time]\`);yes]
$color[BLUE]
$onlyIf[$isBot[$authorID]==false;]`
}) 

bot.command({
name: "serverinfo",
code:  `$author[$serverName;$serverIcon]
 $description[
**Name**: $serverName
**Server ID**: $guildID
**Owner**: $userTag[$ownerID] <@$ownerID> 
**Region**: $replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$serverRegion;brazil;🇧🇷];europe;🇪🇺];hong kong;🇨🇳];eua;🇺🇸];india;🇮🇳];japan;🇯🇵] (**$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$serverRegion;brazil;Brazil];europe;Europe];hong kong;Hong Kong];eua;Eua];india;India];japan;Japan]**)
**Created on**: $formatDate[$creationDate[$guildID];LLLL]
**Verification level**: $serverVerificationLevel
**Boost level**: $serverBoostLevel

**Humans**: $membersCount[$guildID;all;no]
**Bots**: $botCount
**Online members**: $membersCount[$guildID;online]
**Idle members**: $membersCount[$guildID;idle]
**DND members**: $membersCount[$guildID;dnd]
**Offline members**: $membersCount[$guildID;offline]
**Total members**: $membersCount

**Animated emojis**: $emojiCount[animated]/100
**Non-animated emojis**: $emojiCount[normal]/100
**Total emojis**: $emojiCount/200

**Text channels**: $channelCount[text]
**Voice channels**: $channelCount[voice]
**Total categories**: $channelCount[category]
**Total channels**: $channelCount

**Roles Count**: $roleCount
**Ban Count**: $banCount

**Server features**: $serverFeatures
**Description**: $replaceText[$replaceText[$checkCondition[$serverDescription==];true;No Description];false;$serverDescription]]
 $footer[Serverinfo]
$addTimeStamp
 $thumbnail[$serverIcon]
 $color[GREEN]`
})
//Snipe commands

bot.deletedCommand({
channel: "$channelID",
code: `$setChannelVar[snipe_msg;$message]
$setChannelVar[snipe_author;$authorID]
$setChannelVar[snipe_channel;$channelID]
$setChannelVar[snipe_date;$day.$month.$year - $hour:$minute]`

});

bot.onMessageDelete();
bot.command({
name: "snipe",
code: `
$author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
$description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]] 
$color[$getServerVar[color]]
$onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;> There's nothing to snipe in <#$mentionedChannels[1;yes]>]
$onlyPerms[managemessages;Only people with \`managemessages\` can access this command]
`

 }); 

bot.onMessageDelete();
bot.deletedCommand({
 channel: "$channelID",
 code: `
 $setChannelVar[allsnipe;$joinSplitText[§]§\`\`\`MESSAGE: $message
 DATE: $parseDate[$dateStamp;date]
 BY : $username#$discriminator[$authorID]\`\`\`]
 
 $removeTextSplitElement[$replaceText[$replaceText[$checkCondition[$getTextSplitLength>=10];true;1];false;$sum[1;$getTextSplitLength]]]
 $textSplit[$getChannelVar[allsnipe];§]
 `
})

bot.command({
 name: "snipeall",
 code: `
 $title[ALL CHATS]
 $description[$joinSplitText[
 ]]
 $addTimestamp
 $footer[$username#$discriminator[$authorID];$authorAvatar]
 $onlyIf[$splitText[$getTextSplitLength]!=;\`\`\`
Nothing to snipe
\`\`\`]
 $textSplit[$getChannelVar[allsnipe;$mentionedChannels[1;yes]];§] 
$color[$getServerVar[color]]
$onlyPerms[managemessages;Only people with \`managemessages\` can access this command]
$cooldown[5s;> Wait %time% to use again]
 `
})

bot.updateCommand({
 channel: "$channelID",
 code: `$setChannelVar[msgEditorID;$authorID]
 $setChannelVar[esnipeOldMsg;$oldMessage]`
})
bot.onMessageUpdate();

bot.command({
 name: "editsnipe",
 aliases: ["esnipe"],
 code: `$author[$username[$getChannelVar[msgEditorID]]#$discriminator[$getChannelVar[msgEditorID]];$userAvatar[$getChannelVar[msgEditorID]]]
$description[$getChannelVar[esnipeOldMsg]]
$addTimestamp
$color[$getServerVar[color]]
$onlyIf[$getChannelVar[esnipeOldMsg]!=undefinied;{description: There is nothing i can snipe}{color: RED}]
$onlyIf[$getChannelVar[msgEditorID]!=undefinied;{description: There is nothing i can snipe}{color: RED}]
$suppressErrors[There is nothing i can snipe]`
})

bot.command({
name: "quote",
code: ` $author[$userTag[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]];$userAvatar[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];userID]]]
$description[$getMessage[$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[6]];false;$mentionedChannels[1;yes]];$replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$splitText[7]];false;$noMentionMessage];content]
 
**[Jump to message]($replaceText[$replaceText[$checkContains[$message;https://discord.com/channels/;https://ptb.discord.com/channels/];true;$message];false;https://discord.com/channels/$guildID/$mentionedChannels[1;yes]/$noMentionMessage])**]
$textSplit[$message;/]
$color[RANDOM]
$suppressErrors[**⛔ Could not find message**]`
})
/////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
 bot.command({

    name: "translate",

    code: `

$reply[$messageId;

{title:Translator}

{description:Text: **$message** 

Translated text: **$jsonRequest[https://api.fc5570.ml/translate?text=$message;text;Some Error occurred while trying to translate!.Please try again or try to translate other languages!]**}

{footer:$randomText[Tip- You can literally copy any language to translate into English;Tip- Use google translate sometimes if this doesn't work]}{color:RANDOM}]

$onlyIf[$message!=;Enter text to translate]` 

}) 
 
bot.command({
name: "rps",
description: "Play rps game with bot",
usage: "rps",
code: `
$awaitReaction[$authorID;15s;
{title:🧠 RPS GAME}
{thumbnail:$userAvatar[$clientID]}
{description:Choose your choice
✊ | **ROCK** 
📄 | **PAPER**
✂ | **SCISSOR**}
{footer:Requested By $userTag[$authorID]:$authorAvatar}
{timestamp}
{color:$getVar[color]}
;✊,📄,✂;rock,paper,scissor;You ran out of time]
`});
 
bot.awaitedCommand({
name: "rock",
code: `
$title[🧠 RPS GAME]
$thumbnail[$userAvatar[$clientID]]
$description[
 $randomText[
**$username[$clientID] ✊ Vs ✊ You**

🟡 │ It's a **TIE**.;
**$username[$clientID] 📄 Vs ✊ You**

🔴 │ You **LOST**.;
**$username[$clientID] ✂ Vs ✊ You**

🟢 │You **WON**]

$randomText[🎉 Well Played !;🎉 Good Game !]
]
$color[$getVar[color]]
$footer[Requested By $username[$authorID];$authorAvatar]
$addTimestamp
`})

bot.awaitedCommand({
name: "paper",
code: `
$title[🧠 RPS GAME]
$thumbnail[$userAvatar[$clientID]]
$description[
 $randomText[
**$username[$clientID] 📄 Vs 📄 You**

🟡 │ It's a **TIE**.;
**$username[$clientID] ✂ Vs 📄 You**

🔴 │ You **LOST**.;
**$username[$clientID] ✊ Vs 📄 You**

🟢 │You **WON**.]

$randomText[🎉 Well Played !;🎉 Good Game !]
]
$color[$getVar[color]]
$footer[Requested By $username[$authorID];$authorAvatar]
$addTimestamp
`})

bot.awaitedCommand({
name: "scissor",
code: `
$title[🧠 RPS GAME]
$thumbnail[$userAvatar[$clientID]]
$description[
 $randomText[
**$username[$clientID] ✂ Vs ✂ You**

🟡 │ It's a **TIE**.;
**$username[$clientID] ✊ Vs ✂ You**

🔴 │ You **LOST**.;
**$username[$clientID] 📄 Vs ✂ You**

🟢 │You **WON**.]

$randomText[🎉 Well Played !;🎉 Good Game !]
]
$color[$getVar[color]]
$footer[Requested By $username[$authorID];$authorAvatar]
$addTimestamp
`})

bot.command({

name:"reverse",

code:` 

$title[RESREVER]

$description[Normal text: 
\`\`\`
$message\`\`\`

RESREVER text: \`\`\` 
$jsonRequest[https://api.fc5570.ml/reverse/?text=$replaceText[$message; ;%20];convertedText;Couldn't reverse the given text.] 
\`\`\`] 
$color[RANDOM]

$footer[$randomText[Tip: Title is not wrong put in correct order;Tip: Use mirror]]`

}) 

bot.command({
    name: "weather",
    code: `
$title[Weather in $message!]
$image[attachment://weather.png]
$attachment[https://wttr.in/$message.png?m;weather.png]
$footer[How's today weather?]
$author[$username] 
$cooldown[5s;Recently weather command was used! wait %time% to use again!]
$color[f2f2f2]
$argsCheck[>1;❌Please type a location!]`
}) 
/////Anti Raid System/////
bot.command({
name: "set-antibotlogs", 
code: `$title[Anti-BotRaid]
$description[Successfully set anti-bot logs channel to $message

**\`\`\`
So why it's useful?
When the server owner is sleeping/doing work or whatever and a bad moderator invites a malicious bot which can delete all channels, roles etc!
But when antibotraid is enabled then the moderator or even any role which has manage_server permisson can't invite any bot as it will be kicked automatically!
Keep the bot role on below owner role or above it as if the bot role is below moderator role then this system will be useless as they can kick me!
First disable the command then invite your favourite bots or it will kick them!
\`\`\`**]
$footer[Always turn it on when you can't be online to see your server activities!]
$color[$getServerVar[color]]
$setServerVar[antibotlogs;$mentionedChannels[1;yes]]
$onlyForIDs[$ownerID;Only Server Owner!]`
})

bot.joinCommand({
channel: '$getServerVar[antibotlogs]',
code: `
$kick[$authorID;Anti-Raid]
$wait[0.2s]
$title[AntiBot-Raid]
$description[> **$userTag[$authorID]** was invited by someone but kicked due to antibotraid system is on!]
$footer[$getServerVar[prefix] antibotraid <enable/disable>]
$color[$getServerVar[color]]
$addTimeStamp
$onlyIf[$isBot[$authorID]!=false;] 
$onlyIf[$getServerVar[autokickbot]==true;]`

})

bot.command({
name: "antibotraid",
code: `
$title[Anti-BotRaid]
$description[> Successfully **\`$replaceText[$replaceText[$message;enable;enabled];disable;disabled]\`** the command!]
$color[$getServerVar[color]]
$setServerVar[autokickbot;$replaceText[$replaceText[$message;enable;true];disable;false]] 
$onlyIf[$getServerVar[leavechannel]!=;This Server Has No antibotlogs channel! Set it by \`$getServerVar[prefix] set-antibotlogs
(channel)\`]
$onlyIf[$checkContains[$message;enable;disable]==true;You must say \`enable\` or \`disable\`]
$onlyForIDs[$ownerID;Only Server Owner !]
`
}) 
/////////////////////////////
bot.command({
name: "antiraid",
code: `
$title[Anti-Raid] 
$description[Successfully **\`$replaceText[$replaceText[$message;enable;enabled];disable;disabled]\`** the command!] 
$color[$getServerVar[color]]
$setServerVar[antiraid;$replaceText[$replaceText[$message;enable;true];disable;false]] 
$onlyIf[$getServerVar[antiraidlogs]!=;This Server Has no antiraid logs channel! Set it by \`$getServerVar[prefix] set-antiraidlogs
(channel)\`]
$onlyBotPerms[kick;{title:⚠ WARNING ⚠}{description:❌ The bot doesn't have **\`kick\`** permissions,So how can i kick raiders huh?}{footer:Powerful AntiRaid bot is here!}{color:RED}{delete:1m}]
$onlyIf[$checkContains[$message;enable;disable]==true;You must say \`enable\` or \`disable\`]
$onlyForIDs[$ownerID;Only Server Owner!]`
}) 
 
bot.command({
name: "set-antiraidlogs", 
code: `
$title[Anti-Raid] 
$description[Successfully set anti-raid logs channel to $message] 
$color[$getServerVar[color]]
$setServerVar[antiraidlogs;$mentionedChannels[1;yes]]
$onlyIf[$mentionedChannels[1]!=;Please mention a channel to set as the antiraidlogs channel]
$onlyForIDs[$ownerID;Only Server Owner!]`
})

bot.joinCommand({
channel: '$replaceText[$replaceText[$checkCondition[$getServerVar[antiraidlogs]==];true;$randomChannelID];false;$getServerVar[antiraidlogs]]',
code: `
$kick[$authorID]
$wait[0.3s]
$sendDm[$authorID;{title:Anti-Raid!}{description:> As Anti-Raid System is enabled so you are kicked automatically that's why you can't join **\`$serverName\`**!}{footer:Invite me now to stop raiders on your server!}{color:$getServerVar[color]}{timestamp}]
$title[Anti-Raid] 
$description[> **$userTag[$authorID]** tried to join when anti-raid system is on, Kicked!]
$footer[Raid Finished? | aqa antiraid disable] 
$addTimeStamp
$color[$getServerVar[color]]
$suppressErrors
$onlyBotPerms[kick;{title:⚠ WARNING ⚠}{description:❌ The bot doesn't have **\`kick\`** permissions,So how can i kick raiders huh?}{footer:Powerful AntiRaid bot is here!}{color:RED}{delete:30s}]
$onlyIf[$isBot[$authorID]==false;]
$onlyIf[$getServerVar[antiraid]==true;]
`
})
//////////////////////////////////////////////////////////
bot.command({
name: "antiraidmute",
code: `
$title[Anti-RaidMute] 
$description[Successfully **\`$replaceText[$replaceText[$message;enable;enabled];disable;disabled]\`** the command!] 
$color[$getServerVar[color]]
$setServerVar[antiraid;$replaceText[$replaceText[$message;enable;true];disable;false]] 
$onlyIf[$checkContains[$message;enable;disable]==true;You must say \`enable\` or \`disable\`]
$onlyIf[$getServerVar[muterole]!=;{title:⚠ WARNING ⚠}{description:> :x: There is no defined role!.Set it by \`$getServerVar[prefix] set-mute @role\`!}{color:RED}{delete:30s}]
$onlyIf[$getServerVar[antiraidlogs]!=;This Server Has no antiraid logs channel! Set it by \`$getServerVar[prefix]set-antiraidlogs (channel)\`]
$onlyForIDs[$ownerID;Only Server Owner!]
`
}) 
 
bot.joinCommand({
channel: '$replaceText[$replaceText[$checkCondition[$getServerVar[antiraidlogs]==];true;$randomChannelID];false;$getServerVar[antiraidlogs]]',
code: `
$giveRoles[$authorID;$getServerVar[muterole]]
$wait[0.3s]
$sendDm[$authorID;{title:Anti-Raid!}{description:Anti-RaidMute System is enabled!.So you can't chat in **\`$serverName\`**!}{footer:Invite me now to stop raiders on your server!}{color:$getServerVar[color]}{timestamp}]
$title[Anti-Raid] 
$description[> **$userTag[$authorID]** tried to join when anti-raidmute system is on, Muted!]
$footer[Raid Finished? | aqa antiraidmute disable] 
$addTimeStamp
$color[$getServerVar[color]]
$suppressErrors
$onlyIf[$getServerVar[muterole]!=;{title:⚠ WARNING ⚠}{description:> :x: There is no defined role!.Set it by \`$getServerVar[prefix] set-mute @role\`!}{delete:30s}]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$authorID]];{title:⚠ WARNING ⚠}{description:The user trying to join is higher than me on role position.Take the  **\`AQUA MoD\`** role on top of the members/guest/visitor and muted role whatever you keep the role name and maybe stop the autorole so it can work perfectly!}{footer:Thank you for using our services!}{delete:30s}]
$onlyIf[$isBot[$authorID]==false;]
$onlyIf[$getServerVar[antiraidmute]==true;]
`
})
////////////////////////////////////////////////
/////Profile System/////
bot.command({
name:"profile-setup",
code:`$sendMessage[> **Please enter your name!**;no]
$awaitMessages[$authorID;20s;everything;p2;Time up!]`})

bot.awaitedCommand({
 name: "p2",
 code: `$awaitMessages[$authorID;20s;everything;p3;Time up!]
$sendMessage[> **Now please write your age...put anything except a number if you do not want to disclose it!**;no]
$setGlobalUserVar[name;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p3",
 code: `$awaitMessages[$authorID;20s;everything;p4;Time up!]
$sendMessage[> **Enter your favorite pet!**;no]
$setGlobalUserVar[age;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p4",
 code: `$awaitMessages[$authorID;20s;everything;p5;Time up!]
$sendMessage[> **Enter the place where you live in!**(Enter N/A if you don't want to give!);no]
$setGlobalUserVar[pet;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p5",
 code: `$awaitMessages[$authorID;5m;everything;p6;Time up!]
$sendMessage[> **Enter your hobbies!**;no]
$setGlobalUserVar[country;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p6",
 code: `$awaitMessages[$authorID;5m;everything;p7;Time up!]
$sendMessage[> **Now, for the final step, enter things about yourself!**;no]
$setGlobalUserVar[hobbies;$message;$authorID]`
});

bot.awaitedCommand({
 name: "p7",
 code: `$channelSendMessage[$channelID;{title:Profile View!}{description:$customEmoji[dawn_discord] **\`Name\`**: $getGlobalUserVar[name;$authorID]
🔞 **\`Age\`**: $replaceText[$replaceText[$checkCondition[$isNumber[$getGlobalUserVar[age;$authorID]]==true];true;$getGlobalUserVar[age;$authorID];1];false;Age not disclosed;1]
$customEmoji[dawn_blue_arrow] **\`Pet\`**: $getGlobalUserVar[pet;$authorID]
$customEmoji[dawn_crown] **\`Country\`**: $getGlobalUserVar[country;$authorID]
$customEmoji[dawn_campfire] **\`Hobbies\`**: $getGlobalUserVar[hobbies;$authorID]
$customEmoji[dawn_information] **\`About\`**: $message}{thumbnail:$userAvatar[$authorID]}{color:$getServerVar[color]};no]
$setGlobalUserVar[about;$message;$authorID]`
});

bot.command({
name:"profile",
code:`
$channelSendMessage[$channelID;{title:Profile View of $userTag[$mentioned[1;yes]]!}{description:$customEmoji[dawn_discord] **\`Name\`**: $getGlobalUserVar[name;$mentioned[1;yes]]
🔞 **\`Age\`**: $replaceText[$replaceText[$checkCondition[$isNumber[$getGlobalUserVar[age;$mentioned[1;yes]]]==true];true;$getGlobalUserVar[age;$mentioned[1;yes]];1];false;Age not disclosed;1]
$customEmoji[dawn_blue_arrow] **\`Pet\`**: $getGlobalUserVar[pet;$mentioned[1;yes]]
$customEmoji[dawn_crown] **\`Country\`**: $getGlobalUserVar[country;$mentioned[1;yes]]
$customEmoji[dawn_campfire] **\`Hobbies\`**: $getGlobalUserVar[hobbies;$mentioned[1;yes]]
$customEmoji[dawn_information] **\`About\`**: $getGlobalUserVar[about;$mentioned[1;yes]]}{thumbnail:$userAvatar[$authorID]}{color:$getServerVar[color]};no]
$onlyIf[$mentioned[1]!=;Mention people to see profiles!(Mention yourself to see your own profile)]
`})


/////////////////////////////////////////
/////Reaction Roles/////
//Code 1: Start Setup
bot.command({
 name:"setrr",
 code:`$setservervar[rrmid;$splittext[1]]
$textsplit[$sendmessage[{author:Reaction roles:$servericon}{description:$nomentionmessage}{footer:React with 👍 to get the role $rolename[$mentionedroles[1]]!}{color:RANDOM};yes]; ]
$setservervar[rrr;$mentionedroles[1]]
$onlyif[$nomentionmessage!=;Please enter a message!]
$onlyif[$mentionedroles[1]!=;Please mention the role to be given!]`})

bot.reactionAddCommand({
channel: "$channelID", 
code:`$sendDm[$authorID;{author:Role given!:$useravatar[$clientid]}{description:You successfully got the role by reacting to 👍 in $servername!}{footer:Yay!}{color:GREEN}]
$giverole[$authorid;$getservervar[rrr]]
$onlyif[$emojitostring==👍;]
$onlyif[$getservervar[rrr]!=;]
$onlyif[$messageID==$getservervar[rrmid];]`})

bot.onReactionAdd()
bot.reactionRemoveCommand({
channel: "$channelid", 
code:`$sendDm[$authorID;{author:Role taken!:$useravatar[$clientid]}{description:You successfully removed the role by reacting to 👍 in $servername!}{footer:#COLON#D}{color:GREEN}]
$takerole[$authorid;$getservervar[rrr]]
$onlyif[$emojitostring==👍;]
$onlyif[$getservervar[rrr]!=;]
$onlyif[$messageID==$getservervar[rrmid];]`})
bot.onReactionRemove()
///////////////NSFW Commands//////////////
// The 19 NSFW commands in the original 2021 build have been removed from this
// public mirror. Their upstream APIs (api.avux.ga, gud-api.gofaizen.repl.co,
// api.leref.ga, zero-two.rodzen.repl.co) shut down years ago, so these commands
// had already stopped working. See README.md.
//////////////////////////////////////////
bot.command({

name: "shortener",

description: "Url shortner",

usage: "shortner <url>",

code: `

$title[URL SHORTENER]

$thumbnail[$userAvatar[$clientID]] 

$addField[Shorten Url 2; 
\`\`\`
$jsonRequest[https://is.gd/create.php?format=simple&url=$message[1]]
\`\`\`;no]

$addField[Shorten Url 1;\`\`\`
$httpRequest[https://api.avux.ga/shortener?url=$message[1];GET;;shortener;error;X-API-Key:$getVar[shortener_api_key]]
\`\`\`;no]

$addField[Normal Url;\`\`\`
$message[1]
\`\`\`;no]

$footer[Requested By $userTag[$authorID];$authorAvatar]

$addTimestamp

$color[RANDOM] 
$cooldown[15s;Wait %time% to shorten links again]

$onlyIf[$message[1]!=;{author:ERROR:$userAvatar[$clientID]}{description:You need to put an url / link}{color:FF0000}]`

}) 
  
bot.command({

 name: "screenshot",

 aliases: ['ss'],

 code: ` 

$title[ScreenShot!]

$onlyIf[$isValidLink[$message]==true;The link you've given isn't valid]

$image[attachment://screenshot.png]

$attachment[https://image.thum.io/get/auth/$getVar[thum_api_key]/nomention/$message;screenshot.png;screenshot.png]




$footer[Executed by $username]

$addtimeStamp 
$cooldown[4s;Wait %time%.This is to prevent api abuse]

`

})  
 
bot.loopCommand({

channel: "000000000000000000",

code: `

$editMessage[000000000000000000;{title:**__Bot Status__**}

{description:

**__BOT-STATUS__**

◈ ━━━━━━━ ● ━━━━━━━ ◈ 

 

Ping: \`$pingms\`

Servers: \`$serverCount\`

Users: \`$allMembersCount\`

Uptime: \`$uptime\`

Ram Usage: \`$ram\`

**Cpu Usage:** \`$cpu\`

**Dbd.js Version:** \`$packageVersion\`

**Command:** \`$commandsCount\`

**__SERVER-STATUS__**

◈ ━━━━━━━ ● ━━━━━━━ ◈

Server Status:


┎<:dawn_online:760089727713280051> Online - **$membersCount[$guildID;online]**
┃
┠<:dawn_idle:760092150138142740> Idle - **$membersCount[$guildID;idle]**
┃
┠<:dawn_busy:760092230932627468> DND - **$membersCount[$guildID;dnd]**
┃
┖<:dawn_offline:760089823884214272> Offline - **$membersCount[$guildID;offline]**


 ◈ ━━━━━━━ ● ━━━━━━━ ◈

}

{color:GREEN}
{thumbnail:https://cdn.discordapp.com/attachments/799897443424272404/824675087629811732/How_To_Ban_Words_in_Discord.png}
{timestamp:ms}] 
$suppressErrors`,

executeOnStartup: true,

every: 2000

})

bot.onGuildJoin()
bot.botJoinCommand({
 channel: "000000000000000000",
 code: `  
$botLeave[$guildID]
$onlyIf[$membersCount[$guildID;all;no]>10;> Your server has less than 10 real human members so moderation bot is useless here!]

$thumbnail[$replaceText[$serverIcon[$guildID;2048;yes];null;https://media.discordapp.net/attachments/859727383221633025/860127431183958036/IMG_20210701_172835.jpg]]
$title[$username[$clientID] Joined A New Server! | #$serverCount] 
$addfield[🌐Server Region; $replaceText[**\`$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$serverRegion;brazil;Brazil];europe;Europe];hong kong;Hong Kong];eua;Eua];india;India];japan;Japan]\`**;yes]
$addField[⛲Server Features;**\`$replaceText[$replaceText[$checkCondition[$serverFeatures==];true;No Features];false;$serverFeatures]\`**;yes]
$addField[🛡️Verification; **\`$serverVerificationLevel\`**;yes]
$addField[🧾Roles; **\`$roleCount\`**;yes]
$addField[⌨️Emojis; **\`$emojiCount\`** Emojis;yes]
$addField[<:dawn_Nitro:824938727910146079>Server Boost; **\`$serverBoostCount\`** (Level $serverBoostLevel);yes]
$addField[Channels;\#️⃣ **\`$channelCount[text]\`** Text 
$customEmoji[voice] **\`$channelCount[voice]\`** Voice;yes]
$addField[Description;**\`$replaceText[$replaceText[$checkCondition[$serverDescription==];true;No Description];false;$serverDescription]\`**;yes]
$addField[👤Members;<:dawn_online:760089727713280051>Online: **\`$sum[$membersCount[$guildID;online];$membersCount[$guildID;idle];$membersCount[$guildID;dnd]]\`**
<:dawn_offline:760089823884214272>Offline: **\`$membersCount[$guildID;offline]\`**;yes]
$addfield[:busts_in_silhouette:Members ;\`$membersCount\`;yes]
$addField[👑Owner;**\`$username[$ownerID]#$discriminator[$ownerID]\`**;yes]
$addField[🆔Server ID;\`$guildID\`;yes] 
$addField[📙Server Name;\`$serverName\`;yes]
$addField[🔗Invite;**$getServerInvite**;yes] 
$color[0bfc03] 
`
}) 

bot.onGuildLeave()
bot.botLeaveCommand({
 channel: "000000000000000000",
 code: ` 
$thumbnail[$replaceText[$serverIcon;null;https://media.discordapp.net/attachments/859727383221633025/860127431183958036/IMG_20210701_172835.jpg]]
$title[$username[$clientID] left A Server :( | #$serverCount] 
$description[ 
Guild Owner: **\`$username[$ownerID]#$discriminator[$ownerID]\`**
Guild Name: **\`$serverName\`**
Guild Id: **\`$guildID\`**
Guild Region: **\`$serverRegion\`**
Members: **\`$membersCount\`**
]
$color[RED]  
$wait[4s]
$suppressErrors
`
})
 
bot.command({
 name: "premium-transfer",
 code: `
 $setServerVar[PREMIUM;true;$message[1]]
 $setTimeout[31d;
 userID: $authorID]
 $username you have transfered your premium to **$serverName[$message[1]]** if this was a mistake, or wrong server id DM NeeL#5794
$setServerVar[PREMIUM;false;$guildID]
$onlyIf[$getServerVar[PREMIUM;$guildID]==true;:cross: This server does not have premium!]
$onlyIf[$message[1]!=;:x: A server ID is a required argument!]`
})

bot.command({
 name: "setpremium-server",
 code: `
 $setServerVar[PREMIUM;true;$message[1]]
 $setTimeout[31d;
 userID: $authorID]
 **$serverName[$message[1]]** Has been added as a premium server.
$onlyIf[$message[1]!=;:x: A server ID is a required argument!]
$onlyIf[$authorID==$botOwnerId;:x: Only the bot developer can assign premium servers.]`
})

bot.command({
 name: "removepremium-server",
 code: `
 $setServerVar[PREMIUM;false;$message[1]]
:white_check_mark: $serverName[$message[1]] server is no longer premium.
$onlyIf[$message[1]!=;:x: A server ID is a required argument!]
$onlyIf[$authorID==$botOwnerId;:x: Only the bot developer can remove premium servers.]`
})
 
bot.command({
  name: "setprefix",
  aliases: ['changeprefix'],
  code: `$author[Success;https://cdn.discordapp.com/attachments/760236507310850102/780441559468474408/6286_tada_animated.gif]
$description[**Done, my new prefix is** \`$message\`]
$color[RANDOM]
$setServerVar[prefix;$message]
$onlyIf[$message[1]!=;**You have to put a prefix, example** \`$getServerVar[prefix]setprefix /\`]
$onlyPerms[admin;❌ **You dont have** \`ADMIN\` **perms**]
$onlyIf[$argsCount<=3;❌ you cant put more than 3 characters for the prefix!] 
$onlyIf[$getServerVar[PREMIUM;$guildID]==true;❌ This command is only for **premium** servers!]
`
})


bot.command({
       name: "prefix",
        code: `
Server's prefix is: $getServerVar[prefix]
$onlyIf[$getServerVar[PREMIUM;$guildID]==true;❌ This command is only for **premium** servers!]`
})

bot.command({ 
    name: "roast",
    code: `  
$title[🔥ROASTED!!🔥]
$description[ 
**$username**  Roasted <@$mentioned[1]>

$randomText[My phone battery lasts longer than your relationships;It’s a shame you can’t Photoshop your personality;My middle finger gets a boner every time I see you;If I had a face like yours I’d sue my parents;I’d smack you, but that would be animal abuse;You’re so fat you could sell shade;You are proof that evolution can go in reverse;Learn from your parent's mistake... Use birth control;The smartest thing that ever came out of your mouth was a P_nis;Man you have more faces than Mt. Rushmore;You're entitled to your incorrect opinion!;Whoever told you to be yourself gave you really bad advice;I didn't change, I grew up you should try it sometime.;You sound reasonable, time to up my medication.;90% of your "beauty" can be removed with Kleenex;My hair straightener is hotter than you;I'd smack you, but that'd be animal abuse.;Hey I found your nose, it's on my business again.;Everyone brings happiness to a room, you just do it when you leave.;Your birth certificate is an apology letter from the c@nd@m manufacturer;I'd like to explain it to you, but I left my English-To-Dumbass Dictionary at home.;If laughter is the best medicine, your face must be curing the world.;You're so ugly you scare the crap out of the toilet;The only way you'll ever get laid is by crawling up a chickens ass and waiting.;You're so fake Barbie is. jealous.;If I wanted to kill myself, I'd climb your ego and jump to your IQ;Roses are red, violets are blue(or violet), God made me pretty, What happened to you?;Some babies are dropped on their heads, but you were clearly thrown at a wall!;Stop tryna be a smartass, you're clearly not smart.;Have you been shopping lately? They sell lives, you should go get one!;Oh a thought crossed your mind? Must've been a long and lonely journey...]]
$footer[By: AQUA MoD service!]
$addReactions[🔥;💥;💯]
$color[$getServerVar[color]]
$cooldown[5s;Chill man,wait %time%!]
$deleteIn[35s]
$onlyIf[$mentioned[1]!=$clientID;<@$authorID>,**This looks better **
>>> $randomText[You're as useless as "ueue" in "queue";Is your @$$ jealous of the amount of shit that just came out of your mouth;When you were born the doctor threw out the window and the window threw you back!]]
$argsCheck[>1;Please mention someone to **roast/toast** 😹!] 
` 
     
})

bot.command({
    name: "pastebin",
    code: `$title[$username's paste link]
$description[
 **Text:** "$message"
 
 **Link:** [Click here]($jsonRequest[https://normal-api.ml/pastebin?text=$replacetext[$message; ;+;-1];url;Error])
 **Raw link:** [Cick here]($jsonRequest[https://normal-api.ml/pastebin?text=$replacetext[$message; ;+;-1];raw;Error])
]
$color[RED]
$argsCheck[>1;Insert some text]`
})
 