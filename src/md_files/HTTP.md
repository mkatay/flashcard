A HTTP válaszkódok **1xx–5xx** csoportokba vannak sorolva, amelyek az információs, sikeres, átirányítási, kliens- és szerverhibás válaszokat jelzik.

### 1xx – Információs válaszok
- **100 Continue** – A kérés folytatható
- **101 Switching Protocols** – Protokollváltás

### 2xx – Sikeres kérések
- **200 OK** – A kérés sikeres
- **201 Created** – Új erőforrás jött létre
- **204 No Content** – Sikeres, de nincs visszaküldött tartalom

### 3xx – Átirányítások
- **301 Moved Permanently** – Végleges átirányítás
- **302 Found** – Ideiglenes átirányítás
- **304 Not Modified** – Gyorsítótár használható

### 4xx – Kliens oldali hibák
- **400 Bad Request** – Hibás kérés
- **401 Unauthorized** – Hitelesítés szükséges
- **403 Forbidden** – Hozzáférés tiltva
- **404 Not Found** – Az erőforrás nem található
- **409 Conflict** – Ütközés a kérés feldolgozásakor

### 5xx – Szerver oldali hibák
- **500 Internal Server Error** – Általános szerverhiba
- **502 Bad Gateway** – Hibás válasz egy másik szervertől
- **503 Service Unavailable** – Szolgáltatás nem elérhető
- **504 Gateway Timeout** – Időtúllépés
