const { BitField } = require("discord.js")
const moment = require('moment-timezone');

const blackList = [
    '811546451041189888', // 아이스V2
    '479108435984515072', // 노래하는하리보
    '512333785338216465', // Server Captcha Bot
    '807861786010451998', // 하하하
]
// const welcomeChannelName = "안녕하세욜" // 입장 시 환영메시지를 전송 할 채널의 이름을 입력하세요.
const welcomeChannelId = 809374991438053387 // 입장 시 환영메시지를 전송 할 채널의 이름을 입력하세요.
const welcomeChannelComment = "어서오세요." // 입장 시 전송할 환영메시지의 내용을 입력하세요.
const roleName = "게스트" // 입장 시 지급 할 역할의 이름을 적어주세요.

module.exports = async (bot, member) => {
    // 가입한지 30분이 지나지 않았고,
    // 아바타 이미지가 없으면 밴.
    let condition1 = moment.duration(moment(new Date()).locale('ko').diff(moment(member.user.createdTimestamp).locale('ko'))).asMinutes() < 30;
    let condition2 = member.user.defaultAvatarURL == member.user.displayAvatarURL();
    let condition3 = member.user.username.indexOf('로쏠호') != -1;
    if (condition1) member.ban();
    if (condition1 && condition2) member.ban();

    if (condition3) member.ban();


    const guild = member.guild
    const newUser = member.user
    // const welcomeChannel = guild.channels.cache.find((channel) => channel.name == welcomeChannelName)
    const welcomeChannel = guild.channels.cache.find((channel) => channel.id == welcomeChannelId)

    welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`) // 올바른 채널명을 기입하지 않았다면, Cannot read property 'send' of undefined; 오류가 발생합니다.

    let guestrole = guild.roles.cache.find((r) => r.name === roleName)
    if (!guestrole) {
        try {
            guestrole = await guild.roles.create({
                data: {
                    name: roleName,
                    color: bot.colours.green_light,
                },
                reason: '',
            })
            guestrole.setPermissions(new BitField(0)); // 어떤 권한도 없는 상태
        } catch (e) {
            console.log(e.stack);
        }
    }

    member.roles.add(guestrole.id)


    // let banAlertChannel;
    // if(process.env.NODE_ENV == 'live') {
    //     banAlertChannel = bot.guilds.cache.find(x => x.name == '나긋해_유튜브_채널').channels.cache.find(x => x.name == '경고');
    // }
    // else if(process.env.NODE_ENV == 'qa') {
    //     banAlertChannel = bot.guilds.cache.find(x => x.name == '__youtube_test').channels.cache.find(x => x.name == '일반');
    // }
    // else {
    //     console.log('guildMemberAdd 버그났당..?');
    //     return;
    // }

    for (bl of blackList) {
        let kick_msg = member.user.username + '#' + member.user.discriminator + '이(가) 강퇴시켰습니다.';

        let user = member.guild.members.cache.find(x => x.id == bl)
        if (user) {
            // console.log(user.user)
            // banAlertChannel
            //     .send(`<@${user.id}> ${user.user.username}#${user.user.discriminator}는 블랙리스트에 있는 새끼라서 밴당했습니다.`);
            user.ban(kick_msg)
            user.send(`<@${user.id}> ${user.user.username}#${user.user.discriminator}는 블랙리스트에 있는 새끼라서 밴당했습니다..`)
            // break;
        }
    }
}