import { db } from '../store/index.js';

const item = [
  {
    name: 'downjump',
    icon: 'keyboard_double_arrow_down',
  },
];

const getHtml = (selector) => {
  return document.querySelector(`${selector}`);
};

const createSkill = ({ name, icon }) => {
  const button = document.createElement('button');
  button.classList.add('skill');
  const span = document.createElement('span');
  span.className = 'material-symbols-outlined skill-size';
  span.textContent = icon;

  button.addEventListener('click', () => {
    if (db.coins >= 0) {
      console.log('Покупка прошла успешно');
      db.skills.push('downjump');
      db.coins -= 10;
      const coins = document.querySelector('.coins');
      coins.textContent = `Coins: ${db.coins}`;
    }
  });

  button.append(span);

  return button;
};

export const skills = () => {
  const container = getHtml('.skills');

  container.prepend(createSkill(item[0]));
};
