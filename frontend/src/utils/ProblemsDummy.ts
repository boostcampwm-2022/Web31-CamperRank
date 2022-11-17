const problem1 = {
  level: 1,
  title: "A + B = ?",
  description: "Lv1, Python, Javascript, Success Rate: 95.12%",
};

const problem2 = {
  level: 2,
  title: "A + B = ?",
  description: "Lv2, Python, Javascript, Success Rate: 95.12%",
};

const problem3 = {
  level: 3,
  title: "A + B = ?",
  description: "Lv3, Python, Javascript, Success Rate: 95.12%",
};

const problems = [
  ...new Array(10).fill(problem1),
  ...new Array(11).fill(problem2),
  ...new Array(12).fill(problem3),
];

export default problems;
