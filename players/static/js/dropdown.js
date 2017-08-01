function send_game(id) {
  console.log("Switching to game with id " + id);

  function setup_context(context) {
    // Context setup for program
    var GAME_ID = context.game_id;

    // Context setup for watch
    var GAME_URL_BASE = context.game_url_base;
    var GAME_URL_PATH = context.game_url_path;
    var VIEW_OWNER_ID = context.view_owener_id;
  }

  $.ajax({
    url: Urls['aimmo/setup'](id=id),
    type: 'GET',
    dataType: 'text',
    success: function(data) {
      console.log("Context received:  " + data);
      setup_context(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
      console.log(errorThrown);
    }
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
