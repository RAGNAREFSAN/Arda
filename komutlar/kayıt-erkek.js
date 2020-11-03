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

db.add(`kayıtSayi.${message.author.id}`, 1)
db.add(`erkekUye.${message.author.id}`, 1)
let erkek = db.get(`erkekUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
const embed = new Discord.MessageEmbed()
.setTitle(`<a:kelebek:773077162948296775> Kayıt İşlemi Tamamlandı`)
    .addField(`<a:yildiz:773077160733704203> Kayıt Eden:`, `<@${message.author.id}> Tarafından Kayıt Edildi`) 
    .addField(`<a:prizma:773077138965266443> Kayıt Edilen:`, `<@${stg.user.id}> Kayıt Oldu`)
    .addField(`<a:space:773077533495001108> Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`<a:hayir:773077135883632660> Alınan Rol:`, `<@&${kayıtsız.id}> Rolleri Alındı`)
    .addField(`<a:bitaqua:773077155125919754> Yeni İsmin:`, `\`${tag} | ${isim} | ${yas}\` Olarak Güncellendi`) 
    .addField(`<a:alev:773077129259909171> Yetkili Toplam:`, `\`${kayıtlar}\` Kayıtlara Sahip.`)
.setFooter(`Striga #Code`)
.setColor('GREEN')
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