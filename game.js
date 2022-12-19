user_turn = true;
comp_turn = false;
final_depth = 10;
gameinfo = document.getElementById("gameinfo");
game = true;
M = "TABLE";
function Initialize_Table() {
  M = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}
Initialize_Table();
function start() {
  Initialize_Table();
  game = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let id = i + "" + j;
      let cell = document.getElementById(id);
      cell.innerHTML = "";
    }
  }

  chk_box = document.getElementById("check-box");
  if (chk_box.checked) {
    user_turn = true;
    comp_turn = false;
  } else {
    user_turn = false;
    comp_turn = true;
    computer(M);
  }

  final_depth = document.getElementById("depth_level").value;

  gameinfo.innerHTML = "GAME-STATUS";
}
function chk_winner(M) {
  // Left-To-Right
  let cnt_x = 0;
  let cnt_o = 0;
  for (let i = 0; i < 3; i++) {
    cnt_x = 0;
    cnt_o = 0;
    for (let j = 0; j < 3; j++) {
      if (M[i][j] == 1) cnt_x++;
      if (M[i][j] == -1) cnt_o++;
      if (cnt_x == 3) return 1;
      if (cnt_o == 3) return -1;
    }
  }
  //   console.log("L R");
  // Left-To-Right
  for (let i = 0; i < 3; i++) {
    cnt_x = 0;
    cnt_o = 0;
    for (let j = 0; j < 3; j++) {
      if (M[j][i] == 1) cnt_x++;
      if (M[j][i] == -1) cnt_o++;
      if (cnt_x == 3) return 1;
      if (cnt_o == 3) return -1;
    }
  }
  //   console.log("T B");
  // Principal-Diagonal
  cnt_x = 0;
  cnt_o = 0;
  for (let i = 0; i < 3; i++) {
    if (M[i][i] == 1) cnt_x++;
    if (M[i][i] == -1) cnt_o++;
  }
  if (cnt_x == 3) return 1;
  if (cnt_o == 3) return -1;

  // Secondary-Diagonal
  cnt_x = 0;
  cnt_o = 0;
  for (let i = 0; i < 3; i++) {
    if (M[i][2 - i] == 1) cnt_x++;
    if (M[i][2 - i] == -1) cnt_o++;
  }
  if (cnt_x == 3) return 1;
  if (cnt_o == 3) return -1;
  //   console.log("S D");
  // Empty-Cell Check
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (M[i][j] == 0) return 99;
    }
  }
  //   console.log("E C");
  // Draw-Check
  return 0;
  //   console.log("D C");
}
function set_gameinfo(W) {
  if (W == 1) {
    console.log("X Winner");
    gameinfo.innerHTML = "X Winner";
  }
  if (W == -1) {
    console.log("O Winner");
    gameinfo.innerHTML = "O Winner";
  }
  if (W == 0) {
    console.log("MATCH-DRAW!");
    gameinfo.innerHTML = "MATCH-DRAW!";
  }
  game = false;
}
function human(x, y) {
  if (user_turn && game) {
    let id = x + "" + y;
    console.log(id);
    cell = document.getElementById(id);
    if (M[x][y] == 0) {
      cell.innerHTML = "O";
      M[x][y] = -1;
      console.log(M);
      W = chk_winner(M);
      if (W == 99) {
        user_turn = false;
        comp_turn = true;
        computer(M);
      } else {
        set_gameinfo(W);
      }
    }
  }
}

function Minimax(M, P, depth) {
  let W = chk_winner(M);
  if (W == 1 || W == -1 || W == 0) {
    return [W, -1, -1];
  }
  if (depth == final_depth) {
    return [0, -1, -1];
  }
  let GV = 0;
  if (P == 1) GV = -100;
  else GV = 100;

  let posX = -1;
  let posY = -1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (M[i][j] == 0) {
        M[i][j] = P;
        if (P == 1) {
          H = Minimax(M, -1, depth + 1);
          if (GV < H[0]) {
            GV = H[0];
            posX = i;
            posY = j;
          }
        } else {
          H = Minimax(M, 1, depth + 1);
          if (GV > H[0]) {
            GV = H[0];
            posX = i;
            posY = j;
          }
        }
        M[i][j] = "0";
      }
    }
  }
  return [GV, posX, posY];
}
function computer(M) {
  if (comp_turn && game) {
    TM = [[...M[0]], [...M[1]], [...M[2]]];
    console.log("Before-minimax");
    P = Minimax(TM, 1, 1);
    console.log("After-minimax");
    console.log(P[1], " ", P[2]);
    M[P[1]][P[2]] = 1;
    let id = P[1] + "" + P[2];
    cell = document.getElementById(id);
    cell.innerHTML = "X";
    W = chk_winner(M);
    if (W == 99) {
      comp_turn = false;
      user_turn = true;
    } else {
      set_gameinfo(W);
    }
  }
}
