const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION || 'eu-west-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.argv[2] || process.env.MOVIES_TABLE || 'CdkStack-MoviesTableXXXXXX';

const sampleData = [
  // Movies
  {
    pk: 'm#1234',
    sk: 'm#1234',
    movieID: 1234,
    title: 'The Shawshank Redemption',
    releaseDate: '05-03-1995',
    overview: 'A banker convicted of murder forms a friendship with a fellow prisoner during his life sentence.'
  },
  {
    pk: 'm#5678',
    sk: 'm#5678',
    movieID: 5678,
    title: 'The Godfather',
    releaseDate: '24-03-1972',
    overview: 'The aging patriarch of an organised crime family transfers control of his empire to his youngest son.'
  },

  // Actors
  {
    pk: 'a#4321',
    sk: 'a#4321',
    actorID: 4321,
    name: 'Morgan Freeman',
    dateOfBirth: '01-06-1937',
    bio: 'An American actor, producer and narrator with a career spanning several decades.'
  },
  {
    pk: 'a#7777',
    sk: 'a#7777',
    actorID: 7777,
    name: 'Tim Robbins',
    dateOfBirth: '16-10-1958',
    bio: 'An American actor, director and producer.'
  },
  {
    pk: 'a#1111',
    sk: 'a#1111',
    actorID: 1111,
    name: 'Marlon Brando',
    dateOfBirth: '03-04-1924',
    bio: 'An American actor regarded as one of the most influential actors of the twentieth century.'
  },

  // Roles
  {
    pk: 'm#1234',
    sk: 'a#4321',
    movieID: 1234,
    actorID: '4321',
    roleName: 'Ellis Boyd "Red" Redding',
    roleDescription: 'A long-term inmate who becomes Andy Dufresne\'s closest friend and serves as the film\'s narrator.'
  },
  {
    pk: 'm#1234',
    sk: 'a#7777',
    movieID: 1234,
    actorID: '7777',
    roleName: 'Andy Dufresne',
    roleDescription: 'A banker sentenced to life imprisonment who maintains hope while incarcerated.'
  },
  {
    pk: 'm#5678',
    sk: 'a#1111',
    movieID: 5678,
    actorID: '1111',
    roleName: 'Vito Corleone',
    roleDescription: 'The aging head of the Corleone crime family.'
  }
];

async function seedTable() {
  try {
    console.log(`Seeding table: ${tableName}`);

    for (const item of sampleData) {
      await dynamodb.put({
        TableName: tableName,
        Item: item
      }).promise();

      console.log(`✓ Inserted: ${item.pk} | ${item.sk}`);
    }

    console.log('✓ Seeding complete!');
  } catch (error) {
    console.error('Error seeding table:', error);
    process.exit(1);
  }
}

seedTable();
