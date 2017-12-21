const Telegraf = require('telegraf');
const utils = require('./utils.js')
const config = require('./configs/config.json');

const bot = new Telegraf(config.telegram.key)

bot.start((ctx) => {
  console.log('Iniciado: ', ctx.from.id)
  return ctx.reply('Olá, como vai você ?')
})

// Adicionando os comandos aceitos pelo bot
bot.command('start', (ctx) => ctx.reply('Olá! Seja bem-vindo, eu sou o estudioso bot, e vou auxiliar você a utilizar o SIGA'))
bot.command('ajuda', (ctx) => ctx.reply('No que posso ajudar ?'));
bot.command('meu_nome', (ctx) => ctx.reply());
// bot.command('perfil', (ctx) => )
// bot.command('cadastrar', (ctx) => )

bot.startPolling()
