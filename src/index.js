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
bot.events = new Discord.Collection();

['command', 'event'].forEach(handler => {
  require(`./handlers/${handler}`)
})
const commandFile = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith("js")); // commands 로 된 폴더가 있을경우 불러옴 (없을경우 오류출력)

for (const file of commandFile) {
  const command = require(join(__dirname, "commands", `${file}`)); // commanads 폴더에 있는 파일을 로드
  bot.commands.set(command.name, command);
}

bot.on("error", console.error);

// 봇 ready
bot.on('ready', () => {
  console.log(`${bot.user.id}로 로그인 성공!`); // 봇이 온라인이 되면 띄울말
  bot.user.setActivity('https://www.twitch.tv/sunggeunbot') //상태메시지
});

// 맘대로 코드 추가 가능한 부분
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

// keepAlive 및 봇을 켜는데 사용되는 곳
keepAlive();
bot.login(bot.token); // node src/index.js cpu 으로 로그인