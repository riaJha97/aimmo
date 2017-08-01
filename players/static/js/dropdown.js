var CONTEXT_REGISTERED = false;
var UNITY_REGISTERED = false;
var PROGRAM_REGISTED = false;
var display_code = undefined;
var unity_startup = undefined;
var unity_shutdown = undefined;

//context vars
var GAME_ID = undefined;
var GAME_URL_BASE = undefined;
var GAME_URL_PATH = undefined;
var VIEW_OWNER_ID = undefined;

function send_game(id) {
  console.log("Switching to game with id " + id);

  function setup_context(context) {
    console.log(context);

    // Context setup for program
    GAME_ID = context.game_id;

    // Context setup for watch
    GAME_URL_BASE = context.game_url_base;
    GAME_URL_PATH = context.game_url_path;
    VIEW_OWNER_ID = context.view_owener_id;

    CONTEXT_REGISTERED = true;
  }

  function update_world() {
    if (PROGRAM_REGISTED) {
      display_code();
    }

    if (UNITY_REGISTERED) {
      unity_shutdown();
      unity_startup();
    }
  }

  $.ajax({
    url: Urls['aimmo/setup'](id=id),
    type: 'GET',
    dataType: 'text',
    success: function(data) {
      console.log("Context received:  " + data);

      setup_context(JSON.parse(data));
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      console.log(errorThrown);
    }
  }).then(function() {
    update_world();
  });
}

function send_level(lvl) {
  console.log("Switching to level " + lvl);

  id = undefined;

  $.ajax({
    url: Urls['aimmo/level'](num=lvl),
    type: 'GET',
    dataType: 'text',
    success: function(data) {
      console.log("Game id received " + data);
      id = data;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      console.log(errorThrown);
    }
  }).then(function () {
    if (id !== undefined) {
      send_game(id);
    }
  });
}
