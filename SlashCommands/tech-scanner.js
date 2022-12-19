const {ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
require('dotenv').config();

module.exports = {
   category: 'Tech Scanner',
   data: new SlashCommandBuilder()
      .setName('tech-scanner')
      .setDescription('Tech scanner')
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

            const tech = await fetch('http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/tech_scan?domain='+url+'&db=True', settings)
        .then(res => res.json())

        const TechEmbed = new EmbedBuilder()
         .setColor('#0099ff')
         .setTitle('Robust Scanner')
         .setDescription(tech["Information of Host"])
         .setFooter({text: 'Xeus and G', iconURL: 'https://avatars.githubusercontent.com/u/74602538?v=4'})
         .setTimestamp();

         if(tech['Tech Report'].length > 1){
            for(let i = 0; i < tech['Tech Report'].length; i++)
            {
                TechEmbed.addFields([
                    { name: "Name",  value: tech['Tech Report'][i][0], inline: true },
                    { name: "Type",  value: tech['Tech Report'][i][1], inline: true },
                    { name: "Version",  value: tech['Tech Report'][i][2], inline: true }
                ])}}

        else{
            TechEmbed.addFields([
                { name: "Name",  value: tech['Tech Report'][0][0], inline: true },
                { name: "Type",  value: tech['Tech Report'][0][1], inline: true },
                { name: "Version",  value: tech['Tech Report'][0][2], inline: true }
            ])   
        }

        return await interaction.editReply({
         content: '',
            embeds: [TechEmbed],
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