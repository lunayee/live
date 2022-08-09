const NodeMediaServer = require("node-media-server");
const port = process.env.PORT || 7777;
const virtualDirPath = process.env.virtualDirPath || "";
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: port,
    //mediaroot: './public',
    dir: virtualDirPath,
    webroot: "./public",
    allow_origin: "*",
  },
};
var nms = new NodeMediaServer(config);
nms.run();

