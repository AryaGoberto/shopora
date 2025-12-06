import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debug: Fetching orders from Firestore...');
    
    const collectionRef = collection(db, 'orders');
    const snapshot = await getDocs(collectionRef);

    console.log(`📦 Found ${snapshot.docs.length} orders`);

    const orders = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });

    console.log('Orders:', orders);

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders: orders,
    });
  } catch (error: any) {
    console.error('❌ Debug Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
