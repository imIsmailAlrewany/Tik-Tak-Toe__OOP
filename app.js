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

  static gamer(id, element) {
    if (id) {
      this.gamerInputs.push(+id);
    }

    element.innerHTML = xAndO.x;
    element.style.pointerEvents = 'none';
    return this.gamerWin();
  }

  static bot(id, element) {
    if (id) {
      this.botInputs.push(+id);
    }

    element.innerHTML = xAndO.o;
    element.style.pointerEvents = 'none';
    return this.botWin();
  }

  // check if the gamer has matched win row
  static gamerWin() {
    let gamerMatchNum = 0;

    for (let i = 0; i < this.win.length; i++) {
      gamerMatchNum = 0;

      this.gamerInputs.forEach(input => {
        if (this.win[i].includes(input)) gamerMatchNum++;
      });

      if (gamerMatchNum === 3) return `Congratulations, You Won!!!`;
    }

    const encouragements = ['Good!!!', 'Wow!!!', 'Good Job!!!', 'Fine!!!'];
    const random = Math.floor(Math.random() * (encouragements.length - 1 + 1));
    return encouragements[random];
  }

  // check if the bot has matched win row
  static botWin() {
    let botMatchNum = 0;

    for (let i = 0; i < this.win.length; i++) {
      botMatchNum = 0;

      this.botInputs.forEach(input => {
        if (this.win[i].includes(input)) botMatchNum++;
      });

      if (botMatchNum === 3) return `Game Over!!!`;
    }
  }

}


class BotPlay extends TikTakToe {
  static checkPossibilities() {

    let randomNum = Math.floor(Math.random() * (this.win.length + 1));

    if (this.gamerInputs.length + this.botInputs.length < 9) {
      if (this.gamerInputs.includes(randomNum + 1)) {
        return this.checkPossibilities();
      } else if (this.botInputs.includes(randomNum + 1)) {
        return this.checkPossibilities();
      } else {
        return randomNum;
      }
    }
  }

  static printO() {

    const index = this.checkPossibilities();

    if (index) {
      return this.bot(tableItems[index].getAttribute('_id'), tableItems[index]);
    }
  }
}

// play game when click on any item
tableItems.forEach(ele => {
  ele.addEventListener('click', () => {

    const gamerWin = TikTakToe.gamer(ele.getAttribute('_id'), ele);
    if (gamerWin) console.log(gamerWin);

    setTimeout(() => {
      const botWin = BotPlay.printO();
      if (botWin) console.log(botWin);
    }, 500);

  });
});
