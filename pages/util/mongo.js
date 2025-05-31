// pages/util/mongo.js
import dbConnect from '@/util/mongo'; // Adjust this import path if needed

export async function getServerSideProps() {
  try {
    await dbConnect();

    // Example dummy data, replace with your actual MongoDB queries
    const serverMessage = 'Successfully connected to MongoDB.';

    return {
      props: { message: serverMessage },
    };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return {
      props: { message: 'Failed to connect to MongoDB.' },
    };
  }
}

export default function MongoPage({ message }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>MongoDB Connection Status</h1>
      <p>{message}</p>
    </div>
  );
}
