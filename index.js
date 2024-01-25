const http = require("http")
const app = require("express")()
app.listen(9091, () => console.log("app listining on 9091"))
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))
const websocketServer = require("websocket").server
const server = http.createServer()


server.listen(9090, () => {
  console.log("listening")
})

const clients = {}
const games = {}
const webServer = new websocketServer({
  "httpServer": server
})

webServer.on("request", request => {
  const connection = request.accept(null, request.origin)
  connection.on("open", () => console.log('opend'))
  connection.on("close", () => console.log('opend'))
  connection.on("message", message => {
    const result = JSON.parse(message.utf8Data)

    // user create new game
    if (result.method === "create") {
      const clientId = result.clientId
      const gameId = guid()
      games[gameId] = {
        "id": gameId,
        "balls": 15,
        "clients": []
      }
      const payLoad = {
        method: "create",
        "game": games[gameId]
      }

      for (let client of Object.keys(clients)) {
        const con = clients[client].connection
        con.send(JSON.stringify(payLoad))
      }
    }

    if (result.method === "join") {
      const clientId = result.clientId
      const gameId = result.gameId
      const game = games[gameId]
      if (game.clients.length >= 2) {
        return 0
      }
      const color = { "0": "Red", "1": "blue" }[game.clients.length]
      game.clients.push({
        clientId,
        color
      })

      if (game.clients.length === 2) updateGameState()
      const payLoad = {
        "method": "join",
        game
      }
      game.clients.forEach(c => {
        clients[c.clientId].connection.send(JSON.stringify(payLoad))
      })
    }

    if (result.method === "play") {
      const gameId = result.gameId
      const game = games[gameId]
      const ballId = result.ballId
      const color = result.color
      let state = games[gameId].state
      if (!state) {
        state = {}
      }
      state[ballId] = color
      games[gameId].state = state
      winner = chickWinner(state)
      if (winner) {
        console.log(winner)
        game.clients.forEach(c => {
          if (c.color === winner)
            clients[c.clientId].connection.send(JSON.stringify({ "method": "end", "status": "win" }))
          else
            clients[c.clientId].connection.send(JSON.stringify({ "method": "end", "status": "lose" }))
        })
      }


    }
  })

  const clientId = guid()
  clients[clientId] = {
    connection
  }

  const payLoad = {
    "method": "connect",
    clientId
  }

  connection.send(JSON.stringify(payLoad))

})

function chickWinner(state) {
  let red = 0
  let blue = 0
  for (let i of Object.keys(state)) {
    if (state[i] === "Red") red += 1
    if (state[i] === "blue") blue += 1
  }
  console.log("red" + red)
  console.log("blue" + blue)
  if (red + blue == 15) {
    if (blue > red) return "blue"
    return "red"
  }
  return false
}

function updateGameState() {
  for (const g of Object.keys(games)) {
    const game = games[g]
    const payLoad = {
      "method": "update",
      game
    }
    game.clients.forEach(c => {
      clients[c.clientId].connection.send(JSON.stringify(payLoad))
    })

    setTimeout(updateGameState, 500)
  }
}
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
