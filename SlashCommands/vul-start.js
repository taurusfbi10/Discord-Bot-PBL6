const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
require('dotenv').config();

module.exports = {
   category: 'Vulnerable Start',
   data: new SlashCommandBuilder()
      .setName('vul-start')
      .setDescription('Vulnerable Start')
      .addStringOption(options => options
         .setName('url')
         .setDescription('URL to scan')
         .setRequired(true)
      
         )
      .addStringOption(options1 => options1
         .setName('name')
         .setDescription('Name to scan')
         .setRequired(true)
      
         ),
         /**
          * @param {ChatInputCommandInteraction} interaction
          * @param {Client} client
          */
         async execute(interaction, client) {
            try {
               const url = interaction.options.getString('url');
               const name = interaction.options.getString('name');
            let settings = { method: "Get" };
            
            await interaction.reply({
               content: 'Please wait...'
            })

            const vulstart = await fetch('http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain='+url+'&sN='+name+'&sS=start', settings)
        .then(res => res.json())

        const VulStartEmbed = new EmbedBuilder()
         .setColor('#0099ff')
         .setTitle('Robust Scanner')
         .setDescription(vulstart["Information of Host"]+' is \n'+vulstart["vul_scanner_report"])
         .setFooter({text: 'Xeus and G', iconURL: 'https://avatars.githubusercontent.com/u/74602538?v=4'})
         .setTimestamp();

        return await interaction.editReply({
         content: '',
            embeds: [VulStartEmbed],
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