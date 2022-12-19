const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
require('dotenv').config();

module.exports = {
   category: 'Port Scanner',
   data: new SlashCommandBuilder()
      .setName('port-scanner')
      .setDescription('Port scanner')
      .addStringOption(options => options
         .setName('url')
         .setDescription('URL to scan')
         .setRequired(true)
      
         ),
         /**
          * @param {ChatInputCommandInteraction} interaction
          * @param {Client} client
          */
         async execute(interaction, client) {
            try {
               const url = interaction.options.getString('url');
            let settings = { method: "Get" };
            
            await interaction.reply({
               content: 'Please wait...'
            })

            const port = await fetch('http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/port_scan?domain='+url+'&option=default&protocol=tcp', settings)
        .then(res => res.json())

        const PortEmbed = new EmbedBuilder()
         .setColor('#0099ff')
         .setTitle('Robust Scanner')
         .setDescription(port["Information of Host"])
         .setFooter({text: 'Xeus and G', iconURL: 'https://avatars.githubusercontent.com/u/74602538?v=4'})
         .setTimestamp();

         if(port['Port report'].length > 1){
            for(let i = 0; i < port['Port report'].length; i++)
            {
                PortEmbed.addFields([
                    { name: "Port",  value: port['Port report'][i][0], inline: true },
                    { name: "Status",  value: port['Port report'][i][1], inline: true },
                    { name: "Protocol",  value: port['Port report'][i][2], inline: true }
                ])}}

        else{
            PortEmbed.addFields([
                { name: "Port",  value: port['Port report'][0][0], inline: true },
                { name: "Status",  value: port['Port report'][0][1], inline: true },
                { name: "Protocol",  value: port['Port report'][0][2], inline: true }
            ])   
        }

        return await interaction.editReply({
         content: '',
            embeds: [PortEmbed],
        })
            } catch (err) {
               console.log(err);
               return await interaction.reply({
                  embeds: [
                     new EmbedBuilder()
                        .setDescription('An error occurred!')
                  ],
                  ephemeral: true,
               })
            }
         }

}