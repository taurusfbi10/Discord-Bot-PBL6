const {Message, EmbedBuilder} = require('discord.js');

module.exports = {
   category: 'Vulnerable Start',
   name: 'vulstart',
   aliases: [],
   description: 'Vulnerable Start',
   /**
    * @param {Message} message
    * @param {Client} client
    * @param {String[]} args
    */
   async execute(message, client, args) {
      const string = args.join(' ');
      let settings = { method: "Get" };

      const vulstart = await fetch(string + 'apiv1/robust_scanner/port_scan?domain=zero.webappsecurity.com&option=default&protocol=tcp', settings)
        .then(res => res.json())

      const VulStartEmbed = new EmbedBuilder()
         .setColor('#0099ff')
         .setTitle('Robust Scanner')
         .setDescription('Port Report')
         .setFooter({text: 'Xeus and G', iconURL: 'https://avatars.githubusercontent.com/u/74602538?v=4'})
         .setTimestamp();
        return message.reply({embeds: [VulStartEmbed]});
   }
}
