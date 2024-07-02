import express from 'express';
import session from 'cookie-session';
import authRoutes from './routes/auth.js';
import hubRoutes from './routes/hubs.js';
import adminRoutes from './routes/admin.js';

const { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, SERVER_SESSION_SECRET, PORT = 4040 } = process.env;


const app = express();

app.use(express.static('wwwroot'));

app.use(session({ secret: SERVER_SESSION_SECRET, maxAge: 24 * 60 * 60 * 1000 }));

app.use(authRoutes);
app.use(hubRoutes);
app.use(adminRoutes);

// app.get('/api/auth/callback', (req, res) => {
//     // Handle the callback logic here
//     console.log('Callback received');
//     res.send('Callback handled');
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
