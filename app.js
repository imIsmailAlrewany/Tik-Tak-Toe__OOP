/***********************************
====================================
======= Tik Tak Toe with OOP =======
====================================
***********************************/

// select table td elements
const tableItems = document.querySelectorAll('.game tbody .row .column');


// global object saves x and o elements
const xAndO = new Object();

Object.defineProperties(xAndO, {
  x: {
    writable: false,
    enumerable: true,
    configurable: false,
    value: `<div class="x">
    <div class="left-cross"></div>
    <div class="right-cross"></div>
  </div>`,
  },
  o: {
    writable: false,
    enumerable: true,
    configurable: false,
    value: `<svg class="o">
    <circle cx="28" cy="28" r="28"></circle>
    </svg>`,
  }
});

// define the game main class
class TikTakToe {

  // will check on this array if I got any group of them will win
  static win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  // all gamer inputs
  static gamerInputs = [];

  // all bot inputs
  static botInputs = [];

  static gamer(id) {
    if (id) {
      this.gamerInputs.push(+id);
    }
  }

  static bot(id) {
    if (id) {
      this.botInputs.push(+id);
    }
  }

  // check if the gamer or bot has matches with win array
  static winner() {
    try {
      let gamerMatchNum = 0;
      let botMatchNum = 0;

      this.win.forEach(winGroup => {
        gamerMatchNum = 0;
        botMatchNum = 0;

        this.gamerInputs.forEach(input => {
          if (winGroup.includes(input)) gamerMatchNum++;
        });

        this.botInputs.forEach(input => {
          if (winGroup.includes(input)) botMatchNum++;
        });

        // I use throw because there's no way to break forEach method not like (Loop)
        if (gamerMatchNum === 3) throw new Error(`Congratulations, You Won!!!`);
        if (botMatchNum === 3) throw new Error(`Loser, Game Over!!!`);

      });

      const encouragements = ['Good!!!', 'Wow!!!', 'Good Job!!!', 'Fine!!!'];
      return encouragements[Math.floor(Math.random() * (encouragements.length - 1 + 1))];

    } catch (msg) {
      return msg.message;
    }
  }

}

// bot second move (play)
class BotPlay extends TikTakToe {
  constructor() { }


}

// play game when click on any item
tableItems.forEach(ele => {
  ele.addEventListener('click', () => {

    TikTakToe.gamer(ele.getAttribute('_id'));
    console.log(TikTakToe.gamerInputs);
    ele.innerHTML = xAndO.x;

    const message = TikTakToe.winner();
    console.log(message);

  });
});

