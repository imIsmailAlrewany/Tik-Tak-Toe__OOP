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

}

// play game when click on any item
tableItems.forEach(ele => {
  ele.addEventListener('click', () => {
    console.log(ele.getAttribute('_id'));
  });
});

