const crypto = require('crypto');
const iv = new Buffer(crypto.randomBytes(16));

exports.encrypt = (text) => {
    let cipher = crypto.createCipheriv('aes-256-gcm', xe.ckey, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex');
    let tag = cipher.getAuthTag();
    console.log(xe.ckey)
    return tag.toString('hex') + encrypted;
}

exports.decrypt = (text, next) => {
    text = text.split('');
    let tag = Buffer.from(text.splice(0, 32).join(''), 'hex');
    text = text.join('');
    let decipher = crypto.createDecipheriv('aes-256-gcm', xe.ckey, iv)
    try {
        decipher.setAuthTag(tag);
        let dec = decipher.update(text, 'hex', 'utf8')
        dec += decipher.final('utf8');
        next(null, dec);
    }
    catch (err) {
        next(err);
    }
}