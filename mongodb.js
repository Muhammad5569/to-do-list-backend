const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const URL = process.env.URL || 'mongodb://127.0.0.1:27017';
const client = new MongoClient(URL);
const database = 'task-pro'

async function main(name){
    
    await client.connect();
    console.log('Connected Successfull!');

    const db = client.db(database);
    const collection = db.collection('documents')
     
   // const insertMany = await collection.insertMany([{name: 'Muhammad', age:20}, {name:'Asliddin', age:21}])

    const finds = await collection.find({name:'Muhammad'}).toArray()
   // console.log(finds)

    const collection1 = client.db('users').collection('user1') // database users || collection user1
    // collection1.insertOne({name:name})                         //  already inserted
    console.log(await collection1.find({}).toArray());
   const toDo_db= client.db('todo_db').collection('users');
   toDo_db.insertMany([
    {id:'',name:''}
   ])

    return 'done!'
}
console.log(process.env)

main('Hasan1')
    .then(console.log)
    .catch(console.error)
    .finally(()=> client.close)