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
                const command = msg.content.split(' ')[1].trim();
                
                if (command === 'start') {
                    awsService.startInstanceCommand(msg);
                } else if (command === 'stop') {
                    awsService.stopInstanceCommand(msg);
                } else if (command === 'status') {
                    awsService.checkStatusCommand(msg);
                }
            }
        });

        return this.client.login(token);
    }
}