const { EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');

async function ErrorHandler(interaction, description) {
   /**
    * @param {ChatInputCommandInteraction} interaction
    */
   return await interaction.reply({
      embeds: [
         new EmbedBuilder()
            .setDescription(description)
            .setColor('Red'),
      ],
      ephemeral: true,
   });
}

module.exports = ErrorHandler;
