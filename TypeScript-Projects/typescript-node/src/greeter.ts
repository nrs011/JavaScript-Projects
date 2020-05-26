function greeter(person: string) {
    return 'Hello ${person}!'
}

// @ts-ignore
const name = 'Node Hero'

console.log(greeter(name))