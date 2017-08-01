window.CONTEXT_REGISTERED = false;
window.UNITY_REGISTERED = false;
window.PROGRAM_REGISTED = false;
window.display_code = undefined;
window.unity_startup = undefined;
window.unity_shutdown = undefined;

//context vars
window.GAME_ID = undefined;
window.GAME_URL_BASE = undefined;
window.GAME_URL_PATH = undefined;
window.VIEW_OWNER_ID = undefined;

function send_game(id) {
  console.log("Switching to game with id " + id);

  function setup_context(context) {
    console.log(context);

    // Context setup for program
    window.GAME_ID = context.game_id;

    // Context setup for watch
    window.GAME_URL_BASE = context.game_url_base;
    window.GAME_URL_PATH = context.game_url_path;
    window.VIEW_OWNER_ID = context.view_owener_id;

    window.CONTEXT_REGISTERED = true;
  }

  function update_world() {
    if (window.PROGRAM_REGISTED) {
      window.display_code();
    }

    if (window.UNITY_REGISTERED) {
      window.unity_shutdown();
      window.unity_startup();
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
