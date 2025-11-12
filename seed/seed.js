const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Get table name from command line or env
const tableName = process.argv[2] || process.env.MOVIES_TABLE || 'MoviesTable';

const sampleData = [
  // Movies
  {
    pk: 'm1234',
    sk: 'xxxx',
    type: 'movie',
    title: 'The Shawshank Redemption',
    releaseDate: '05-03-1995',
    overview: 'A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict.',
  },
  {
    pk: 'm5678',
    sk: 'xxxx',
    type: 'movie',
    title: 'The Godfather',
    releaseDate: '24-03-1972',
    overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his youngest son.',
  },
  // Actors
  {
    pk: 'a6789',
    sk: 'xxxx',
    type: 'actor',
    name: 'Morgan Freeman',
    bio: 'Born in Memphis, Tennessee. After serving in the U.S. Air Force, he began his acting career in New York.',
    dateOfBirth: '01-06-1937',
  },
  {
    pk: 'a1111',
    sk: 'xxxx',
    type: 'actor',
    name: 'Marlon Brando',
    bio: 'An American actor and filmmaker who is often considered one of the most influential actors of all time.',
    dateOfBirth: '03-04-1924',
  },
  // Cast (movie cast members)
  {
    pk: 'c1234',
    sk: '6789',
    type: 'cast',
    actorId: '6789',
    movieId: '1234',
    roleName: 'Ellis Redding',
    roleDescription: 'A contraband smuggler serving a life sentence.',
  },
  {
    pk: 'c1234',
    sk: '7777',
    type: 'cast',
    actorId: '7777',
    movieId: '1234',
    roleName: 'Andy Dufresne',
    roleDescription: 'A banker who is imprisoned for life.',
  },
  {
    pk: 'c5678',
    sk: '1111',
    type: 'cast',
    actorId: '1111',
    movieId: '5678',
    roleName: 'Vito Corleone',
    roleDescription: 'The aging patriarch of an organized crime dynasty.',
  },
  // Awards
  {
    pk: 'w1234',
    sk: 'Academy',
    type: 'award',
    category: 'Best Picture',
    year: 1995,
    body: 'Academy',
  },
  {
    pk: 'w6789',
    sk: 'GoldenGlobe',
    type: 'award',
    category: 'Best Supporting Actor',
    year: 1995,
    body: 'GoldenGlobe',
  },
];

async function seedTable() {
  try {
    console.log(`Seeding table: ${tableName}`);
    
    for (const item of sampleData) {
      await dynamodb.put({
        TableName: tableName,
        Item: item,
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
