const { t3chcoinManager } = require('./service');

exports.getHello = function(req, res) {
    res.json({ message: 'hooray! welcome to t3chcoin api!'});
};

exports.getUserTopList = function(req, res) {
    console.log('GET /api/user');
    t3chcoinManager.getUserTopList()
    .then(result => { res.json(result); })
    .catch(error => { console.log('error', error); });
}

exports.getUser = function(req, res) {
    console.log('GET /api/user/:userId');
    t3chcoinManager.getUser(req.params.userid)
    .then(result => { res.json(result); })
    .catch(error => { console.log('error', error); });
}

exports.getSocialTopList = function(req, res) {
    console.log('GET /api/social');
    t3chcoinManager.getTopSocials()
    .then(result => { res.json(result); })
    .catch(error => { console.log('error', error); });
}

exports.addUser = function(req, res) {
    console.log('POST /api/user');
    t3chcoinManager.addUser(req.body.userid, req.body.username, req.body.socialid)
    .then(result => { res.json(result); })
    .catch(error => { console.log('error', error); });
}

exports.buyItem = function(req, res) {
    console.log('PUT /api/user/:userid/buy/:itemid');
    t3chcoinManager.buyItem(req.params.userid, req.params.itemid)
    .then(result => { res.json(result); })
    .catch(error => { console.log('error', error); });
}

exports.addSocialMessage = function(req, res) {
    t3chcoinManager.addSocialMessage(req.body.socialId, req.body.message, req.body.messageTypeIndex)
    .then(result => { res.json(result); })
    .catch(error => { console.log('error', error); });
}

exports.getItemCatalogList = function(req, res) {
    console.log('GET /api/catalog/');
    t3chcoinManager.getItemCatalogList()
    .then(result => { res.json(result); })
    .catch(error => { console.log('error', error); });
}