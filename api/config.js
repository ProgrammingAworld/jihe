var config = {
    base: {
        protocol: 'http',
        domain: 'acegame.org',
        wxAppId: 'wxac4f2790c8725e5b',
        wxAppSecret: 'e5a2e5e7093e1e4b0c057c51ea07446b',
        wxPlatformAppId: 'wx4cc6aa8d8b664f6f',
        wxPlatformAppSecret: 'd8118d6b4acf25db64ab7b87baf7762b',
        wxRedirectUrl: 'http://rf-engine.net/login/wx',
        qqClientId: '101349725',
        qqRedirectUrl: 'http://acegame.upay360.cn/login/qq'
    },
    // 生产环境
    dev: {
        domain: 'astraea_prod',
        // domain: '172.16.100.209:9000',
        //domain: '192.168.1.92:9000'   //xue rui
        qqClientId: '101349725',
        qqRedirectUrl: 'http://www.rf-engine.net/login/qq'
    },
    // 测试环境
    test: {

    },
    // 线上环境
    production: {
        domain: 'astraea_prod',
        wxAppId: 'wx3932d72d07d16670',
        wxAppSecret: '38a2196c69de3f53a545fbed43bd0a70',
        wxRedirectUrl: 'http://acegame.upay360.cn/login/wx'
    }
};

for(var p in config.base) {
    config['dev'][p] = config['dev'][p] ? config['dev'][p] : config['base'][p];
    config['test'][p] = config['test'][p] ? config['test'][p] : config['base'][p];
    config['production'][p] = config['production'][p] ? config['production'][p] : config['base'][p];
}

module.exports = config;
