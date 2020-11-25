const dc = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, member) => {
  
let toplam = db.fetch(`yetkili.${member.id}.toplam`)
  
let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2}.toplam`))-Number(db.get(`yetkili.${uye1}.toplam`))).slice(0, 20).map((uye, index) => (index+1)+"-) "+ uye + " | " + db.get(`yetkili.${uye.id}.toplam`)).join('\n');
message.channel.send(new dc.MessageEmbed().setTitle('Top Özellik Listesi').setTimestamp().setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top).setColor("RANDOM"));
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["topteyit", "top", "teyit", "top-teyit"],
    permLevel: 0
};

exports.help = {
    name: "topteyit"
}

