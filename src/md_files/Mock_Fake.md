## Mi az a „Mock”, „Fake” és „Stub” tesztelési technika?

Ezek olyan **tesztelési segédeszközök**, amiket akkor használunk,  
amikor a tesztelendő kódnak más komponensekkel (pl. adatbázis, webszolgáltatás) kell kommunikálnia.Egy külső erőforrást nem kívánunk a tesztelés során elérni.   
Segítenek elszigetelni a tesztet a külső függőségektől.

### 1. Stub

- Egyszerű, előre programozott válaszokat ad a tesztelt kód hívásaira.  
- Nem tartalmaz logikát, csak „helyettesítőként” működik.  
- Példa: egy metódus, ami mindig ugyanazt az eredményt adja vissza.

### 2. Fake

- Egy egyszerűbb, működőképes implementáció, ami nem az éles rendszert használja.  
- Lehet, hogy nem teljes, de elég a teszteléshez.  
- Példa: egy memória-alapú adatbázis az igazi helyett.

### 3. Mock

- Egy objektum, amely nemcsak válaszokat ad, hanem **ellenőrzi, hogy a megfelelő metódusokat hívták-e meg, és milyen paraméterekkel**.  
- Hasznos a viselkedés teszteléséhez (pl. hogy a függőség megfelelően lett-e használva).

---

### Összefoglaló táblázat

| Technika | Mit csinál?                          | Mire jó?                              |
|----------|------------------------------------|-------------------------------------|
| Stub     | Egyszerű előre definiált válaszok  | Egyszerű helyettesítés               |
| Fake     | Egyszerű működő implementáció      | Teljesebb helyettesítés teszteléshez|
| Mock     | Válaszol és viselkedést ellenőriz  | Függőségek használatának tesztelése |

---

## Összefoglaló

> Ezek a technikák segítenek elszigetelni a tesztelt kódot a külső függőségektől, így könnyebben és pontosabban tudunk tesztelni.
