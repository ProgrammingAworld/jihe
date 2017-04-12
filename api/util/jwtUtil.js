var jwt = require('jsonwebtoken');
var algorithm = 'HS256';
var key = 'Go2upay!';

module.exports = {
    generateToken: function(data) {
        data = data ? data : {};
        return jwt.sign(data, key, {algorithm: algorithm});
    },
    verify: function(token) {
        try {
            return jwt.verify(token, key);
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },
    decoded: function(token) {
        return jwt.decode(token);
    }
};