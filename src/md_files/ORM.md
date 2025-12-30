Az **ORM (Object–Relational Mapping)** egy olyan technológia, amely  
**összeköti az objektumorientált programozást a relációs adatbázissal**.

#### Mit jelent ez?
- Adatbázis táblák → **Objektumok / modellek**
- Adatbázis sorok → **Objektum példányok**
- SQL lekérdezések → **Metódushívások**

#### Példa

**SQL:**

SELECT * FROM users WHERE id = 1;

**ORM (pld.Sequelize):**

User.findByPk(1);

---

````Az ORM egy köztes réteg a program és az adatbázis között, amely lehetővé teszi az adatbázis-kezelést objektumokon keresztül SQL írása nélkül.````