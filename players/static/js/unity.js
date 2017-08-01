unity_startup = function () {
  console.log("Sending Messages.");

  var user_id = VIEW_OWNER_ID;
  var path = GAME_URL_PATH;
  var proc = (GAME_URL_BASE.substr("http://".length)).split(":");
  var host = proc[0]; // + path;
  var port = proc[1];

  console.log(GAME_URL_BASE);
  console.log("Host: " + host);
  console.log("Port: " + port);
  console.log("View owner: " + VIEW_OWNER_ID);

  SendMessage("World Manager", "SetGameURL", host);
  SendMessage("World Manager", "SetGamePort", parseInt(port));
  SendMessage("World Manager", "SetUserId", parseInt(user_id))
  SendMessage("World Manager", "EstablishConnection");
}

unity_shutdown = function() {
  // Tear down the current unity connection if present
}

function SendAllConnect() {
  UNITY_REGISTERED = true;

  if (!CONTEXT_REGISTERED)
    return;

  register_resouces();
  unity_startup();
}

function handler(err, url, line) {
  // We use the socket.io.js from Dependencies/socket.io.js, so this
  // error should not affect our code
  if (url.endsWith("socket.io/socket.io.js")) {
      console.log("Error handler!");
      console.log(err);
      console.log(url);
      console.log(line);
      return true;
  }

  return false;
}
