var controller = require('./controller')

exports.assignRoutes = function(app) {
    app.get('/api/', controller.getHello); 

    app.get('/api/smartcontract', controller.getSmartContractInstance);
    app.put('/api/smartcontract/:smartcontractid', controller.setSmartContractInstance);
    
    app.get('/api/social', controller.getSocialTopList);
    app.get('/api/social/full', controller.getFillSocialTopList);    
    app.get('/api/social/:socialid', controller.getSocial);
    app.post('/api/social', controller.addSocialMessage);
    
    app.post('/api/user', controller.addUser);
    app.put('/api/user/:userid', controller.updateUser);       
    app.put('/api/user/:userid/buy/:itemid', controller.buyItem);   
    app.get('/api/user/:userid', controller.getUser);
    app.get('/api/user', controller.getUserTopList);

    app.get('/api/catalog/', controller.getItemCatalogList);

}
  