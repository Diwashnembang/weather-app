import { getData } from './data';

async function main() {
  const data = await getData();
  console.log(data.visibility);
}
main();
