function send_game(id) {
  console.log("Switching to game with id " + id);
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
