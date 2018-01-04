const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

const fatecApi = require('fatec-api')

async function verifyAuth(user, passwd){
  /*
    Função auxiliar para a verificação da autenticação do usuário
  */

  const minhaConta = new fatecApi.Account(user.toUpperCase(), passwd.toUpperCase());

  await minhaConta.getName().then(nome => {
    console.log(nome + ' fez login com o bot');
  })
  return minhaConta.isLogged();
}

function configAccount(bot, conn){
    /*
      Função para realizar as configurações de conta do usuário e salva no banco de dados
    */

  var user = '';
  var passwd = '';

  // Criando passo-a-passo para a aquisição das informações do usuário
  const configAccount = new WizardScene('configAccount',
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

      auth = verifyAuth(user, passwd, bot);
      if (auth) {
        ctx.reply('O login foi feito com sucesso ❤️');
        ctx.reply('Para ver as opções utilize /Menu');

        return ctx.scene.leave()
      } else {
        ctx.reply('Não consegui fazer seu login 😓', Markup.inlineKeyboard([
          Markup.callbackButton('➡️ Inserir informações novamente', 'next')]).extra());
        return ctx.wizard.next();
      }
    }
  )

  const stage_config = new Stage([configAccount], { default: 'configAccount' });
  bot.use(session());
  bot.use(stage_config.middleware());
}

module.exports = {
  configAccount
}
