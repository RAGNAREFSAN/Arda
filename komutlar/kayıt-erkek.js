const dc = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
const kayıtlı = message.guild.roles.cache.find(r => r.id === '')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '')


const member = message.guild.member(message.mentions.member.first() ||  message.guild.member.cache.get(args[0]))
if(!member) return message.channel.send('Bir Kullanıcı Belirt.')
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('Etiketlenen kullanıcı ile Üst/Aynı pozisyonda bulunuyorsunuz.')
const x = message.guild.member(member)
let bilgi = db.get(`yetkili.${member.id}`);
  
db.add(`yetkili.${message.author.id}.erkek`,1 )
db.add(`yetkili.${message.author.id}.toplam`, 1)  
let toplami = db.fetch(`yetkili.${message.author.id}.toplam`)  

let tag = "TAG"
let isim = args[1]
let yas = Number(args[2])
if(!isim) return message.channel.send(`Bir İsim Belirt.`)
if(!yas) return message.channel.send(`Bir Yaş Belirt.`)
  
  
x.setNickname(`${tag} ${isim} | ${yas}`)
x.roles.add(kayıtlı)
x.roles.remove(kayıtsız)
  

  
const embed = new dc.MessageEmbed()
.setDescripiton(`
${member} Adlı Kullanıcı <@${message.author.id}> Tarafından Kayıt Edildi.
Kullanıcının Adı \`${tag} ${isim} | ${yas}\` Olarak Güncellendi ${kayıtlı} Rolü Verildi
`)
.setColor('BLUE')

  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek", "e", "man", "boy"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}

