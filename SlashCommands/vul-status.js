const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
require('dotenv').config();

module.exports = {
   category: 'Vulnerable Status',
   data: new SlashCommandBuilder()
      .setName('vul-status')
      .setDescription('Vulnerable Status')
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

            const vulstatus = await fetch('http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain='+url+'&sN='+name+'&sS=status', settings)
        .then(res => res.json())

        const VulStatusEmbed = new EmbedBuilder()
         .setColor('#0099ff')
         .setTitle('Robust Scanner')
         .setDescription(vulstatus["Information of Host"])
         .setFooter({text: 'Xeus and G', iconURL: 'https://avatars.githubusercontent.com/u/74602538?v=4'})
         .setTimestamp();
         try {
            for(let i = 0; i < vulstatus['vul_scanner_report'].length; i++)
            {
                VulStatusEmbed.addFields([
                    { name: "Scanner",  value: vulstatus['vul_scanner_report'][i]['scanner'], inline: true },
                    { name: "Status",  value: vulstatus['vul_scanner_report'][i]['status'], inline: true },
                    { name: "------------------------------------->", value: "------------------------------------>", inline:false }
                ])
            }
        } catch (error) {
                // VulstatusEmbed.addFields(
                //     { name: "Scanner",  value: null, inline: true },
                //     { name: "Status",  value: null, inline: true })
        }

        return await interaction.editReply({
         content: '',
            embeds: [VulStatusEmbed],
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