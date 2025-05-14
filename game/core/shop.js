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

  button.append(span);

  return button;
};

export const skills = () => {
  const container = getHtml('.skills');

  container.prepend(createSkill(item[0]));
};
