import express from 'express';
import { Client } from 'discord.js';
import User from '../database/models/User';
import { getMember } from '../utils/guildGetters';
import config from '../config';

const server = async (client: Client) => {
    const app = express();

    // Enable json parsing
    app.use(express.json());

    // CORS
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );
        next();
    });

    // Test endpoint
    app.get('/', (req, res) => {
        res.send(
            `API works<br />Time on the server ${new Date().toLocaleString()}`,
        );
    });

    // Third party apps auth endpoint
    app.post('/check_key', async (req: any, res: any) => {
        console.log(req.body);
        const { key, device } = req.body;

        const user = await User.findOne({ license: key });

        if (user) {
            if (user.deviceID === device) {
                const member = getMember(user.discordID, client);
                res.send({
                    activations: 'ok',
                    user: { name: member?.user.username },
                });
            } else if (user.deviceID === '') {
                await User.updateOne({ license: key }, { deviceID: device });
                res.send({ activations: 'ok' });
            } else if (user.deviceID !== '' && user.deviceID !== device) {
                res.send({ message: 'devices error' });
            }
        } else {
            res.send({ message: 'license not found' });
        }
    });

    app.listen(config.port);
};

export default server;
