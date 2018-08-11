var {Users} =require('./../db/models/User');
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    Users.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        // console.log(user);
        
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send();
    });

}
module.exports = {authenticate};
