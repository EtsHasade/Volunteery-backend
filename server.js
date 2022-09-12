const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://127.0.0.1:8080', 'http://10.0.0.2:8080/' ,'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        methods: ["GET", "POST"]
    }
});

// Express App Config
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
    secret: 'Secret27922-292-Baba',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://10.0.0.2:8080/','http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const eventiRoutes = require('./api/eventi/eventi.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const orgRoutes = require('./api/org/org.routes')
const connectSockets = require('./api/socket/socket.routes')

// routes
app.use('/api/eventi', eventiRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/org', orgRoutes)
connectSockets(io)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3050;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});



