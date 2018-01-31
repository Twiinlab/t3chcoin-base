var candidates = require('./candidatesManager')

exports.assignRoutes = function(app) {
    app.get('/api/', candidates.getHello);
    app.get('/api/candidates/', candidates.getCandidatesList)
    app.post('/api/candidates/', candidates.addCandidate)
    app.get('/api/candidates/:candidate_name', candidates.getVotesByCandidate)
    app.put('/api/candidates/:candidate_name', candidates.addVoteByCandidate)
    app.delete('/api/candidates/:candidate_name', candidates.deleteByCandidate)
}
  