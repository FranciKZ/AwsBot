import { BotService } from './services/BotService';

BotService.start(process.env.TOKEN).then(() => {
    console.log('Logged In!');
})
.catch((error) => {
    console.log(`Error ${error}`);
})