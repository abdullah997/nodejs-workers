const {getRandomUsers} = require("../db/db")
const moment = require("moment");

module.exports = {
    // function which updates the 10 users last activity
    async assignRandomActivity (collection){
        let emails = await getRandomUsers(collection);
        let updated= await Promise.all(
         emails.map((email) => {
            let activity=  new Date(moment().add(Math.floor(Math.random() * (6 - 0) + 0),'minutes').toISOString());
            return (collection.updateOne( 
                { "email" : email },
                { $set: { "meta.lastActivity" :activity } },
                { upsert: true }
         ))}))
    },
    // function which updates the 10 users last activity
    async classificationFunction (collection){
        let emails = await getRandomUsers(collection);
        let updated= await Promise.all(
         emails.map((email) => {
            let activity=  new Date(moment().add(Math.floor(Math.random() * (6 - 0) + 0),'minutes').toISOString());
            return (collection.updateOne( 
                { "email" : email },
                { $set: { "meta.lastActivity" :activity } },
                { upsert: true }
         ))}))
    }
}


