const crypto = require("node:crypto");

function cryptoPbkdf2(times) {
  for (let i = 0; i < times; i++) {
    crypto.pbkdf2("secret", "salt", 2000000, 64, "sha512", (_rr, _key) => {
      console.log(`Crypto PBKDF2 executed - ${i + 1}`);
    });
  }
}

cryptoPbkdf2(8);
