const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['', '', ''].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply 
  
let tag = "STG"
const kayıtlı = message.guild.roles.cache.find(r => r.id === 'KızRolİd')
const kayıtsız = message.guild.roles.cache.find(r => r.id === 'Kayıtsızrolİd')
if(!kız) return message.reply('')
   
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Bir kişi etiketlemelisin')
