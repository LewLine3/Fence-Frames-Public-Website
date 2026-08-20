const API_KEY = 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjViYTU4ZWZjLWRjZTgtNDJhYi05ZmI1LTQ4NWM2NDFiMDg3OFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjk3NDAyYjVkLTZmNDktNDg1Yi1iNjMzLWVjNTQzMDA4ZWFmN1wifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCI8NDY3YzA4Yi1jNWI3LTQxM2EtYTY0ZS1kZmUxOGViYTYxYzdcIn19IiwiaWF0IjoxNzg2MDMyMjQzfQ.gUnu067VgnICtIFPHcMNw3NnwyBoRAudTFpo7lbestZ2rc5kr0VW6XVlwj_p4Pcfvw5aaA7FOyJi3aiJWBEWZRe88zTtuXlkbBb62bzdqXI8v2-IZmKRx4sMN15JjgRZxwkl5CENViV2lzkdSyR2E4AQ57V4H58AsjCBeNFVB1bRHBsCaBcuHjiH6VTjbmIcEeNKyLJHnuQ0HdTHlaCviVKkCRwOCZqaFIIIaOdWS4Vvz3AzBgs9bMzmQ-Krj3u3QUXEycFqhjEOh7pdcQyyrRlVUcvBS0RJaglR_Bnu35mgAJ2oDRHYp9jJVSQCowanejXduv12FnHAe3p7XlunCg';
const SITE_ID = '87124d40-f445-43c6-ba04-f4d7ac855980';

async function createCollection(collectionId, displayName, fields) {
  console.log(`Creating collection: ${displayName} (${collectionId})...`);
  const res = await fetch('https://www.wixapis.com/wix-data-collections/v2/collections', {
    method: 'POST',
    headers: {
      'Authorization': API_KEY,
      'wix-site-id': SITE_ID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      collection: {
        id: collectionId,
        displayName: displayName,
        fields: fields,
        permissions: {
          read: 'ANYONE',
          insert: 'ADMIN',
          update: 'ADMIN',
          remove: 'ADMIN'
        }
      }
    })
  });

  const data = await res.json();
  console.log(`Result for ${collectionId}:`, res.status, data.collection?.id || data.message || JSON.stringify(data));
}

async function main() {
  await createCollection('ConfiguratorModes', 'Configurator Modes', [
    { key: 'title', type: 'TEXT', displayName: 'Title' },
    { key: 'slug', type: 'TEXT', displayName: 'Slug' },
    { key: 'modeType', type: 'TEXT', displayName: 'Mode Type' },
    { key: 'shortDescription', type: 'TEXT', displayName: 'Short Description' },
    { key: 'fullSummary', type: 'TEXT', displayName: 'Full Summary' },
    { key: 'accessLevel', type: 'TEXT', displayName: 'Access Level' },
    { key: 'sortOrder', type: 'NUMBER', displayName: 'Sort Order' }
  ]);

  await createCollection('FenceStyles', 'Fence Styles', [
    { key: 'title', type: 'TEXT', displayName: 'Title' },
    { key: 'slug', type: 'TEXT', displayName: 'Slug' },
    { key: 'category', type: 'TEXT', displayName: 'Category' },
    { key: 'priceTier', type: 'TEXT', displayName: 'Price Tier' },
    { key: 'basePricePerFoot', type: 'NUMBER', displayName: 'Base Price Per Foot' },
    { key: 'shortDescription', type: 'TEXT', displayName: 'Short Description' }
  ]);
}

main().catch(err => console.error(err));
