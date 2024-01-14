import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Readable } from 'stream';

@WebSocketGateway()
export class AudioGateway {
  @WebSocketServer()
  server: Server;

  streamAudioToClient(audioStream: Readable) {
    audioStream.on('data', (chunk) => {
      this.server.emit('audioChunk', chunk.toString('base64')); // Emitting as base64 string
    });
  }
}
