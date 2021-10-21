const AWS = require('aws-sdk');

const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = 'loopertracks'

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadToBucket = (track, ) => {
    const objectParams = {
        Bucket: BUCKET_NAME,
        Key: track.toString(),
        Body: `Track added by the user ${user.username}`,
        ACL: 'public-read'
    };
    return s3.putObject(objectParams).promise();
}

module.exports={
    uploadToBucket,

}

 
