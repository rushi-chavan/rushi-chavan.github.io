//#region All Event listeners
$(document).on("click", "#play-btn", function () {
  $("#main div:first-child").remove();
  console.log("select type");
  $("#main").prepend(play_type);
});

$(document).on("click", "#sngl-plyr-btn", function () {
  $("#play-type").remove();
  prepare_board(1);
});

$(document).on("click", "#multi-plyr-btn", function () {
  $("#play-type").remove();
  $("#main").prepend(choose_multiplayer);
});

$(document).on("click", "#choose-multiplayer-btn button", function () {
  $("#choose-multiplayer-btn").remove();
  switch ($(this).attr("id")) {
    case "2-players":
      prepare_board(2);
      break;
    case "3-players":
      prepare_board(3);
      break;
    case "4-players":
      prepare_board(4);
      break;
  }
});

$(document).on("click", "#dice", function () {
  dice_num = Math.floor(Math.random() * (6 - 1 + 1) + 1);
  $(this)
    .attr("src", "./dice-images/animated-dice.gif")
    .delay(10000)
    .attr("src", "./dice-images/" + String(dice_num) + ".png");
  move_player(parseInt(localStorage.getItem("current-player")), dice_num);
});
//#endregion All Event listeners

//#region Functionalities
function prepare_board(no_of_players) {
  console.log("adding board");
  $("#main").prepend(board);
  for (var i = 0, l = 10; i < l; i++) {
    rowNum = "row-" + String(i);
    $("#board").prepend(board_row.replace("row_num", rowNum));
    for (var j = 0, m = 10; j < l; j++) {
      boxNum = i % 2 == 0 ? i * 10 + (j + 1) : i * 10 + 10 - j;
      $("#" + rowNum).append(
        box.replace("box_num", "box-" + String(boxNum)).replace("num", boxNum)
      );
    }
  }

  $("#main").prepend(invisible_board);
  for (var i = 0, l = 10; i < l; i++) {
    rowNum = "invs-row-" + String(i);
    $("#invs-board").prepend(
      invisible_board_row.replace("invs_row_num", rowNum)
    );
    for (var j = 0, m = 10; j < l; j++) {
      boxNum = i % 2 == 0 ? i * 10 + (j + 1) : i * 10 + 10 - j;
      $("#" + rowNum).append(
        invisible_box
          .replace("invs_box_num", "invs-box-" + String(boxNum))
          .replace("num", boxNum)
      );
    }
  }

  ready_players(no_of_players);
  $("#main").prepend(ladders_board);
  $("#ladders-board").prepend(ladder);
  update_score_and_turn();
}

function ready_players(no_of_players) {
  console.log("preparing players:", no_of_players);
  localStorage.setItem("no-of-players", no_of_players);
  localStorage.setItem("players", JSON.stringify(new Object()));
  for (var i = 0; i < no_of_players; i++) {
    console.log("in loop");
    newPlayer = player();
    players = JSON.parse(localStorage.getItem("players" || []));
    players[i] = newPlayer;
    localStorage.setItem("players", JSON.stringify(players));
  }
  update_players();
  localStorage.setItem("current-player", 0);
}

function player() {
  console.log("preparing new player");
  colors = ["red", "green", "blue", "yellow"];
  pID = Object.keys(JSON.parse(localStorage.getItem("players"))).length;
  pName = prompt("Please enter name for player " + String(pID + 1));
  new_player = {
    pID: pID,
    name: pName,
    color: colors[pID],
    position: 0,
    curr_effects: { antidote: 0, stick: 0, double: 0 },
    alive: true,
  };
  return new_player;
}

function update_players() {
  console.log("updating players");
  // clearing board
  $(".invs-box").empty();
  players = JSON.parse(localStorage.getItem("players"));
  for (let i = 0; i < parseInt(localStorage.getItem("no-of-players")); i++) {
    $("#invs-box-" + String(players[i].position + 1)).prepend(
      player_piece.replace("my_color", players[i].color)
    );
  }
  check_positions();
}

function check_positions() {
  players = JSON.parse(localStorage.getItem("players"));
  board_data = {
    10: 50,
    15: 68,
    20: "mb",
    28: 8,
    29: "mb",
    37: 58,
    65: 97,
    66: "mb",
    78: 18,
    82: "mb",
    92: 52,
  };
  powers = {
    1: "booster",
    2: "antidote",
    3: "double",
    4: "stick",
  };
  for (let i = 0; i < parseInt(localStorage.getItem("no-of-players")); i++) {
    if (players[i].position >= 99) {
      alert("player " + players[i].name + " has won the game");
      reset_board();
    }
    temp = board_data[players[i].position + 1];
    if (temp != undefined) {
      if (String(temp) == "mb") {
        power = powers[Math.floor(Math.random() * (4 - 1 + 1) + 1)];
        console.log("power" + power);
        switch (power) {
          case "booster":
            players[i].position =
              temp + Math.floor(Math.random() * (6 - 3 + 3) + 3) - 1;
            break;
          case "antidote":
            players[i]["curr_effects"].antidote = 3;
            break;
          case "double":
            players[i]["curr_effects"].double = 2;
            break;
          case "stick":
            players[i]["curr_effects"].stick = 2;
            break;
        }
      } else {
        if (players[i]["curr_effects"].antidote != 0) {
          if (players[i].position > temp) {
            alert("antidote is in effect for player " + players[i].name);
          }
        } else {
          if (players[i]["curr_effects"].double != 0) {
            alert("Doubling the dice number for player " + players[i].name);
            players[i].position = temp * 2 - 1;
          } else {
            if (players[i]["curr_effects"].stick != 0) {
              alert("Player " + players[i].name + " has 'stick' in effect");
            } else {
              players[i].position = temp - 1;
            }
          }
        }

        players[i]["curr_effects"].antidote =
          players[i]["curr_effects"].antidote > 0
            ? players[i]["curr_effects"].antidote - 1
            : 0;
        players[i]["curr_effects"].double =
          players[i]["curr_effects"].double > 0
            ? players[i]["curr_effects"].double - 1
            : 0;
        players[i]["curr_effects"].stick =
          players[i]["curr_effects"].stick > 0
            ? players[i]["curr_effects"].stick - 1
            : 0;
        localStorage.setItem("players", JSON.stringify(players));
        update_players();
      }
    }
  }
}

function reset_board() {
  players = JSON.parse(localStorage.getItem("players"));
  for (let i = 0; i < parseInt(localStorage.getItem("no-of-players")); i++) {
    players[i].position = 0;
  }
  localStorage.setItem("players", JSON.stringify(players));
  update_players();
  update_score_and_turn();
}

function update_score_and_turn() {
  players = JSON.parse(localStorage.getItem("players"));
  current_player = players[localStorage.getItem("current-player")];
  $("#curr-player").html(
    curr_player
      .replace("name", current_player["name"])
      .replace("myColor", current_player["color"])
  );
}

function move_player(pID, moves) {
  players = JSON.parse(localStorage.getItem("players"));
  if (players[pID].position + moves <= 99) {
    players[pID].position += moves;
  }
  localStorage.setItem("players", JSON.stringify(players));
  update_players();
  localStorage.setItem(
    "current-player",
    localStorage.getItem("current-player") >=
      localStorage.getItem("no-of-players") - 1
      ? 0
      : parseInt(localStorage.getItem("current-player")) + 1
  );
  update_score_and_turn();
}

function change_theme(themeName) {
  switch (themeName) {
    case "jungle":
      $("body").css({ background: "#ffffcc" });
      $("#main").css({
        background: "url(./theme/jungle.png)",
        "background-size": "cover",
      });
      break;
    case "ice":
      $("body").css({ background: "#cceeff" });
      $("#main").css({
        background: "url(./theme/snow.gif), url(./theme/snowy-mountains.png)",
        "background-size": "auto, contain",
      });
      break;
  }
}
//#endregion Functionalities

//#region HTML code snippets
var play_type = `
<div id="play-type" class="d-flex flex-column">
  <button
    type="button"
    id="sngl-plyr-btn"
    class="btn btn-success"
    style="margin-bottom: 20px"
  >
    Single Player
  </button>
  <button type="button" id="multi-plyr-btn" class="btn btn-success">
    Multiplayer
  </button>
</div>
`;

var choose_multiplayer = `
<div id="choose-multiplayer-btn" class="d-flex flex-column">
  <button
    type="button"
    id="2-players"
    class="btn btn-success"
    style="margin-bottom: 20px"
  >
    2 players
  </button>
  <button
    type="button"
    id="3-players"
    class="btn btn-success"
    style="margin-bottom: 20px"
  >
    3 players
  </button>
  <button type="button" id="4-players" class="btn btn-success">
    4 players
  </button>
</div>
`;

var board = `
<div
  id="board"
  class="board d-flex flex-column"
  style="height: 75vh; width: 75vh"
>
</div>
<div class="dice-container d-flex flex-column w-25 vh-100 justify-content-center align-items-center">
  <div id="curr-player"></div>
  <img class="dice" id="dice" src="./dice-images/1.png" />
</div>
`;

var board_row = `
<div class="row d-flex flex-row">
    <div class="btn-group" id="row_num" role="group" aria-label="Basic outlined example">
    </div>
</div>
`;

var box = `
<button type="button" id="box_num" class="box btn btn-outline-success rounded-0 disabled">
    num
</button>
`;

var curr_player = `
<p class="h3" style="color: myColor; margin: 20px;">Curent turn: name</p>
`;

var invisible_board = `
<div
  id="invs-board"
  class="invs-board d-flex flex-column"
  style="height: 75vh; width: 75vh"
>
</div>
`;

var invisible_board_row = `
<div class="invs-row d-flex flex-row">
    <div class="btn-group" id="invs_row_num" role="group" aria-label="Basic outlined example">
    </div>
</div>
`;

var invisible_box = `
<button type="button" id="invs_box_num" class="invs-box btn btn-outline-primary rounded-0 disabled">

</button>
`;

var player_piece = `
<img src="./pieces/my_color.png"/>
`;

var ladders_board = `
<div
  id="ladders-board"
  class="ladders-board d-flex flex-column"
  style="height: 75vh; width: 75vh"
>
</div>
`;

var ladder = `
<img class="laddder" src="./assets/board1.png" style="margin: xx yy"/>
`;
//#endregion HTML code snippets
