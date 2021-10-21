const pool = require('../utils/pool');
const User = require('./User');

module.exports = class Track {
    id;
    trackId;
    trackName;
    ownerUserId;

    constructor(row){
        this.id = row.id;
        this.trackId = row.track_id;
        this.trackName = row.track_name;
        this.ownerUserId = row.owner_user_id;
    }
    //destructure off the user object passed in
    static async createTrack(track){
        console.log(track, 'yyyyyyyyyyy');
        try {
            const {rows} = await pool.query(`INSERT INTO tracks 
            (track_name, track_id, id) 
            VALUES ($1, $2, $3) RETURNING *`,
            [track.trackName,  track.trackId, 1]);
            return new Track(rows[0]);
        } catch (error) {
                console.log(error);
                return error;  
        }
    }
    // static async getTracks(){
    //     try {
    //         const {rows} = await pool.query(`SELECT * FROM tracks`)
    //     } catch (error) {
            
    //     }
    // }
}
