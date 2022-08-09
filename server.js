// const ff = require('Buffer');
const NodeMediaServer = require("node-media-server");
const Express = require("express");
const cors = require("cors");
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

/*const app = Express();
app.use(cors());

const virtualDirPath = process.env.virtualDirPath || "";
app.use(virtualDirPath, Express.static(__dirname + "/public")); //使用靜態資料夾
const port = process.env.PORT || 7788;
const host = process.env.BASE_URL || "localhost";
const baseUrl = `http://${host}:${port}`;
app.listen(port, () => {
  console.log(`網頁：${baseUrl}`);
});*/
