# Callixa

A full-stack video conferencing web application built using the MERN stack, WebRTC, and Socket.IO. Callixa enables users to create and join meeting rooms, communicate through real-time video and audio, and exchange messages using an integrated chat interface.

---

## Features

- User Authentication (Register & Login)
- Create and Join Meeting Rooms
- Real-time Video Calling
- Real-time Audio Calling
- Real-time Chat
- Mute / Unmute Microphone
- Camera On / Off
- Copy Meeting ID
- Responsive and Minimal User Interface
- WebRTC Peer-to-Peer Communication
- Socket.IO Signaling Server

---

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- Socket.IO Client
- WebRTC

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- JSON Web Token (JWT)
- bcrypt

---

## Project Structure

```text
Callixa
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   ├── socket
│   │   └── webrtc
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── sockets
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Manasvibyte/Callixa.git

cd Callixa
```

---

## Backend Setup

Install backend dependencies.

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start the backend server.

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Future Improvements

- Screen Sharing
- Multi-participant Video Calls
- File Sharing
- Chat Notifications
- Meeting Recording
- User Profile Management
- Meeting History
- Dark Mode

---

## Live Demo

**Frontend**

Coming Soon

**Backend**

Coming Soon

---

## Author

**Manasvi Patidar**

GitHub: https://github.com/Manasvibyte

---

## License

This project was developed for educational and learning purposes.
