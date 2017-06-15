exports.run = async (client, msg, [searchMessage, searchChannel = msg.channel]) => {
  if (!/[0-9]{17,21}/.test(searchMessage)) throw "I was expecting a Snowflake.";
  const channel = await client.funcs.search.Channel(searchChannel, msg.guild);
  const m = await channel.fetchMessage(searchMessage);

  const attachments = m.attachments.size ? m.attachments.map(att => `<${att.url}>`) : null;

  return msg.send(m.content + (attachments ? `\n\n\n=============\n<Attachments>\n${attachments.join("\n")}` : ""), { code: "md" });
};

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  spam: false,
  mode: 2,
  cooldown: 30,
};

exports.help = {
  name: "content",
  description: "Get messages' raw content.",
  usage: "<message:str> [channel:str]",
  usageDelim: " ",
  extendedHelp: "",
};
