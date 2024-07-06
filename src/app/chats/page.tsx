"use client";
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { auth } from '@/auth';
type Room = "OCD" | "Anxiety" | "Depression" | "ADHD";
const rooms: Room[] = ["OCD", "Anxiety", "Depression", "ADHD"];

interface Message {
  room: string, 
  color: string;
  message:{
  user: string;
  content: string;
  }
}

const Page: React.FC = () => {
 
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const socketIo = io('http://localhost:8000'); // Replace with your server's URL
    setSocket(socketIo);

    socketIo.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const joinRoom = (room: Room) => {
    if (socket) {
      if (currentRoom) {
        socket.emit('leaveRoom', { room: currentRoom });
      }
      socket.emit('joinRoom', { room });
      setCurrentRoom(room);
      setMessages([]); // Clear previous messages
      console.log(`Joined room: ${room}`);
    } else {
      console.error('Socket is not connected');
    }
  };

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      const message = { user: 'User', content: newMessage };
      socket.emit('event:message', { message });
      setNewMessage('');
    }
  };

  

  return (
    <div className='flex flex-col w-full h-full p-2 gap-5'>
      {!currentRoom && rooms.map((room) => (
        <div
          key={room}
          onClick={() => joinRoom(room)}
          className='flex flex-row w-full  bg-zinc-50 rounded-lg shadow-lg text-4xl  p-4 cursor-pointer'
        >
          {room}
        </div>
      ))}

      {currentRoom && (
        <div className='flex flex-col w-full h-full p-10 gap-5'>
          <h2 className='text-2xl'>Room: {currentRoom}</h2>
          <div className='flex flex-col w-full h-[30rem] bg-white rounded-lg shadow-lg p-4 overflow-y-auto'>
            {messages.map((message, index) => {
              return (<div key={index}  style={{ backgroundColor: message.color }} className=" flex flex-col mb-2 text-lg w-fit p-2 rounded-lg">
                <strong>{message.message.user}: </strong>
                <span className='text-md'>
                {message.message.content}
                </span>
              </div>)
             })}
          </div>
          <div className='flex flex-row h-fit w-fit text-lg'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className='flex-1 p-2 border border-gray-300 rounded-lg'
              placeholder='Type your message...'
            />
            <button
              onClick={sendMessage}
              className='ml-2  p-2 bg-blue-500 text-white rounded-lg'
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
