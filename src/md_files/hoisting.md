A **hoisting** a JavaScript működési sajátossága, amely során a deklarációk  
futás előtt a hatókör (scope) elejére kerülnek.

### Változók hoistingje
#### `var`
console.log(x); // undefined

var x = 5;

- A deklaráció hoistolódik
- Az értékadás nem
- A változó undefined lesz a deklaráció előtt

#### `let` és `const`
console.log(y); // ReferenceError

let y = 10;

Nem használható a deklaráció előtt

### Függvények hoistingje (hagyományos)
hello(); // működik

function hello() {
  console.log("Szia!");
}

A függvénydeklarációk teljes egészében hoistolódnak

### Nyílfüggvény
hello(); // ❌ TypeError vagy ReferenceError

const hello = () => {
  console.log("Szia!");
};

- A nyílfüggvény változóhoz van rendelve
- A hoisting a változóra vonatkozik (let / const)
- A függvény nem hívható meg a deklaráció előtt