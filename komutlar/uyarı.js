const Striga = require('discord.js')
const datab = require('quick.db')

exports.run = async (message, args) => {
  
  if(!['ROL ID', 'ROL ID',].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Bu Komutu Kullanmak İçin Yeterli Yetkiye Sahip Değilsin.`)
  
  const uyarırol = message.guild.roles.cache.find(r => r.id === "")
  
  let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kullanıcı) return message.channel.send(`Kime Uyarı Vermek İstiyorsun ?`)
  
  datab.add(`uyari.${kullanıcı.id}`, 1)
  
  let sebep = args[1]
  if(!sebep) 
  
  const uyarımesaj = new Striga.MessageEmbed()
  .setAuthor('Uyarı')
  .setDescription(`${kullanıcı}`)
  
  
  
}