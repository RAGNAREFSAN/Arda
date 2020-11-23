const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const moment = require('moment')
const momentt = require("moment-duration-format")

const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\    
  
 if(!message.member.roles.cache.get(ayarlar.MuteYetkilisi) && !message.member.hasPermission('741973537669251163')) return message.channel.send('Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.')

  let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kişi) return message.channel.send(`Mute Atmam Gereken Kişiyi Belirt`)
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\    

  
  
  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\  
  
  db.add(`cezaPuan.${kişi.id}`, 5)
  
  let cezapuan = db.fetch(`cezaPuan.${kişi.id}`);
  
  db.add(`muteSorgu.${kişi.id}`, 1)
  
  let mutesorgu = db.fetch(`muteSorgu.${kişi.id}`);  
  
  

  
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\    

    let muted = message.mentions.members.first() || message.guild.members.cache.find(c => c.id === args[0]);
    if (!muted) { message.channel.send(`Mute Atmam Gereken Kişiyi Belirt.`);
   } else {
      if (muted.roles.highest.position >= message.member.roles.highest.position) 
      {
        return message.channel.send(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`);
      } else {
        let mutezaman = args[1]
          .replace("sn", "s")
          .replace("dk", "m")
          .replace("sa", "h")
          .replace("gün", "d");
        if (!mutezaman) {
          message.reply("bir zaman girmediniz!");
        } else {
          let sebep = args[2]
          if(!args[2]) return message.channel.send(`Bir Sebep Belirt.`)
           
          
          let vakit = mutezaman
            .replace("m", " dakika")
            .replace("s", " saniye")
            .replace("h", " saat")
            .replace("d", " d");
          


db.set(`muteli_${message.guild.id + kişi.id}`, 'muteli')
db.set(`süre_${message.mentions.users.first().id + message.guild.id}`, mutezaman)
          
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 
          
          try {
            client.channels.cache.get(ayarlar.MuteKanal).send(
              new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
                .setColor(`GREEN`)
                .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üye metin kanallarında susturuldu.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`) 
• Zaman: \`${vakit}\`
• Kanal: \`${message.channel.name}\`

• Sebep: \`${sebep}\``)
            );
            muted.roles.add(ayarlar.MuteliRol);
            message.react('✅')
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◆◆◆━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\ 

          } catch (e) {
            console.log(e);
          }

          setTimeout(async function() {
            muted.roles.remove(
              ayarlar.MuteliRol,
              client.channels.cache.get(ayarlar.MuteKanal).send(
              new Discord.MessageEmbed()
              .setColor('#494459')
              .setDescription(`<@${kişi.id}> (\`${kişi.id}\`) üyesinin metin kanallarında susturulması sonlandı.

• Yetkili: <@${message.author.id}> (\`${message.author.id}\`) 
• Zaman: \`${vakit}\`
• Kanal: \`${message.channel.name}\`

• Sebep: \`${sebep}\``))
              
            );
          }, ms(mutezaman));
        }
      }
    }
  }


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: 0,
  name: "mute"
}

exports.help = {
  name: "mute"
};