## Mi az a tesztpiramis?

A **tesztpiramis** egy szemléletes modell, amely  
megmutatja, hogy milyen arányban és milyen típusú teszteket érdemes írni egy szoftver fejlesztése során.

### A piramis szintjei (alulról felfelé):

1. **Egységtesztek (Unit tests)**
   - A legtöbb teszt itt legyen!
   - Gyors, egyszerű, kis kódrészeket tesztel.
   - Alapja a jó minőségű szoftvernek.

2. **Integrációs tesztek (Integration tests)**
   - Középen helyezkednek el.
   - Több modul vagy komponens együttműködését ellenőrzik.
   - Lassabbak és összetettebbek, mint az egységtesztek.

3. **End-to-end tesztek (E2E tests)**
   - A piramis teteje.
   - A teljes rendszert felhasználói szemszögből tesztelik.
   - Leglassabbak, legköltségesebbek, ezért kevés legyen belőlük.

### Miért fontos a tesztpiramis?

- Segít hatékonyan és gazdaságosan tesztelni.  
- Több egységteszt → gyors visszacsatolás  
- Kevés E2E teszt → kisebb karbantartási költség

---

## Összefoglaló

> A tesztpiramis egy útmutató, hogy a legtöbb teszt egységteszt legyen, kevesebb integrációs, és a legkevesebb end-to-end, így biztosítva a jó minőségű és fenntartható szoftvert.
