import mongoose from 'mongoose';
import config from 'config';
import log from '../logger';


function connect() {
    const dbUrl = config.get('dbUrl') as string

    return mongoose
    .connect(dbUrl)
    .then(() => {
        log.info(`Database connected`);
    })
    .catch((err) => {
        log.error(`db error`, err);
        process.exit(1)
    });
}

export default connect;