const {Message, EmbedBuilder} = require('discord.js');

module.exports = {
   category: 'Port Scanner',
   name: 'portscanner',
   aliases: [],
   description: 'Port scanner',
   /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    */
   async execute(message, client, args) {
      const string = args.join(' ');
      let settings = { method: "Get" };

      const port = await fetch(string + 'apiv1/robust_scanner/port_scan?domain=zero.webappsecurity.com&option=default&protocol=tcp', settings)
        .then(res => res.json())

      const PortEmbed = new EmbedBuilder()
         .setColor('#0099ff')
         .setTitle('Robust Scanner')
         .setDescription('Port Report')
         .setFooter({text: 'Xeus and G', iconURL: 'https://avatars.githubusercontent.com/u/74602538?v=4'})
         .setTimestamp();

         if(port['Port report'].length > 1){
            for(let i = 0; i < port['Port report'].length; i++)
            {
                PortEmbed.addFields(
                    { name: "Port",  value: port['Port report'][i][0], inline: true },
                    { name: "Status",  value: port['Port report'][i][1], inline: true },
                    { name: "Protocol",  value: port['Port report'][i][2], inline: true }
        )}}

        else{
            PortEmbed.addFields(
                { name: "Port",  value: port['Port report'][0][0], inline: true },
                { name: "Status",  value: port['Port report'][0][1], inline: true },
                { name: "Protocol",  value: port['Port report'][0][2], inline: true }
    )   
        }

        return message.reply({embeds: [PortEmbed]});
   }
}
