import http from 'http';
import express from 'express';
import { Server } from 'ws';
import cors from 'cors';
import api from './routes';
import Database from './db/Db';

const app = express()
  .use(cors())
  .use('/api', api);

const server = http.createServer(app);

const wss = new Server({ server });

wss.on('connection', (ws, request) => {
  const { url } = request;

  switch (url) {
    case '/ws':
      Database.initClient(ws);
      break;
    default:
      ws.terminate();
      break;
  }
});

server.listen(process.env.PORT || 5000, () => console.log('Server started'));
