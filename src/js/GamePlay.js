export default class GamePlay {
  constructor() {
    this.holesCount = 16;
    this.luckCount = 0;
    this.lostCount = 0;
    this.missCount = 0;
  }

  drawUi() {
    const card = document.querySelector('.card');

    const statistic = document.createElement('div');
    card.appendChild(statistic);
    statistic.classList.add('statistic');
    statistic.innerHTML = 'Попаданий: <span class="luck">0</span><br>Промахов: <span class="lost">0</span><br>Пропущено ударов: <span class="miss">0</span><br>';

    const holeList = document.createElement('div');
    card.appendChild(holeList);
    holeList.classList.add('hole-list');

    for (let i = 0; i < this.holesCount; i++) {
      const hole = document.createElement('div');
      hole.classList.add('hole');
      holeList.appendChild(hole);
    }

    document.querySelector('.hole').classList.add('active-hole');
  }

  getRandomHole() {
    this.holes = Array.from(document.querySelectorAll('.hole'));
    // this.activeHole;
    // this.activeHoleNew;
    this.activeHole = document.querySelector('.active-hole');
    this.activeHole.classList.remove('active-hole');
    let randomIndex = Math.floor(1 + Math.random() * (this.holes.length - 1));

    if (this.holes.indexOf(this.activeHole) === randomIndex) {
      randomIndex = Math.floor(Math.random() * this.holes.length);
    }

    this.activeHoleNew = this.holes[randomIndex];
    this.activeHoleNew.classList.add('active-hole');

    this.missCount += 1;
    document.querySelector('.miss').textContent = (this.missCount - this.luckCount);

    if ((this.missCount - this.luckCount) > 5) {
      this.holes.forEach((el) => {
        el.classList.remove('active-hole');
      });
      this.stop();
      const text = 'Вы проиграли. Пропущено 5 гоблинов';
      this.createMessage(text);

      document.querySelector('.miss').textContent = '5';
    }
  }

  start() {
    this.next = setInterval(() => this.getRandomHole(), 1000);
  }

  stop() {
    // eslint-disable-next-line
        clearInterval(this.next);        
  }

  getGameClick() {
    this.holes = Array.from(document.querySelectorAll('.hole'));

    this.luck = document.querySelector('.luck');
    this.lost = document.querySelector('.lost');

    this.holes.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.classList.contains('active-hole')) {
          this.luckCount++;
          this.luck.textContent = this.luckCount;
          this.checkWin();
        } else {
          this.lostCount++;
          this.lost.textContent = this.lostCount;
          this.checkWin();
        }
      });
    });
  }

  // eslint-disable-next-line
  createMessage(text) {
    const body = document.querySelector('body');
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = text;
    body.appendChild(message);

    const close = document.createElement('span');
    close.classList.add('close');
    close.innerHTML = '&times;';
    message.appendChild(close);

    const background = document.createElement('div');
    background.classList.add('background');
    body.appendChild(background);

    document.querySelector('.close').addEventListener('click', () => {
      // eslint-disable-next-line
          location.reload();
    });
  }

  checkWin() {
    if (this.luckCount === 10) {
      this.holes.forEach((el) => {
        el.classList.remove('active-hole');
      });
      this.stop();
      const text = `Победа! Набрано баллов: ${this.luckCount}.`;
      this.createMessage(text);
    }

    if (this.lostCount === 5) {
      this.holes.forEach((el) => {
        el.classList.remove('active-hole');
      });
      this.stop();
      const text = `Вы проиграли. Допущено промахов: ${this.lostCount}.`;
      this.createMessage(text);
    }
  }
}
