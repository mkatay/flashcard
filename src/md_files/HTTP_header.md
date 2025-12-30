Milyen információkat tartalmaz a **HTTP kérés fejléc** ?

A HTTP fejléc **metaadatokat** tartalmaz a kérésről vagy válaszról,a kommunikáció technikai és biztonsági paramétereit írja le, nem magát az adatot.

**Kliens adatok**
  - `User-Agent`
  - `Accept`, `Accept-Language`

**Tartalom adatok**
  - `Content-Type`
  - `Content-Length`
  - `charset`

**Hitelesítés és biztonság**
  - `Authorization`
  - `Cookie`, `Set-Cookie`
  - CORS beállítások

**Gyorsítótár és vezérlés**
  - `Cache-Control`
  - `Expires`, `ETag`

**Átirányítás és szerver**
  - `Location`
  - `Server`