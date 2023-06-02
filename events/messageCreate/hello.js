const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  /**
   *
   * @param {import("discord.js").Message} message
   */
  async execute(message) {
    if (message.content === '안녕') {
      message.reply({ content: `**반갑습니다!**` });
    }
  },
};
