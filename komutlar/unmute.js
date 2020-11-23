const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\    
  
 if(!message.member.roles.cache.get(ayarlar.MuteYetkilisi) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.')

  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kişi) return message.channel.send(`Mutesini Açmam Gereken Kişiyi Belirt.`)
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\  



//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\    
  
  db.add(`cezaPuan.${kişi.id}`, -5)
  
  let cezapuan = db.fetch(`cezaPuan.${kişi.id}`);
  
  db.add(`muteSorgu.${kişi.id}`, -1)
  
  let mutesorgu = db.fetch(`muteSorgu.${kişi.id}`);  
  
          

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\          
            kişi.roles.remove(ayarlar.MuteliRol);
            message.react("✅")

            const sadxstriga = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true }))
  .setColor(`PURPLE`)
  .setTimestamp()
  .setDescription(`• Yetkili: <@${message.author.id}> | \`${message.author.id}\`
• Mutesi Kalkan: <@${kişi.id}> | \`${kişi.id}\`
• Kanal: \`${message.channel.name}\``)
client.channels.cache.get(ayarlar.MuteKanal).send(sadxstriga)
  
  db.set(`muteli_${message.guild.id + kişi.id}`, 'muteli')
db.set(`süre_${message.mentions.users.first().id + message.guild.id}`, mutezaman)
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\
  

}
      
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute"],
  permLevel: 0,
}

exports.help = {
  name: "unmute"
};