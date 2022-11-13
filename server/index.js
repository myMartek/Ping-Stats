import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import http from 'http';
import { Server } from 'socket.io';
import { addSocket } from './socket.js';
import { authorize } from '@thream/socketio-jwt';

const app = express();
const port = process.env.BACKEND_PORT || 3000;

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ['GET', 'POST']
  }
});

io.use(
  authorize({
    secret: process.env.TOKEN_KEY
  })
);

addSocket(io);

app.post('/api/login', async(req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send('All input is required');
    }

    // Validate if user exist in our database
    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
      // Create token
      const token = jwt.sign(
        { username },
        process.env.TOKEN_KEY,
        {
          expiresIn: '8h'
        }
      );

      // user
      res.status(200).json({ token });
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${port}`);
});
