var tokenName = 'wapsiteToken';
var jwtUtil = require('./jwtUtil');

function getTokenInfo(req) {
    var localToken = req.cookies[tokenName];
    return jwtUtil.decoded(localToken);
}

function getToken(req) {
    var tokenInfo = getTokenInfo(req);
    return tokenInfo ? tokenInfo.token : '';
}

function setToken(res, info) {
    var token = jwtUtil.generateToken(info);
    res.cookie(tokenName, token ? token : '');
}

function verifyToken(req) {
    var token = req.cookies[tokenName];
    return jwtUtil.verify(token);
}

function clearToken(res) {
    res.cookie('sessionId', '', {expires: new Date()});
    res.cookie(tokenName, '', {expires: new Date()});
}

module.exports = {
    getTokenInfo,
    getToken,
    setToken,
    clearToken,
    verifyToken
};