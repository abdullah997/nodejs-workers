const moment = require("moment");
module.exports = {
    async getRandomUsers (collection){
        //find 10 random users from the databse and passs their emails in array to next function which radomly update their activity
        let count = await collection.countDocuments({});
        let start = Math.floor(Math.random() * (count - 0) + 0);
        if(start+10>count){
            start -= 10;
        }
        
        let users= await collection.find({}).skip(start).limit(10).toArray();
        users= users.map(user=>(
            user.email
        ));
        return users;
        
         
    },
    async classifyUsers (collection){
        let start = new Date(moment().subtract(2,'minutes').toISOString());
        let end = new Date(moment().toISOString());
        let users =  await collection.aggregate(
        //     [
        //     { $sort: { "meta.lastActivity" : -1 }},
        //     { $minute: "$meta.lastActivity" },
        //     {$limit:10}
        // ]
        [
            { $sort: { "meta.lastActivity" : 1 }},
            {$limit:10},
            {
              $project:
                {
                  minutes: { $minute: "$meta.lastActivity" },
                }
            }
          ]
        ).toArray();
        console.log(users);
        
         
    }
}


