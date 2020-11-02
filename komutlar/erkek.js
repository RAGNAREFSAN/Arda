const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['', '', ''].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply 

let tag = "STG"
const kayıtlı = message.guild.roles.cache.find(r => r.id === "ROL ID")
const kayıtsız = message.guild.roles.cache.find(r => r.id === "ROL ID")
const log = message.guild.channels.cache.find(c => c.id === "KANAL ID")

const isim = args[1];
if(!isim) return message.reply('Bir İsim Belirt.')
const yas = args[2];
if(!yas) return message.reply('Bir Yaş Belirt.')



const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);
if(!member) return message.reply('Birini Etiketlemelisin.')
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.reply('Üst Pozisyonda Bir Kullanıcıyı Kayıt Edemezsiniz.');
  
  
member.setNickname(`${tag} ${isim} | ${yas}`)
member.roles.add(kayıtlı)
member.roles.remove(kayıtsız) 
  
const tamamlandi = new Discord.MessageEmbed()
.setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
.setDescription(`<@${member.user.id}> Aramıza Hoş Geldin.
<@${member.user.id}> Adlı Kullanıcıya <@&${kayıtlı.id}> Rolünü Verdim
<@${member.user.id}> Adlı Kullanıcının İsmini \`${tag} ${isim} | ${yas}\` Olarak Güncelledim`)  
.setColor('BLACK')
.setFooter(`Striga #Code`)
log.send(tamamlandi)
  
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['erkek', 'e', 'boy', 'man'],
    name: 'erkek'
}
  