import express from 'express';
import { Test } from './test'; // Update the path accordingly

const app = express();
const port = 3670; // Choose the port you prefer

app.use(express.json());

app.get('/send-message', async (req, res) => {
  const { characterid, message } = req.query;

  if (!characterid || !message) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  try {
    const response = await Test.sendMessage(String(characterid), String(message));
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
