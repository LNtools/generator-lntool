export default function (_var) {
  let clone = JSON.parse(JSON.stringify(_var));

  return clone;
}
