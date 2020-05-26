function greeter(person) {
    return 'Hello ${person}!';
}
// @ts-ignore
var name = 'Node Hero';
console.log(greeter(name));
