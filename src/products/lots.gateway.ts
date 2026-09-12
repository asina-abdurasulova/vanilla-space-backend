import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProductsService } from './products.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  },
})
export class LotsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly lotsService: ProductsService) {}


  @SubscribeMessage('join_lot')
  handleJoinRoom(@MessageBody() data: { lotId: number }, @ConnectedSocket() client: Socket) {
    client.join(`lot_${data.lotId}`);
    console.log(`Клиент ${client.id} зашел в торги лота №${data.lotId}`);
  }


  @SubscribeMessage('place_bid')
  async handlePlaceBid(@MessageBody() data: { lotId: number; userEmail: string; bidAmount: number }) {
    try {
      const lot = await this.lotsService.findOne(data.lotId);
      if (!lot) return;
      const newPrice = Number(lot.min_bid_rub) + Number(data.bidAmount);

      await this.lotsService.updatePrice(data.lotId, newPrice);

      const bidUpdate = {
        lotId: data.lotId,
        newPrice: newPrice,
        lastBid: {
          user: data.userEmail || 'Анонимный партнер',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          amount: newPrice,
        },
      };

      this.server.to(`lot_${data.lotId}`).emit('bid_updated', bidUpdate);
    } catch (error) {
      console.error('Ошибка WebSocket при обработке ставки:', error);
    }
  }
}