const fivem = require("fivem");
const discord = require("discord.js")
const axios = require("axios");
const config = require('./config.json');

const client = new discord.Client();

client.on("ready", () => {
    console.log(`Bot iniciado como ${client.user.tag}`)
    fetchUsersConnected();
    setInterval(fetchUsersConnected, config.timeout_user_fetch);
    console.log("Iniciado script para obtención de los user...")
});

client.on("message", (msg) => {
    if (msg.author.bot || !msg.content.startsWith(config.prefix)) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "status") {
        const server = new fivem.Server(config.server_ip);
        
        server.getServerStatus().then(encendido => {
            if (encendido) {
                server.getPlayers().then(users_conectados => {
                    const onEmbed = new discord.MessageEmbed()
                    .setColor('#32CD32')
                    .setTitle(`${config.nombre_servidor} esta Online!`)
                    .setDescription(`Entra a divertirte con tus amigos!.\n**Usuarios Online** ${users_conectados}`)
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/attachments/764431412706148353/764448046188199946/veneno_rp-1.png")
                    .setFooter('Made with 💚 by MarioMMJ');
                msg.channel.send(onEmbed);
                });
            }else{
                const offEmbed = new discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle(`${config.nombre_servidor} esta Offline!`)
                    .setDescription('El servidor esta apagado 😟, el staff está trabajando para que funcione, tened paciencia.')
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/attachments/764431412706148353/764448046188199946/veneno_rp-1.png")
                    .setFooter('Made with 💚 by MarioMMJ');
                msg.channel.send(offEmbed);
            }
            msg.delete();
        })
    } else if (command === "prueba") {
        msg.channel.send("Esto es una prueba");
    }
})

const fetchUsersConnected = () => {
    console.log("Obteniendo datos");

}




client.login(config.token);