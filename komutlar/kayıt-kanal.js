const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

    
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`);


if(args[0] === "sıfırla") {
const Darkcode = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Kayıt Kanal Sıfırla `)
.setColor('BLACK')
.setDescription(`Kayıt Olunacak Kanal Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(Darkcode)
db.delete(`kayıtkanal_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const DarkCode = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Kayıt Kanal Ayarla `)
.setColor('BLACK')
.setDescription(`Kayıt Olunacak Kanalı Belirtiniz !  `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(DarkCode)
}
db.set(`kayıtkanal_${message.guild.id}`, kanal.id)
const darkcode = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Kayıt Kanal Ayarlandı `)
.setColor('BLACK')
.setDescription(`Kayıt Olunacak Kanal ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcode)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıtkanal', 'kkanal', 'k-kanal'],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-kanal',
  description: 'Kayıt Olunacak Kanalı Ayarlar',
  usage: '!kayıt-kanal #kanal'
}