import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.BACKEND_PORT || 3000;

app.use(express.json());
app.use(cors());

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

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${port}`);
});
