## Mi az a TDD (Test-Driven Development)?

A **TDD** egy fejlesztési módszer, amelyben a tesztek írása **megelőzi** a tényleges kód megírását.

1. **Írj egy tesztet**, amely leírja, hogy mit kell tudnia a kódnak (a teszt eleinte hibára fut).  
2. **Írj kódot**, hogy a teszt sikeresen lefusson.  
3. **Refaktoráld a kódot**, hogy tiszta és karbantartható legyen, miközben a teszt továbbra is sikeres marad.  
4. Ismételd ezt a ciklust folyamatosan.

### Miért jó a TDD?

- Biztosítja, hogy a kód valóban megfelel a követelményeknek.  
- Segít elkerülni a felesleges kódírást.  
- Könnyebben találhatók meg és javíthatók a hibák korán.  
- Javítja a kód minőségét és karbantarthatóságát.

### Egyszerű példa (JavaScript)

```js
// 1. Írj egy tesztet
test('összeadás helyes működése', () => {
  expect(osszead(2, 3)).toBe(5);
});

// 2. Írj kódot, hogy a teszt sikerüljön
function osszead(a, b) {
  return a + b;
}
