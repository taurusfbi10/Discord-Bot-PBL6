const {SlashCommandBuilder} = require('@discordjs/builders');
const {Client, MessageEmbed ,MessageAttachment} = require('discord.js');

const bot = new Client();

const token = 'MTAzMjU0NjU3NTQ5NjUzMTk3OQ.Gpz9Ox.sFN9BQgtaSHvuDQquklDwM8oBtIdMVEPh7DID4';

const PREFIX = '!';

const fetch = require('node-fetch');
 
const Port_scanner_url = 'http://pbl6security.ddns.net:50000/apiv1/robust_scanner/port_scan?domain=zero.webappsecurity.com&option=default&protocol=tcp'

const Tech_scanner_url = 'http://pbl6security.ddns.net:50000/apiv1/robust_scanner/tech_scan?domain=zero.webappsecurity.com&db=True'

const CVE_Report_url = 'http://pbl6security.ddns.net:50000/apiv1/robust_scanner/cve_search?domain=zero.webappsecurity.com&db=True'
    
const Vul_Scanner_start_url = 'http://pbl6security.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain=zero.webappsecurity.com&sN=pen1&sS=start'
const Vul_Scanner_status_url = 'http://pbl6security.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain=zero.webappsecurity.com&sN=pen1&sS=status'
const Vul_Scanner_result_url = 'http://pbl6security.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain=zero.webappsecurity.com&sN=pen2&sS=result'


let settings = { method: "Get" };

const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back'));


bot.on('ready' ,() =>  {
    console.log('This bot is online!');
})


bot.on('message', async message => {

   let args = message.content.substring(PREFIX.length).split(" ");

   switch (args[0]) {
    case 'portscanner':
        let port =  await fetch(Port_scanner_url, settings)
                .then(res => res.json())
                const PortEmbed = new MessageEmbed()
                PortEmbed.setColor('#0099ff')
                PortEmbed.setTitle('Robust Scanner')
                PortEmbed.setDescription('Port Report')
                if(port['Port report'].length > 1){
                    for(let i = 0; i < port['Port report'].length; i++)
                    {
                        PortEmbed.addFields(
                            { name: "Port",  value: port['Port report'][i][0], inline: true },
                            { name: "Status",  value: port['Port report'][i][1], inline: true },
                            { name: "Protocol",  value: port['Port report'][i][2], inline: true }
                )}}

                else{
                    PortEmbed.addFields(
                        { name: "Port",  value: port['Port report'][0][0], inline: true },
                        { name: "Status",  value: port['Port report'][0][1], inline: true },
                        { name: "Protocol",  value: port['Port report'][0][2], inline: true }
            )   
                }
                PortEmbed.setFooter('Xeus and G', 'https://avatars.githubusercontent.com/u/74602538?v=4')
                PortEmbed.setTimestamp();
            message.channel.send(PortEmbed);
            break;   
    case 'techscanner':
        let tech =  await fetch(Tech_scanner_url, settings)
                .then(res => res.json())
                const TechEmbed = new MessageEmbed()
                TechEmbed.setColor('#0099ff')
                TechEmbed.setTitle('Robust Scanner')
                TechEmbed.setDescription('Tech Report')
                if(tech['Tech Report'].length > 1){
                    for(let i = 0; i < tech['Tech Report'].length; i++)
                    {
                        TechEmbed.addFields(
                            { name: "Name",  value: tech['Tech Report'][i][0], inline: true },
                            { name: "Type",  value: tech['Tech Report'][i][1], inline: true },
                            { name: "Version",  value: tech['Tech Report'][i][2], inline: true }
                )}}

                else{
                    TechEmbed.addFields(
                        { name: "Name",  value: tech['Tech Report'][0][0], inline: true },
                        { name: "Type",  value: tech['Tech Report'][0][1], inline: true },
                        { name: "Version",  value: tech['Tech Report'][0][2], inline: true }
            )   
                }
                TechEmbed.setFooter('Xeus and G', 'https://avatars.githubusercontent.com/u/74602538?v=4')
                TechEmbed.setTimestamp();
            message.channel.send(TechEmbed);
            break;
    case 'cvescanner':
        let cve =  await fetch(CVE_Report_url, settings)
                .then(res => res.json())
                const CVEEmbed = new MessageEmbed()
                CVEEmbed.setColor('#0099ff')
                CVEEmbed.setTitle('Robust Scanner')
                CVEEmbed.setDescription('CVE report')
                try {
                    if(cve['CVE report'].length > 0){
                        for(let i = 0; i < cve['CVE report'].length; i++)
                        {
                            for(let j = 0; j < cve['CVE report'][i].length; j++)
                            {
                                    CVEEmbed.addFields(
                                        { name: "ID",  value: cve['CVE report'][i][j][1]['ID'], inline: true },
                                        { name: "URL",  value: cve['CVE report'][i][j][1]['URL'], inline: true },
                                        { name: "Solution",  value: cve['CVE report'][i][j][1]['__PACKAGE'], inline: true })
                            }
                        }
                    }
                } catch (error) {
                    CVEEmbed.addFields(
                        { name: "ID",  value: null, inline: true },
                        { name: "URL",  value: null, inline: true },
                        { name: "Solution",  value: null, inline: true })
                }
                CVEEmbed.setDescription('Click link on the title for getting detail')
                CVEEmbed.setURL(CVE_Report_url)
                CVEEmbed.setFooter('Xeus and G', 'https://avatars.githubusercontent.com/u/74602538?v=4')
                CVEEmbed.setTimestamp();
            message.channel.send(CVEEmbed);
            break;
    case 'vulstart':
                const VulStartEmbed = new MessageEmbed()
                VulStartEmbed.setColor('#0099ff')
                VulStartEmbed.setTitle('Robust Scanner')
                VulStartEmbed.setDescription('Vulnerability Scan Now')
                VulStartEmbed.setFooter('Xeus and G', 'https://avatars.githubusercontent.com/u/74602538?v=4')
                VulStartEmbed.setTimestamp();
            message.channel.send(VulStartEmbed);
            break;   
    case 'vulstatus':
    let vulstatus =  await fetch(Vul_Scanner_status_url, settings)
            .then(res => res.json())
            const VulstatusEmbed = new MessageEmbed()
            VulstatusEmbed.setColor('#0099ff')
            VulstatusEmbed.setTitle('Robust Scanner')
            VulstatusEmbed.setDescription('Vulnerability Status')
            try {
                    for(let i = 0; i < vulstatus['vul_scanner_report'].length; i++)
                    {
                        VulstatusEmbed.addFields(
                            { name: "Scanner",  value: vulstatus['vul_scanner_report'][i]['scanner'], inline: true },
                            { name: "Status",  value: vulstatus['vul_scanner_report'][i]['status'], inline: true },
                            { name: "------------------------------------->", value: "------------------------------------>", inline:false }
                            )
                    }
            } catch (error) {
                VulstatusEmbed.addFields(
                    { name: "Scanner",  value: null, inline: true },
                    { name: "Status",  value: null, inline: true })
            }
            VulstatusEmbed.setFooter('Xeus and G', 'https://avatars.githubusercontent.com/u/74602538?v=4')
            VulstatusEmbed.setTimestamp();
        message.channel.send(VulstatusEmbed);
        break;
    case 'vulresult':
    let vulresult =  await fetch(Vul_Scanner_result_url, settings)
            .then(res => res.json())
            const VulResultEmbed = new MessageEmbed()
            VulResultEmbed.setColor('#0099ff')
            VulResultEmbed.setTitle('Robust Scanner')
            VulResultEmbed.setDescription('Vulnerability Result')
            console.log(vulresult['vul_scanner_report'][1])
            try {
                if(vulresult['vul_scanner_report'].length > 0){
                    for(let i = 0; i < vulresult['vul_scanner_report'].length; i++)
                    {
                        VulResultEmbed.addFields(
                            { name: "Vulnerability",  value: vulresult['vul_scanner_report'][i][1], inline: true },
                            { name: "Risk",  value: vulresult['vul_scanner_report'][i][2], inline: true },
                            { name: "Severity",  value: vulresult['vul_scanner_report'][i][3], inline: true },
                            { name: "CVE-CWE-ID", value: vulresult['vul_scanner_report'][i][4],inline:true},
                            { name: "URLs", value: vulresult['vul_scanner_report'][i][5],inline:true},
                            { name: "Reported By", value: vulresult['vul_scanner_report'][i][8],inline:true},
                            { name: "------------------------------------------------------------------------------------------------", value: "---------------------------------------------------------------------------------------------", inline:false}
                        )
                    }
                }
            } catch (error) {
            }
            VulResultEmbed.setDescription('Click link on the title for getting detail')
            VulResultEmbed.setURL(Vul_Scanner_result_url)
            VulResultEmbed.setFooter('Xeus and G', 'https://avatars.githubusercontent.com/u/74602538?v=4')
            VulResultEmbed.setTimestamp();
        message.channel.send(VulResultEmbed);
        break;
   }
})

bot.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = bot.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Đã gặp lỗi vui lòng thử lại!" });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(bot, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = bot.slashCommands.get(interaction.commandName);
        if (command) command.run(bot, interaction);
    }
})

bot.on('interaction', async (interaction) => {

})

bot.login(token);
