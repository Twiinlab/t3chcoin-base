const path = require('path');

module.exports = {
    blockchain: {
        // wallet_path: path.join(__dirname, '../creds'),
        provider: 'http://localhost:8545',
        accounts: ['0xaef63336c581e718a0a15f89cd3ec7196830c0e2',
                    '0xfcef5982ee444b9a64b6c00b24f12ba2c91706f4',
                    '0x7a1b2d05ef58f5e9ddf3f3e6878cf82b8a73dfa8',
                    '0x0d9412a8894fde1077a359c9c6ccae3d3b8adfdf',
                    '0xf80a3e4234c7e27f05d18d7bf7b2f02ff78bbb96',
                    '0x45b415a5e79294240312003477850d27dc750adc',
                    '0x64912518d312a0e27c0057113ef29cd272ca840e',
                    '0xec5841707a448c01bc783c16cc2720b2b5f67823',
                    '0x93fb9bd1ec89f3567be24b3ef6c59a10ed44d9bb',
                    '0x48ec0cd61a697c6c9ea14d1897cabfd8878dd20b']
    }
};