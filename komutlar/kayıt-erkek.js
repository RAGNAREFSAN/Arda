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
let isim = args[1]
let yas = args[2]
if(!isim) return message.reply('')
if(!yas) return message.reply('')

member.setNickname(`${tag} ${isim} | ${yas}`)  
member.roles.add(kayıtlı)
member.roles.remove(kayıtsız)

const embed = new Discord.MessageEmbed()
.setAuthor(`Kayıt İşlemi Tamamlandı`)
.setDescription(`<@${member.user.id}> Aramıza Hoş Geldin.
<@${member.user.id}> Adlı Kullanıcıya <@&${kayıtlı.id}> Rolünü Verdim
<@${member.user.id}> Adlı Kullanıcının İsmini \`${tag} ${isim} | ${yas}\` Olarak Güncelledim`) 
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