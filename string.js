import { client } from './client.js';


async function init() {
    const user = {
        name: "Bob",
        // The value of a Redis key can not be a number.
        // We can write `age: 20` here but ioredis will convert it to a string anyway.
        age: "20",
        description: "I am a programmer",
    };

    await client.mset(user);

    const name = await client.get("name");
    console.log(name); // "Bob"

    const age = await client.get("age");
    console.log(age); // "20"

    const all = await client.mget("name", "age", "description");
    console.log(all); // [ 'Bob', '20', 'I am a programmer' ]

    // or `await client.del("name", "description")`;
    await client.del(["name", "description"]);

    const exists = await client.exists("name");
    console.log(exists); // 0 (means false, and if it's 1, it means true)

    await client.incrby("age", 1);
    const newAge = await client.get("age");
    console.log(newAge); // 21

    await client.set("key_with_ttl", "hey", "EX", 1000);
    const ttl = await client.ttl("key_with_ttl");
    console.log(ttl); // a number smaller or equal to 1000
}

init();