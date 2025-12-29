## Informatikai támadástípusok

- Adathalászat (Phishing)
- Denial of Service (DoS / DDoS)
- Man-in-the-Middle (MitM)
- Social Engineering
- SQL Injection

### Adathalászat (Phishing)
Olyan támadás, ahol a támadó **megtévesztéssel** próbál érzékeny adatokat megszerezni  
(pl. jelszó, bankkártya-adatok).

**Jellemzők:**
- hamis e-mail, SMS vagy weboldal
- banknak, szolgáltatónak álcázott üzenetek

**Cél:**  
A felhasználó **önként megadja** az adatait.

---

### Denial of Service (DoS / DDoS)
A támadás célja egy szolgáltatás **elérhetetlenné tétele** túlterheléssel.

**Jellemzők:**
- rengeteg kérés egy szerver felé
- a rendszer lelassul vagy leáll

**DDoS:**  
Több gép (botnet) támad egyszerre.

---

### Man-in-the-Middle (MitM)
A támadó **beékelődik** két fél kommunikációja közé.

**Jellemzők:**
- nyilvános Wi-Fi hálózatok
- titkosítatlan adatforgalom

**Cél:**
- adatlopás
- kommunikáció módosítása

---

### Social Engineering
**Pszichológiai manipuláción** alapuló támadás, nem technikai.

**Jellemzők:**
- bizalomkeltés
- sürgetés
- tekintélyre hivatkozás

**Példák:**
- telefonon jelszót kérnek
- „főnök” utasít pénzutalásra

---

### SQL Injection
Adatbázis elleni támadás **hibás bemenetkezelés** miatt.

**Módszer:**
Speciális SQL kód bevitele űrlapmezőkbe.

**Példa:**
```sql
' OR '1'='1
