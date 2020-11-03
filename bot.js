const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('771702458829373471'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG


//----------------------------------HOSGELDIN-----------------------------//

client.on('guildMemberAdd', member => {
    let stgmamy = member.user.id
var kurulus = moment(member.user.createdAt).add(7, 'days').fromNow()



var kontrol;
if (kurulus < 1296000000) kontrol = '**__Bu Hesap Güvenilir Değil__**'
if (kurulus > 1296000000) kontrol = '**__Bu Hesap Güvenilir Gözüküyor__**'
  moment.locale("tr");

    const logChannel = member.guild.channels.cache.find(channel => channel.id === "772228722572001300");
    member.guild.fetchInvites().then(guildInvites => {
      let embed3 = new Discord.MessageEmbed()
                     .setAuthor(member.guild.name)
                     .setDescription(`Selam <@${member.user.id}> Sunucumuza Hoş Geldin Seninle Birlikte \`${member.guild.memberCount}\` Kişi Olduk ! 
                     
                     Kayıt Olmak İçin Ses Odalarından Birisine Geçip Teyit Vermen Yeterli ! 
                     
                     Seninle <@&757925031241187349> Bu Roldeki Yetkililer İlgilenecektir. 
                     
                     Hesabını Oluşturma Tarihin: `+ moment(member.createdAt).format('DD MMMM YYYY HH:mm  \`M [ay], D [gün], H [saat], m [dakika], s [saniye]\`')
                       +` Önce Oluşturmuşsun  

                     Hesabının Güvenlik Durumu: `+ kontrol +`
                     
                     Bize Destek Olmak İçin \` ✯ \` Tagımızı Alabilirsin.`)
                     .setColor('0x1f1d1d')
                     .setFooter(client.user.username, client.iconUR)
                     client.channels.cache.get("772228722572001300").send(`Merhabalar <@${member.user.id}> Hoş Geldin.`)
                     client.channels.cache.get("772228722572001300").send(embed3)})
                    });;
//----------------------------------HOSGELDIN-----------------------------//