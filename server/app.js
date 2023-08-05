require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cors = require("cors");
const { connectDB, User } = require("./database/database");
connectDB();
const jwt = require("jsonwebtoken");
const { v4: uuidV4 } = require("uuid");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const { instrument } = require("@socket.io/admin-ui");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    credentials: true,
  },
});

// GLOBAL VARIABLES
const user = [];

// ROUTES
app.get("/", (req, res) => res.send("Recieved a get request in base route"));

app.patch("/token", authenticateUser, async (req, res) => {
  console.log(req.body);
  const { refreshToken } = req.body;
  const response = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (typeof response === "string") {
    return res.sendStatus(403);
  }
  const { userName } = response;
  const accesssToken = jwt.sign(
    { userName: userName },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "120s" }
  );
  res.status(200).json({ refreshToken: refreshToken }).end();
});

app.post("/login", authenticateUser, async (req, res) => {
  console.log(req.body);
  const { userName } = req.body;

  const accesssToken = jwt.sign(
    { userName: userName },
    process.env.ACCESS_TOKEN_SECRET
    // { expiresIn: "120s" }
  );
  const refreshToken = jwt.sign(
    { userName: userName },
    process.env.REFRESH_TOKEN_SECRET
  );
  const id = uuidV4();
  res
    .status(200)
    .json({
      userName: userName,
      accesssToken: accesssToken,
      refreshToken: refreshToken,
      id: id,
    })
    .end();
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { userName, password } = req.body;
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      userName: userName,
      password: hashPassword,
    });
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log("Hashing Error: ", error.message);
    res.sendStatus(500);
  }
});

// Middleware
async function authenticateUser(req, res, next) {
  console.log(req.body);
  const { userName, password } = req.body;
  try {
    const { password: dbPassword } = await User.findOne({ userName: userName });
    const isValid = await bcrypt.compare(password, dbPassword);
    isValid ? next() : res.sendStatus(401);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
// FINAL
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  console.log("socket: ", id);
  socket.join(id);

  socket.on("send-message", ({ members, msg, convId, name }) => {
    console.log(members, msg, convId);
    members.forEach((member) => {
      socket
        .to(member)
        .emit("receive-message", { members, msg, convId, senderId: id, name });
    });
    // if (room) {
    //   socket.to(room).emit("recieve-message", message);
    // } else {
    //   socket.broadcast.emit("recieve-message", message);
    // }
  });

  // socket.on("join-room", (room, cb) => {
  //   socket.join(room);
  //   cb instanceof Function && cb(room);
  // });
});

instrument(io, { auth: false });
