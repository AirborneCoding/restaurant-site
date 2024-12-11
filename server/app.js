import 'express-async-errors'

//express
import express from 'express';

const app = express()

// rest of the packages
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';

// database
import sequelize from './db/connectDB.js';

// routers
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import eventRouter from './routes/event.routes.js'
import reservationRouter from './routes/reservation.routes.js'
import orderRouter from './routes/order.routes.js'

// middlewares
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

// use packages
app.use(morgan('tiny'));
app.set('trust proxy', 1);
// app.use(
//     rateLimiter({
//         windowMs: 15 * 60 * 1000,
//         max: 60, // 100
//     })
// );
app.use(helmet());
// app.use(cors());
const corsConfig = {
    origin: ['http://localhost:3000'], // Your frontend origin
    // origin: true,
    // origin: "*",
    credentials: true, // Allows cookies to be sent
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ]
}
app.options("", cors(corsConfig))
app.use(cors(corsConfig));

app.use(xss());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(fileUpload());

// using routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/reservations', reservationRouter);
app.use('/api/v1/orders', orderRouter);

// use middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// connection
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await sequelize.authenticate();
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );

        // Syncing the database (development only - avoid using force: true in production)
        // if (process.env.NODE_ENV === 'development') {
        //     await sequelize.sync({ force: true });
        //     console.log('Database synced!');
        // }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

start();

// this attempt to set a cookie via a Set-Cookie header was blocked because it had the "SameSite=None" attribute but did not have the "Secure" attribute, which is required in order to use "SameSite=None"