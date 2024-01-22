const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://new_user123:database123@cluster0.azdhmqd.mongodb.net/?retryWrites=true&w=majority/Week01";

  const client = new MongoClient(uri);

  await client.connect();

  try {
    await client.connect();

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`- ${db.name}`);
  });
}
