const Discord = require('discord.js');//DarkCode
const client = new Discord.Client();//DarkCode
const ayarlar = require('./ayarlar.json');//DarkCode
const chalk = require('chalk');//DarkCode
const moment = require('moment');//DarkCode
var Jimp = require('jimp');//DarkCode
const { Client, Util } = require('discord.js');//DarkCode
const fs = require('fs');//DarkCode
const db = require('quick.db');//DarkCode
const http = require('http');//DarkCode
const express = require('express');//DarkCode
require('./util/eventLoader.js')(client);//DarkCode
const path = require('path');//DarkCode
const snekfetch = require('snekfetch');//DarkCode
//DarkCode

var prefix = ayarlar.prefix;//DarkCode
//DarkCode
const log = message => {//DarkCode
    console.log(`${message}`);//DarkCode
};

client.commands = new Discord.Collection();//DarkCode
client.aliases = new Discord.Collection();//DarkCode
fs.readdir('./komutlar/', (err, files) => {//DarkCode
    if (err) console.error(err);//DarkCode
    log(`${files.length} komut yüklenecek.`);//DarkCode
    files.forEach(f => {//DarkCode
        let props = require(`./komutlar/${f}`);//DarkCode
        log(`Yüklenen komut: ${props.help.name}.`);//DarkCode
        client.commands.set(props.help.name, props);//DarkCode
        props.conf.aliases.forEach(alias => {//DarkCode
            client.aliases.set(alias, props.help.name);//DarkCode
        });
    });
});



//DarkCode
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


//DarkCode

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
//DarkCode
client.elevation = message => {
    if (!message.guild) {
        return;
    }
  //DarkCode
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
//DarkCode
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
//DarkCode
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
//DarkCode
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
//DarkCode
client.login(ayarlar.token);
//DarkCode