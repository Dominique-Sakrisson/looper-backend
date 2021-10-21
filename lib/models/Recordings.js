const pool = require('../utils/pool');
const User = require('./User');

module.exports = class Recording {
    key
    duration;
    timing;
    octave;
    

    constructor(row){
        this.id = row.id;
        this.recordingId = row.recording_id;
        this.recordingName = row.recording_name;
        this.ownerUserId = row.owner_user_id;
    }
    //destructure off the user object passed in
    static async createRecording(recording){
        try {
            const {rows} = await pool.query(`INSERT INTO recordings 
            (key, duration, timing, octave) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [recording.key, recording.duration, recording.timing, recording.octave]);
            return new Recording(rows[0]);
        } catch (error) {
                console.log(error);
                return error;  
        }
    }
    // static async getrecordings(){
    //     try {
    //         const {rows} = await pool.query(`SELECT * FROM recordings`)
    //     } catch (error) {
            
    //     }
    // }
}
