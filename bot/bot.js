const utils    =   require('./utils.js')
const Telegraf =   require('telegraf');
const Markup   =   require('telegraf/markup')
const config   =   require('./configs/config.json');
const mysql    =   require('mysql');

// Instância do bot
const bot = new Telegraf(config.telegram.key)

// Faz a conexão com o banco de dados
const conn = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.password,
  database : config.db.database
});

try{
  conn.connect()
  console.log('Conexão com o banco de dados realizada com sucesso!');
} catch(e) {
  console.log('Erro ao tentar realizar conexão com banco de dados\n' + e);
}

// Comando inicial
bot.start((ctx) => {
  ctx.reply('Olá! Seja bem-vindo, eu sou o Estudioso_Bot, e vou auxiliar você a utilizar o SIGA\n' +
  'Vamos realizar o registro de seus dados, para que eu possa acessar seus dados',
  Markup.inlineKeyboard([
    Markup.callbackButton('➡️ Continuar', 'next')]).extra());

  // Configura a conta do usuário
  utils.configAccount(bot, conn);
})

// Comandos ativos ao selecionar o keyboard
bot.hears('Notas', (ctx) => {

})

bot.hears('Faltas', (ctx) => {

})

bot.hears('Perfil', (ctx) => {

})

bot.hears('Sobre', (ctx) => {
  ctx.reply('Bot criado com ❤️ para facilitar o uso do SIGA');
})

bot.hears('☸ Configurações', (ctx) => {

})

// Definindo comandos básicos que poderão ser usados pelos usuários
bot.command('Menu', (ctx) => {
  ctx.reply('Opções disponíveis.', Markup
    .keyboard([
      ['Notas', 'Faltas'],
      ['Perfil', 'Sobre'],
      ['☸ Configurações']
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

bot.command('Ajustes', (ctx) => {

})

bot.command('Ajuda', (ctx) => {

})

bot.startPolling();
