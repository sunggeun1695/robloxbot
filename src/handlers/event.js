const { readdirSync } = require("fs")

module.exports = (bot) => {
    const load = dirs => {
        let dir_path = `./events/${dirs}/`;
        const events = readdirSync(dir_path).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            let eName = file.split('.')[0];
            bot.on(eName, evt.bind(null, bot));
        };
    };
    ["client"].forEach(x => load(x));
};