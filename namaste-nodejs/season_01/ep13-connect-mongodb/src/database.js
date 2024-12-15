import {Db, MongoClient} from 'mongodb';

const uri =
  'mongodb+srv://sahil-jassal:WFDjS39MRQDomPOF@namastenodejs.etwne.mongodb.net/';
const client = new MongoClient(uri);

/** @type {Db | undefined} */
let database = undefined;

async function main() {
  try {
    database = client.db('learn');
    const collection = database.collection('users');
    /* const user = {
      firstName: 'Mukesh',
      lastName: 'Gahlot',
      designation: 'Fitness Coach',
      gender: 'Male',
    };
    await collection.insertOne(user);
    const users = await collection.find().toArray();
    const updateResponse = await collection.updateOne(
      {_id: users[0]._id},
      {$set: {lastName: 'Gahlot'}},
    );
    console.log('Update Response: ', updateResponse); */
    const users = await collection.find().toArray();
    console.log(users);
  } finally {
    await client.close();
  }
}
main().catch(console.dir);

export default database;
