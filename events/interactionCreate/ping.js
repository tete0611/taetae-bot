const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  /**
   *
   * @param {import("discord.js").CommandInteraction} interaction
   */
  async execute(interaction) {
    if (interaction.commandName !== 'ping') return;
    await interaction.reply('Pong!');
  },
};
