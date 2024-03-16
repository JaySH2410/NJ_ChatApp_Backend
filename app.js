// Import required modules
const express = require('express');
const http = require("http");
const SocketServices = require("./socket");
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());

const server = http.createServer(app);
const socketServices = new SocketServices();

socketServices.io.attach(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Http server started at port:${PORT}`);
});

socketServices.initListener();
