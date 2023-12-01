import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventName } from './constants/event.constant';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  socketIds = [];
  @SubscribeMessage(EventName.NEW_USER)
  async handleIncomingUsersEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const connectedUser = await this.server.to('1').fetchSockets();
    console.log(connectedUser);
  }

  handleConnection(client: Socket) {
    client.on('connection', () => {
      this.server.emit('user-join', client.id);
    });
  }

  handleDisconnect(client: Socket): any {
    this.server.emit('user-leave', 'data');
  }
}
