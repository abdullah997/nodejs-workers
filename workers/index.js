const moment = require("moment");

const getlastactivityFromCollection = (start, end) =>{
                return {
                    'meta.lastActivity': {
                        $lte: new Date(end),
                        $gte: new Date(start) 
                    }
                }
        }
const differenceFromCurrentTime = (time) => {
        let currentTime = Date.now()
        return (currentTime - time);
}

//Pick random Users and assign lastActivity from the goven category.
async function updaterandomActivity (collection){
    let userCount = await collection.countDocuments({});
    let random = Math.floor(Math.random() * ((userCount) - 0) + 0);
    let users= await collection.find({}).skip(random).limit(10).toArray();
    let emails = users.map(user => user.email);
    emails.map((email)=>{
            const MIN = 0;
            const MAX = 6;
            const lastActivity = new Date(moment().subtract(Math.floor(Math.random() * (MAX - MIN) + MIN),"minutes"));
            collection.findOneAndUpdate({ 'email': email },
                { $set: { 'meta.lastActivity': lastActivity } },
                { upsert: true });
        })

        collection.find().forEach( function(myDoc) { console.log( "last Activity " + myDoc.meta.lastActivity );} );
};

// Classify user based on last activity
async function classifyUsers(collection){
        collection.find({
                // find users' collection where last activity is 1-2 minutes or 2-3 or 4-5 minutes
                // Note: time is in ms 
                $or: [
                      getlastactivityFromCollection(60000, 120000),
                      getlastactivityFromCollection(120000, 180000),
                      getlastactivityFromCollection(240000, 300000)
                ]
               
        }, (error,myDoc)=>{
                if(error) console.log(error);
                else{
                   // store users on array Object based on the classification. 
                   const userClass1 = myDoc.filter(user => {
                         if(differenceFromCurrentTime(user.meta.lastActivity) >= 60000 && differenceFromCurrentTime(user.meta.lastActivity) < 120000){
                                 return user;
                            }
                     });
                    
                   const userClass2 = myDoc.filter(user => {
                        if(differenceFromCurrentTime(user.meta.lastActivity) >= 120000 && differenceFromCurrentTime(user.meta.lastActivity) < 180000){
                                return user;
                           }
                    });

                   const userClass3 = myDoc.filter(user => {
                        if(differenceFromCurrentTime(user.meta.lastActivity) >= 240000 && differenceFromCurrentTime(user.meta.lastActivity) < 300000){
                                return user;
                           }
                    });

                    return userClass1,userClass2,userClass3;
                }
        })
        
}

module.exports= {updaterandomActivity,classifyUsers};