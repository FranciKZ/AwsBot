import { Client, Message } from 'discord.js';
import { AwsService } from './AwsService';

export class BotService {
    private static client: Client;

    static get Client(): Client {
        return this.client;
    }

    static start(token: string): Promise<string> {
        this.client = new Client();
        const awsService = new AwsService();

        this.client.on('message', (msg: Message) => {
            if(msg.content.startsWith('!val')) {
                const command = msg.content.split(' ')[1].trim().toLowerCase();
                
                switch (command) {
                    case 'start':
                        awsService.startInstanceCommand(msg);
                        break;
                    case 'stop':
                        awsService.stopInstanceCommand(msg);
                        break;
                    case 'status':
                        awsService.checkStatusCommand(msg);
                        break;
                    case 'help':
                        msg.reply('You can do `!val start`, `!val stop`, `!val status`, `!val ip` \:evilpatrick:');
                        break;
                    case 'ip':
                        msg.reply(`The IP of the server is ${process.env.SERVER_IP}`);
                        break;
                    case 'password':
                        msg.reply(`The password is ${process.env.SERVER_PASSWORD}`);
                        break;
                    default:
                        msg.reply('No command found. Try again later maybe. \:FeelsTriedMan:')
                }
            }
        });

        return this.client.login(token);
    }
}