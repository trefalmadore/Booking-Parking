const admin = require('firebase-admin');
const serviceAccount = require('./servicekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://booking-parking-6cf05-default-rtdb.firebaseio.com',
});

const db = admin.firestore();

const slotsData = [
  {code: 1, name: 'Slot 1', status: 'available', zone: 'Admin'},
  {code: 2,name: 'Slot 2', status: 'booked', zone: 'Library'},
  {code: 3,name: 'Slot 3', status: 'available', zone: 'Admin'},
  {code: 4,name: 'Slot 4', status: 'available', zone: 'Library'},
  {code: 5,name: 'Slot 5', status: 'available', zone: 'Admin'},
  {code: 6,name: 'Slot 6', status: 'available', zone: 'Library'},
  {code: 7,name: 'Slot 7', status: 'available', zone: 'Admin'},
  {code: 8,name: 'Slot 8', status: 'available', zone: 'Library'},
  {code: 9,name: 'Slot 9', status: 'available', zone: 'Admin'},
  {code: 10,name: 'Slot 10', status: 'available', zone: 'Library'},
  {code: 11,name: 'Slot 11', status: 'available', zone: 'Admin'},
  {code: 12,name: 'Slot 12', status: 'available', zone: 'Library'},
  {code: 13,name: 'Slot 13', status: 'available', zone: 'Admin'},
  {code: 14,name: 'Slot 14', status: 'available', zone: 'Library'},
  {code: 15,name: 'Slot 15', status: 'available', zone: 'Admin'},
  {code: 16,name: 'Slot 16', status: 'available', zone: 'Admin'},
  {code: 17,name: 'Slot 17', status: 'booked', zone: 'Library'},
  {code: 18,name: 'Slot 18', status: 'available', zone: 'Admin'},
  // Add more slots as needed
];

async function seedSlots() {
  const slotsCollection = db.collection('slots');

  try {
    for (const slot of slotsData) {
      // Add each slot to Firestore
      await slotsCollection.add(slot);
    }

    console.log('Slots have been seeded successfully.');
  } catch (error) {
    console.error('Error seeding slots:', error);
  }
}

seedSlots()