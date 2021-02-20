// const byeChannelName = '안녕히가세욜'
const byeChannelName = 809375020190007347
const byeChannelComment = '님 안녕히가세요.'

module.exports = async (bot, member) => {
    const guild = member.guild;
    const deleteUser = member.user;
    const byeChannel = guild.channels.find(channel => channel.name == bot.byeChannelName);
  
    byeChannel.send(`<@${deleteUser.id}> ${bot.byeChannelComment}\n`);
    let muterole = message.guild.roles.cache.find(r=> r.name === "Muted")

    if(muterole) {
        member.ban('뮤트먹은 상태로 나갔습니다.')
    }
}