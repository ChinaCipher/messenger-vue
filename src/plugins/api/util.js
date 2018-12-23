
import crypto from 'crypto'
import eccrypto from 'eccrypto'

export class SHA256 {
  static hash (text) {
    return crypto.createHash('sha256').update(text).digest('hex')
  }
}

export class AES {
  static encrypt (plaintext, key, iv) {
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(plaintext, 'utf8', 'hex') + cipher.final('hex')
    return encrypted
  }
  static decrypt (ciphertext, key, iv) {
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let decrypted = decipher.update(ciphertext, 'hex', 'utf8') + decipher.final('utf8')
    return decrypted
  }
}

export class EC {
  static async encrypt (plaintext, publicKey) {
    let ciphertext = await eccrypto.encrypt(Buffer.from(publicKey, 'utf8'), Buffer.from(plaintext, 'utf8'))
    Object.keys(ciphertext).forEach(key => {
      ciphertext[key] = ciphertext[key].toString('hex')
    })
    return ciphertext
  }
  static async decrypt (ciphertext, privateKey) {
    Object.keys(ciphertext).forEach(key => {
      ciphertext[key] = Buffer.from(ciphertext[key], 'hex')
    })
    let plaintext = await eccrypto.decrypt(Buffer.from(privateKey, 'hex'), ciphertext)
    return plaintext.toString('utf8')
  }
}

export class MessageHandler {
  static encrypt (senderUsername, message, key) {
    let iv = SHA256.hash(senderUsername).slice(0, 16)
    switch (message.type) {
      case 'text':
        MessageHandler.encryptTextMessage(message, key, iv)
        break
      default:
    }
  }
  static decrypt (message, key) {
    let iv = SHA256.hash(message.sender).slice(0, 16)
    switch (message.type) {
      case 'text':
        MessageHandler.decryptTextMessage(message, key, iv)
        break
      default:
        message.type = 'text'
        message.content = 'Unsupported type content'
    }
  }
  static encryptTextMessage (message, key, iv) {
    message.content = AES.encrypt(message.content, key, iv)
  }
  static decryptTextMessage (message, key, iv) {
    message.content = AES.decrypt(message.content, key, iv)
  }
}
