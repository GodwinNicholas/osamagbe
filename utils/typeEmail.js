function emailType(address) {
    const regex = /@[a-zA-z]+/gi;
    const emailType = address.match(regex)[0].slice(1);
    return emailType;
}

module.exports = emailType;