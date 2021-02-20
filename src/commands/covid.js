const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    name: "코로나",
    category: 'crawling',
    run: async (bot, message, args) => {
        const { features: [{attributes: {confirmed, recovered, deaths}}] } = await fetch('https://is.gd/hihhls').then(res => res.json());

        await axios.get('http://ncov.mohw.go.kr/').then(res => {
            if (res.status !== 200) return;

            const $ = cheerio.load(res.data);

            let str = ``;

            const corona = new MessageEmbed().setTitle('국내 코로나19 현황').setColor("RANDOM");

            $('ul.liveNum > li').each((i, element) => {
                str += `${$(element).find('.tit').text().trim().replace('(격리해제)', '').replace('(격리 중)', '')}: **${$(element).find('.num').text().trim().replace('(누적)', '')} ${$(element).find('.before').text().trim().replace('전일대비 ', '')}**\n`;
            });

            $('div#main_maplayout > button').each((i, element) => {
                corona.addField(`${$(element).find('.name').text()}`, `**${$(element).find('.num').text()} ${$(element).find('.before').text()}**`, true);
            });

            message.channel.send(corona.setDescription(str).setFooter(`질병관리본부 / ${$('div.liveNumOuter > h2 > a > span.livedate').text().replace('(', '').replace(')', '')} / 지차체에서 수집한 결과와 다를 수 있습니다.`));
            message.channel.send(new MessageEmbed().setTitle('전세계 코로나19 현황').setColor("RANDOM").setFooter('Johns Hopkins CSSE').setTimestamp().setDescription(`확진환자: **${parseInt(confirmed).toLocaleString()}명**\n완치: **${parseInt(recovered).toLocaleString()}명**\n사망자: **${parseInt(deaths).toLocaleString()}명**`));
        });
    }
};