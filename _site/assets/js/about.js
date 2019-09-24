const facts = [
  "i am loyal to cats",
  "i like neatly browned ravioli with butter",
  "i spent way too much time on this"
];

const getRandomInt = max => Math.floor(Math.random() * max);

const fact = document.getElementById('fact');
fact.textContent = facts[getRandomInt(facts.length)]
