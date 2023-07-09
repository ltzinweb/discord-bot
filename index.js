/* Setup

  1. Crie um arquivo .env (clique em adicionar arquivo e remaneje-o para .env)

  2. Coloque "BOT_TOKEN=" (sem aspas) no arquivo .env seguido pelo seu token Discord Bot (sem espaços!)
  exemplo: BOT_TOKEN=SEU_TOKEN_DO_BOT
*/

/* Se você usar uptimerobot para fazer ping, exclua esta linha e a linha 20

const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});

*/

//const
const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const prefix = 'k.'; // Prefixo para os comandos
const { Client, Intents } = require('discord.js');



// Definindo o status personalizado
  client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}!`);

    
  client.user.setActivity('+cmd', { type: 'STREAMING' });
  client.user.setStatus('online');
});



client.on('message', message => {
   if (message.author.bot) {
        return;
    }
  if (message.content.startsWith('+ola')) {
    // O comando é "+olá"
    message.channel.send('ola!');
  } else if (message.content.startsWith('+dizer')) {
    // O comando é "+say [mensagem]"
    const args = message.content.split(' ');
    args.shift(); // Remova o próprio comando da matriz de argumentos
    const text = args.join(' ');
    message.channel.send(text);
  }

else if (message.content.startsWith('+cmd')) {
  message.channel.send('+ola, +dizer, +cmd, +inscritos');
}
// O comando é "+ban"
  else if (message.content.startsWith('+ban')) {
        // Verifique se o autor da mensagem tem permissão para banir membros
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            // Se não tiver permissão, envie uma mensagem de erro
            message.channel.send('Você não tem permissão para banir membros.');
            return;
        }

        // Verifique se mencionaram um usuário para banir
        const userToBan = message.mentions.users.first();
        if (!userToBan) {
            // Se não mencionaram um usuário, envie uma mensagem de erro
            message.channel.send('Você precisa mencionar um usuário para banir.');
            return;
        }

        // Obtenha o membro correspondente ao usuário mencionado
        const memberToBan = message.guild.members.cache.get(userToBan.id);

        // Verifique se o membro existe e pode ser banido
        if (memberToBan && memberToBan.bannable) {
            // Banir o membro
            memberToBan.ban()
                .then(() => {
                    // Envie uma mensagem de confirmação
                    message.channel.send(`O usuário ${userToBan.username} foi banido com sucesso.`);
                })
                .catch((error) => {
                    // Em caso de erro, envie uma mensagem de erro
                    console.error(`Erro ao banir o usuário: ${error}`);
                    message.channel.send('Ocorreu um erro ao banir o usuário.');
                });
        } else {
            // Se o membro não puder ser banido, envie uma mensagem de erro
            message.channel.send('Não é possível banir o usuário mencionado.');
        }
    }
});






// teste
async function getSubscriberCount(channelId) {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=SUA_API_DO_YT`);
    const { subscriberCount } = response.data.items[0].statistics;
    return subscriberCount;
  } catch (error) {
    console.error('Erro ao obter número de inscritos:', error);
    return null;
  }
}
client.on('message', async (message) => {
  if (message.content.startsWith('+inscritos')) {
    const channelId = 'SEU_ID_AQUI'; // Substitua pelo ID do canal do YouTube desejado
    const subscriberCount = await getSubscriberCount(channelId);
    if (subscriberCount) {
      message.channel.send(`O canal possui ${subscriberCount} inscritos.`);
    } else {
      message.channel.send('Não foi possível obter o número de inscritos.');
    }
  }
});


client.login(process.env.BOT_TOKEN);
