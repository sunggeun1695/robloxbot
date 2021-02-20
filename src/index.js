const Discord = require('discord.js');
const bot = new Discord.Client();
const muted = '<#809331569676255243> 가서 사죄하세요.';
const config = require('./config.json')
const keepAlive = require('../server.js');
const db = require('quick.db')
const { readdirSync } = require('fs');
const moment = require("moment");
require("moment-duration-format");
const momenttz = require("moment-timezone");
const { join } = require('path');
const prefix = config.prefix;
process.env.NODE_ENV = process.argv[2];
qa = config.live_token;
live = config.qa_token;
graphics = config.graphics_token
cpu = config.cpu_token
main = config.main_token

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js"));

for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`));
  bot.commands.set(command.name, command);
}

bot.on("error", console.error);

bot.on('ready', () => {    console.log(        `[시스템]${bot.user.tag}로 로그인 하였습니다.`    );
    bot.user.setStatus('idle');
    const botgame = [        `.도움말`,        `.도움말 || ${bot.guilds.cache.size}서버에서 함께하는중`,        `.도움말 || ${bot.users.cache.size}명의 유저들과 노는중`,        `CPU 토큰 데이터 내보내기`];
    setInterval(() => {        
const activity = botgame[Math.floor(Math.random() * botgame.length)];    
    bot.user.setActivity(activity);    }, 3000);
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

// 뮤트
let Cooltime_Mute = 3 * 1000 
let User_Mute_Object = {}
bot.on('message', async message => {
  let MuteRole = bot.guilds.cache.get(message.guild.id).roles.cache.find(r => r.name === "Muted").id
  let MainRole = bot.guilds.cache.get(message.guild.id).roles.cache.find(r => r.name === "인증된맴버").id
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

// 욕감지
bot.on('message', async message => {

  let blacklisted = require('./forbiddenWord.json')

    let foundInText = false;
    for (var i in blacklisted) { 
      if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
    }

    if (foundInText) {
        const user = message.author.id;
        if(message.member.hasPermission('ADMINISTRATOR')) return;
        let vrole = message.guild.roles.cache.find(r=> r.name === "Muted")
        message.reply(`욕하지마라 이 개새끼야 씨발 님 Mute 드셈. \n사용한 욕: \`\`${message.content}\`\` ${muted}`);

        message.member.roles.add(vrole);
}
});

// . 뮤트
bot.on("message",  message => {if(message.content == '.' || message.content == '?') {
  if(message.member.hasPermission('ADMINISTRATOR')) return;
  let vrole2 = message.guild.roles.cache.find(r=> r.name === "Muted")
  message.reply(`\`\`.\`\` \`\`?\`\` 하나만 치지마세요. Mute 드셈.\n\n ${muted}`)
  message.member.roles.add(vrole2);
}})

// 멘션감지
bot.on('message', (message) => {
    if(message.content === '<@!807223266883797012>') {
        if(message.member.hasPermission('ADMINISTRATOR')) return;
        message.reply('개발자 바쁩니다. 멘션하지마세요')
    }
});
keepAlive();
bot.login(cpu);