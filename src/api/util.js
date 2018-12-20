
import crypto from 'crypto'
import eccrypto from 'eccrypto'

const sha256Hash = (text) => crypto.createHash('sha256').update(text).digest('hex')

const aesEncrypt = (plaintext, key, iv) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(plaintext, 'utf8', 'hex') + cipher.final('hex')
  return encrypted
}

const aesDecrypt = (ciphertext, key, iv) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8') + decipher.final('utf8')
  return decrypted
}

const ecEncrypt = async (key, plaintext) => {
  let ciphertext = await eccrypto.encrypt(Buffer.from(key, 'hex'), Buffer.from(plaintext, 'utf8'))

  Object.keys(ciphertext).forEach(key => {
    ciphertext[key] = ciphertext[key].toString('hex')
  })

  return ciphertext
}

const ecDecrypt = async (key, ciphertext) => {
  Object.keys(ciphertext).forEach(key => {
    ciphertext[key] = Buffer.from(ciphertext[key], 'hex')
  })

  let plaintext = await eccrypto.decrypt(Buffer.from(key, 'hex'), ciphertext)

  return plaintext.toString('utf8')
}

export const SHA256 = {
  hash: sha256Hash
}

export const AES = {
  encrypt: aesEncrypt,
  decrypt: aesDecrypt
}

export const EC = {
  encrypt: ecEncrypt,
  decrypt: ecDecrypt
}
