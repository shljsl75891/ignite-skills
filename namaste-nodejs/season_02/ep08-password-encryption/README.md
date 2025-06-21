# Encryption of Passwords

- We can use [bcrypt](https://www.npmjs.com/package/bcrypt) npm package for this
- We use random salt, and number of salt rounds to keep password securely in database
- We store irreversible password hashesh in database rather than actual passwords in plain text
- Never leak information through errors. Throw generic errors
