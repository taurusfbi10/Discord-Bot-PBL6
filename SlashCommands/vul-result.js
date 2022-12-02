const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
require('dotenv').config();
fs = require('fs');

module.exports = {
   category: 'Vulnerable Result',
   data: new SlashCommandBuilder()
      .setName('vul-result')
      .setDescription('Vulnerable Result')
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

            const vulresult = await fetch('http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain='+url+'&sN='+name+'&sS=result&save=True', settings)
        .then(res => res.json())

        const VulResultEmbed = new EmbedBuilder()
         .setColor('#0099ff')
         .setTitle('Robust Scanner')
         .setURL('http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/get_report?name='+name)
         .setDescription(vulresult["Information of Host"])
         .setFooter({text: 'Xeus and G', iconURL: 'https://avatars.githubusercontent.com/u/74602538?v=4'})
         .setTimestamp();
         try {
                for(let i = 0; i < vulresult['vul_scanner_report'].length; i++)
                {
                    VulResultEmbed.addFields([
                        { name: "Vulnerability",  value: vulresult['vul_scanner_report'][i]['NameVulnerable'], inline: true },
                        { name: "Risk",  value: vulresult['vul_scanner_report'][i]['Risk'], inline: true },
                        { name: "Severity",  value: vulresult['vul_scanner_report'][i]["Serverity"].toString(), inline: true },
                        { name: "CVE-CWE-ID", value: vulresult['vul_scanner_report'][i]["CVE-CWE ID"],inline:true},
                        { name: "URLs", value: vulresult['vul_scanner_report'][i]["URL Target"],inline:true},
                        { name: "Reported By", value: vulresult['vul_scanner_report'][i]["Report By"],inline:true},
                        { name: "---------------------------------------------------------------------------------------", value: "------------------------------------------------------------------------------------", inline:false}
                    ])
                }
            }
         catch (error) {
        }

        return await interaction.editReply({
         content: '',
            embeds: [VulResultEmbed],
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