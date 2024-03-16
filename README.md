# WebSocket Game

This repository contains a small implementation of a WebSocket server for a multiplayer game. The server manages game sessions and enables real-time communication between players.

## Description

The WebSocket Game repository showcases the development of a simple multiplayer game using WebSocket technology. It includes both the server-side implementation and the client-side interface for users to interact with the game.

## Technologies Used

- JavaScript
- Node.js
- Express.js
- WebSocket
- HTML
- CSS

## Getting Started

Follow these instructions to set up and run the WebSocket game on your local machine.

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies by running `npm install`.

### Running the Server

1. Start the server by running `node server.js`.
2. The server will listen on port 9091 by default.

### Accessing the Client Interface

1. Open a web browser.
2. Go to `http://localhost:9091` to access the client interface.

## Server (WebSocket-based)

The server manages game sessions and facilitates communication between players.

### WebSocket Server

- A WebSocket server is created to handle client connections and game logic.
- An HTTP server is set up to serve the client interface.

### Game Logic

- Users can create new games or join existing ones.
- Games are identified by unique IDs and track the number of balls and connected clients.
- The server handles game creation, joining, and gameplay logic.
- Each game maintains a state, including ball positions and colors.

## Client (WebSocket-based)

The client interface allows users to interact with the game in real-time.

### User Interface

- Buttons: Users can create new games or join existing ones.
- Input Field: Allows users to enter the ID of the game they want to join.
- Player List: Displays the list of players in the game.
- Game Board: Represents the game state with buttons representing balls that users can click to play.

### Events

- `click`: Triggered when a user clicks on a ball button to play.

## WebSocket Messages

- `create`: Sent to the server when a user wants to create a new game.
- `join`: Sent to the server when a user wants to join a game, including the game ID.

### WebSocket Responses

- `connect`: Received from the server upon connecting, providing a unique client ID.
- `create`: Received from the server when a new game is created, allowing the user to join.
- `join`: Received from the server when the user successfully joins a game, updating the UI with game details and player information.
- `update`: Received from the server to update the UI with changes to the game state.
- `end`: Received from the server to indicate the end of the game, displaying the outcome (win or lose) to the user.
