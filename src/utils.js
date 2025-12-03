export const  sha1=async (str)=>{
  return crypto.subtle.digest("SHA-1", new TextEncoder().encode(str))
    .then(buf => Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0"))
      .join(""));
}
