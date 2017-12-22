const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

const fatecApi = require('fatec-api')

function autenticaSiga(user, passwd, bot){
  const minhaConta = new fatecApi.Account(user.toUpperCase(), passwd.toUpperCase());

  minhaConta.getName().then(nome => {
    bot.reply('Autenticação feita com sucesso, bem-vindo ' + nome);
  })
}

function configAccount(bot){

  var user = '';
  var passwd = '';

  // Criando passo-a-passo para a aquisição das informações do usuário
  const superWizard = new WizardScene('super-wizard',
    (ctx) => {
      ctx.reply('A configuração é rápida e simples, será feita em 3 etapas, vamos lá!', Markup.inlineKeyboard([
        Markup.callbackButton('➡️ Continuar', 'next')]).extra());

      return ctx.wizard.next();
    },
    (ctx) => {
      ctx.reply('Insira seu nome de usuário do SIGA');


      return ctx.wizard.next();
    },
    (ctx) => {
      // Salvando as informações
      user = ctx.message.text;

      ctx.reply('Insira sua senha');
      return ctx.wizard.next();
    },
    (ctx) => {
      // Salvando as informações
      passwd = ctx.message.text;
      
      ctx.reply('Lembrando que meu código está disponível no Github', Markup.inlineKeyboard([
        Markup.urlButton('Visitar Github ❤️', 'https://github.com/M3nin0/estudioso-bot'),
        Markup.callbackButton('➡️ Continuar', 'next')
      ]).extra())

      return ctx.wizard.next()
    }
  )

  const stage = new Stage([superWizard], { default: 'super-wizard' });
  bot.use(session());
  bot.use(stage.middleware());
}

module.exports = {
  configAccount
}
