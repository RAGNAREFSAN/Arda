const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['771457523281559552', '771695296291668000',].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply 
  
let tag = "STG"
const kayıtlı = message.guild.roles.cache.find(r => r.id === '771701237065973760')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '771702458829373471')

if(!kayıtlı) return message.reply('Kayıtlı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Kayıtsız Rolü Ayarlanmamış.') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Kimi Kayıt Etmem Gerekiyor ?')
let stg = message.guild.member(member)
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('')
if(!yas) return message.reply('')

stg.setNickname(`${tag} ${isim} | ${yas}`)  
stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız)

const embed = new Discord.MessageEmbed()
.setTitle(`Kayıt İşlemi Tamamlandı`)
    .addField(`Kayıt Eden`, `<@${message.author.id}>`) 
    .addField(`Verilen Rol`, `<@&${kayıtlı.id}>`) 
    .addField(`Alınan Rol`, `<@&${kayıtsız.id}>`)
    .addField(`Yeni İsmin`, `\`${tag} | ${isim} | ${yas}\``) 
.setFooter(`Striga #Code`)
.setColor('0x964396')
client.channels.cache.get('772228722572001300').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['erkek','e','man','boy'],
    permLevel: 0
};

exports.help = {
    name: 'erkek',
};