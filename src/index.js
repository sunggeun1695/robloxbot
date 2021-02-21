// 엄청나게 많은 모듈 불러오기
const Discord = require('discord.js');
const bot = new Discord.Client();
const muted = '<#812620008801959986> 가서 사죄하세요.';
const config = require('./config.json')
const keepAlive = require('../server.js');
const db = require('quick.db')
const forbiddenWord = require('./util/forbiddenWord.json');
const { readdirSync } = require('fs');
const moment = require("moment");
require("moment-duration-format");
const momenttz = require("moment-timezone");
const { join } = require('path');
const prefix = config.prefix;
process.env.NODE_ENV = process.argv[2];
bot.token = config.live_token;
bot.token = config.qa_token;
bot.token = config.graphics_token
bot.token = config.cpu_token
bot.token = config.main_token

// bot.commands 및 bot.aliases 불러오기
bot.commands = new Discord.Collection();
bot.event = new Discord.Collection();
bot.aliases = new Discord.Collection();

['command', 'event'].forEach(handler => {
  require(`./handlers/${handler}`)
})

const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));

for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  bot.commands.set(command.name, command);
}

bot.on("error", console.error);

bot.on('ready', () => {
  console.log(`${bot.user.id}로 로그인 성공!`); // 봇이 온라인이 되면 띄울말
  bot.user.setActivity('https://www.twitch.tv/sunggeunbot') //상태메시지
});

bot.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();

    if(!bot.commands.has(command)) return;

    try {
      bot.commands.get(command).run(bot, message, args);
    } catch (error) {
      console.error(error);
    }
  }
})

let Cooltime_Mute = 3 * 1000 
let User_Mute_Object = {}
bot.on('message', async message => {
  let MuteRole = bot.guilds.cache.get(message.guild.id).roles.cache.find(r => r.name === "Muted").id
  if (message.author.bot || !message.guild) return
  MuteRole = message.guild.roles.cache.find(r => r.id == MuteRole)
  const M_Author = message.author
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    let Author_Object = User_Mute_Object[M_Author.id]
    if (!Author_Object) {
      User_Mute_Object[M_Author.id] = {
        time: 0,
        interval: null,
        muted: false
      }
    } else {
      if (Author_Object.interval != null) {
        if (Cooltime_Mute >= Author_Object.time && !Author_Object.muted) {
          message.member.roles.add(MuteRole)
          Author_Object.muted = true
          message.reply(`단타 도배하지마세요. 씨발 님 Mute 드셈. \n 전 채팅과의 간격 ${Author_Object.time}ms ${muted}`)
        }
        clearInterval(Author_Object.interval)
        Author_Object.interval = null
      } else if (!Author_Object.muted) {
        Author_Object.interval = setInterval(() => {
          Author_Object.time++
        }, 1)
      }
      Author_Object.time = 0
    }
  }
})

bot.on('message', async message => {

  let blacklisted = require('./util/forbiddenWord.json')

    let foundInText = false;
    for (var i in blacklisted) { 
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
    }

    if (foundInText) {
        const user = message.author.id;
        let mutedrole = message.guild.roles.cache.find(r=> r.name === "Muted")
        if(message.member.hasPermission('ADMINISTRATOR')) return;
        if(message.content == 'ㅗㅜㅑ' || message.content == 'ㅗㅜ') return;
        message.reply(`욕하지마라 이 개새끼야 씨발 님 Mute 드셈. \n사용한 욕: \`\`${message.content}\`\` \n${muted}`);

        message.member.roles.add(mutedrole);
}
});

bot.on("message",  message => {if(message.content == '.' || message.content == '?') {
  message.member.roles.add(mutedrole);
  if(message.member.hasPermission('ADMINISTRATOR')) return;
  message.reply(`\`\`.\`\` \`\`?\`\` 하나만 치지마세요. Mute 드셈.\n\n`)
}})

// keepAlive 및 봇을 켜는데 사용되는 곳
keepAlive();
bot.login(bot.token); // node src/index.js cpu 으로 로그인