import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Debug: Testing saveOrder...');
    
    const testOrder = {
      items: [
        {
          id: 'test1',
          name: 'Test Product',
          price: 100000,
          quantity: 1,
          size: 'M',
        }
      ],
      totalPrice: 80000,
      subtotal: 100000,
      discount: 20000,
      deliveryFee: 0,
      paymentMethod: 'fake-payment',
      invoiceNumber: `INV-TEST-${Date.now()}`,
      status: 'confirmed',
      estimatedDelivery: '2025-12-10',
    };

    console.log('Saving test order:', testOrder);

    const collectionRef = collection(db, 'orders');
    const docRef = await addDoc(collectionRef, {
      ...testOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('✅ Test order saved with ID:', docRef.id);

    return NextResponse.json({
      success: true,
      message: 'Test order saved successfully',
      docId: docRef.id,
    });
  } catch (error: any) {
    console.error('❌ Debug Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        errorCode: error.code,
      },
      { status: 500 }
    );
  }
}
