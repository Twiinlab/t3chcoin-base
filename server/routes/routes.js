var controller = require('./controller')

exports.assignRoutes = function(app) {
    app.get('/api/', controller.getHello); 
    
    app.get('/api/social', controller.getSocialTopList);
    app.post('/api/social', controller.addSocialMessage); 
    
    app.post('/api/user', controller.addUser);
    app.put('/api/user/:userid/buy/:itemid', controller.buyItem);        
    app.get('/api/user/:userid', controller.getUser);    
    app.get('/api/user', controller.getUserTopList);

    app.get('/api/catalog/', controller.getItemCatalogList);

}
  