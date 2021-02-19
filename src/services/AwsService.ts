import { config, ConfigurationOptions, Credentials, EC2 } from 'aws-sdk';
import { Message } from 'discord.js';

const options: ConfigurationOptions = {
    credentials: new Credentials(process.env.ACCESS_KEY,  process.env.SECRET_KEY),
    region: process.env.REGION
};

const params = {
    InstanceIds: [
        process.env.INSTANCE_ID
    ]
};

export class AwsService {
    private instanceController: EC2;

    constructor() {
        config.update(options);
        this.instanceController = new EC2({ apiVersion: '2016-11-15' });
    }

    async startInstanceCommand(msg: Message) {
        try {
            const goodToStart = await this.checkState(['pending', 'running']);

            if (goodToStart) {
                await this.instanceController.startInstances(params).promise();
                msg.reply('Starting Instance... \:face_with_monocle:');
            } else {
                msg.reply('Server is already starting or in the process of doing so \:no_entry_sign:');
            }

        } catch (error) {
            console.log(error);
            msg.reply('There was an error starting the instance');
        }
    }
    
    async stopInstanceCommand(msg: Message) {
        try {
            const goodToStop = await this.checkState(['stopped', 'shutting-down', 'stopping']);

            if (goodToStop) {
                await this.instanceController.stopInstances(params).promise();
                msg.reply('Stopping Instance... \:wave:');
            } else {
                msg.reply('Server is already stopped or in the process of stopping \:no_entry_sign:')
            }
        } catch (error) {
            console.log(error);
            msg.reply('There was an error stopping the instance');
        }
    }

    async checkStatusCommand(msg: Message) {
        try {
            const response = await this.instanceController.describeInstances(params).promise();
            const state = response.Reservations[0].Instances[0].State.Name;

            switch (state) {
                case 'running':
                    msg.reply(`Instance is running a-okay \:smile:`);
                    break;
                case 'pending':
                    msg.reply('Instance is starting up');
                    break;
                case 'stopped':
                case 'shutting-down':
                case 'stopping':
                    msg.reply('Instance is stopping and/or stopped.')
                    break;
                default: 
                    msg.reply('Unknown instance state');
                    break;
            }
        } catch (error) {
            console.log(error);
            msg.reply('Could not fetch instance status');
        }
    }

    private async checkState(states: string[]): Promise<boolean> {
        try {
            const response = await this.instanceController.describeInstances(params).promise();
            const state = response.Reservations[0].Instances[0].State.Name;
            console.log(state);
            return states.indexOf(state) === -1;
        } catch (error) {
            return false;
        }
    }
}