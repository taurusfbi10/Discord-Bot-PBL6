const {Client, MessageEmbed ,MessageAttachment} = require('discord.js');

const bot = new Client();

const token = 'MTAzMjU0NjU3NTQ5NjUzMTk3OQ.Gpz9Ox.sFN9BQgtaSHvuDQquklDwM8oBtIdMVEPh7DID4';

const PREFIX = '!';

const fetch = require('node-fetch');
 
const Port_scanner_url = 'http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/port_scan?domain=testphp.vulnweb.com&option=default&protocol=tcp'

const Tech_scanner_url = 'http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/tech_scan?domain=testphp.vulnweb.com&db=True'

const CVE_Report_url = 'http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/cve_search?domain=testphp.vulnweb.com&db=True'
    
const Vul_Scanner_start_url = 'http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain=testphp.vulnweb.com&sN=pen1&sS=start'
const Vul_Scanner_status_url = 'http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain=testphp.vulnweb.com&sN=pen1&sS=status'
const Vul_Scanner_result_url = 'http://xeusnguyen.ddns.net:50000/apiv1/robust_scanner/vul_scan?domain=testphp.vulnweb.com&sN=pen1&sS=result'


let settings = { method: "Get" };

let data;

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
                if(cve['CVE report'].length > 1){
                    for(let i = 0; i < cve['CVE report'].length; i++)
                    {
                        CVEEmbed.addFields(
                            { name: "Description",  value: port['CVE report'][i][0], inline: true },
                            { name: "ID",  value: port['CVE report'][i][1], inline: true },
                            { name: "URL",  value: port['CVE report'][i][2], inline: true },
                            { name: "Solution",  value: port['CVE report'][i][3], inline: true }
                )}}

                else{
                    CVEEmbed.addFields(
                        { name: "Description",  value: port['CVE report'][0][0], inline: true },
                        { name: "ID",  value: port['CVE report'][0][1], inline: true },
                        { name: "URL",  value: port['CVE report'][0][2], inline: true },
                        { name: "Solution",  value: port['CVE report'][0][3], inline: true }
            )   
                }
                CVEEmbed.setFooter('Xeus and G', 'https://avatars.githubusercontent.com/u/74602538?v=4')
                CVEEmbed.setTimestamp();
            message.channel.send(CVEEmbed);
            break;   
        }
    
//          const PortEmbed = new MessageEmbed()
//             .setColor('#0099ff')
//             .setTitle('Robust Scanner')
//             .setDescription('----------------------------------------')
//             .addFields(
//                 { name: 'Infomation Host', value: port['Infomation of Host'], inline: false },
//                 { name: "Port",  value: port['Port report'][0][0], inline: true },
//                 { name: "Status",  value: port['Port report'][0][1], inline: true },
//                 { name: "Protocol",  value: port['Port report'][0][2], inline: true }
//             )
//             // .addField(
//             //     { name: "Port report",  value: pen['Port report'][0], inline: true }
//             // )
            
//             .setFooter('Xeus and G', 'https://avatars.githubusercontent.com/u/74602538?v=4')
//             .setTimestamp();
//         message.channel.send(PortEmbed);
//    }
// }

})
bot.login(token);
