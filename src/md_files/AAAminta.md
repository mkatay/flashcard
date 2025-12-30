## Mi az az „AAA” minta?

Az **„AAA” minta** egy jó gyakorlat az egységtesztek írásában,  
amely három lépést jelöl, hogy a teszt legyen világos és érthető.

1. **Arrange (Előkészítés)**  
   - Előkészítjük a teszt környezetet és az adatokat.  
   - Például: létrehozunk egy objektumot vagy beállítjuk a bemeneteket.

2. **Act (Művelet)**  
   - Meghívjuk a tesztelendő funkciót vagy metódust.

3. **Assert (Ellenőrzés)**  
   - Ellenőrizzük, hogy a várt eredményt kaptuk-e.

### Példa JavaScript-ben

```js
test('összeadás helyes működése', () => {
  // Arrange
  const a = 2;
  const b = 3;

  // Act
  const eredmeny = osszead(a, b);

  // Assert
  expect(eredmeny).toBe(5);
});
