const {Router} = require('express');
const Tracks = require('../models/Track');
const {checkAndAddToken} = require('../auth/checkToken');
module.exports = Router()
.post('/', checkAndAddToken, async (req, res, next) => {
    try {
        console.log(req);
       const track = req.body;
        const responseTrack = await Tracks.createTrack(track);
      
    } catch (error) {
        
    }
})
