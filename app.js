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
  static oEle = xAndO.o;

  static generateNum() {
    return Math.floor(Math.random() * (this.win.length + 1));
  }

  static printO() {
    // if (this.botInputs.length >= 2) {

    //   try {
    //     // this to check if the bot is about to win
    //     let match = 0;

    //     this.win.forEach(winGroup => {
    //       match = 0;

    //       this.botInputs.forEach(input => {
    //         if (winGroup.includes(input)) match++;
    //       });

    //       if (match === 2) throw new Error(true);
    //     });
    //   } catch (out) {

    //   }

    // }

    // if (this.gamerInputs.length >= 2) { }

    // here the code that will execute if both of those conditions didn't work
    const randomNum = this.generateNum();

    for (let i = 0; i < this.gamerInputs.length; i++) {
      if (randomNum === this.gamerInputs[i]) this.printO();
      else return randomNum;
    }

  }
}

// play game when click on any item
tableItems.forEach(ele => {
  ele.addEventListener('click', () => {

    TikTakToe.gamer(ele.getAttribute('_id'));
    ele.innerHTML = xAndO.x;

    const message = TikTakToe.winner();
    console.log(message);

    const index = BotPlay.printO();
    setTimeout(() => {
      tableItems[index].innerHTML = xAndO.o;
    }, 500);
  });
});