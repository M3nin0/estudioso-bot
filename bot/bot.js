const utils = require('./utils.js')
const Telegraf = require('telegraf');
const Markup = require('telegraf/markup')
const config = require('./configs/config.json');

// Instância do bot
const bot = new Telegraf(config.telegram.key)

// Comando inicial
bot.start((ctx) => {
  ctx.reply('Olá! Seja bem-vindo, eu sou o Estudioso_Bot, e vou auxiliar você a utilizar o SIGA\n' +
  'Vamos realizar o registro de seus dados, para que eu possa acessar seus dados',
  Markup.inlineKeyboard([
    Markup.callbackButton('➡️ Continuar', 'next')]).extra());

  utils.configAccount(bot);
})

bot.startPolling();
