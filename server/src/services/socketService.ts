import { Server as SocketServer } from 'socket.io';
import Message from '../models/Message';

export const initializeSocket = (io: SocketServer): void => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join user's room for private messaging
    socket.on('join', (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    // Handle private messages
    socket.on('private_message', async (data: {
      senderId: string;
      receiverId: string;
      message: string;
    }) => {
      try {
        // Save message to database
        const newMessage = new Message({
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.message
        });
        await newMessage.save();

        // Emit to receiver
        io.to(data.receiverId).emit('new_message', {
          ...newMessage.toObject(),
          timestamp: newMessage.timestamp
        });

        // Emit back to sender for confirmation
        socket.emit('message_sent', {
          ...newMessage.toObject(),
          timestamp: newMessage.timestamp
        });
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing', (data: { senderId: string; receiverId: string; isTyping: boolean }) => {
      socket.to(data.receiverId).emit('user_typing', {
        senderId: data.senderId,
        isTyping: data.isTyping
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};