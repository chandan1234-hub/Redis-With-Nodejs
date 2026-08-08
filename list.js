import {client} from './client.js';


async function main() {
  const numbers = [1, 3, 5, 7, 9];
  await client.lpush("user-list", numbers);

  const popped = await client.lpop("user-list");
  console.log(popped); // 9

  const all = await client.lrange("user-list", 0, -1);
  console.log(all); // [ '7', '5', '3', '1' ]

  const position = await client.lpos("user-list", 5);
  console.log(position); // 1

  setTimeout(() => {
    // `client` is in the block mode due to `client.blpop()`,
    // so we duplicate a new connection to invoke LPUSH command.
    client.duplicate().lpush("block-list", "hello");
  }, 1200);
  const blockPopped = await client.blpop("block-list", 0); // Resolved after 1200ms.
  console.log(blockPopped); // [ 'block-list', 'hello' ]
}

main();