'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';

export default function DebugOrdersCheckPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [userOrders, setUserOrders] = useState<any[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Check current user
        const currentUser = auth.currentUser;
        setUser(currentUser);

        if (!currentUser) {
          console.log('No user logged in');
          setLoading(false);
          return;
        }

        console.log('Current user:', currentUser.uid);

        // Fetch all orders
        const allOrdersRes = await fetch('/api/debug/orders');
        const allOrdersData = await allOrdersRes.json();
        setAllOrders(allOrdersData.orders || []);

        // Filter orders for current user
        const userOrdersList = (allOrdersData.orders || []).filter(
          (order: any) => order.userId === currentUser.uid
        );
        setUserOrders(userOrdersList);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Orders Check</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            {/* User Info */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">User Info</h2>
              {user ? (
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm">
                    <strong>UID:</strong> {user.uid}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-sm">
                    <strong>Display Name:</strong> {user.displayName || 'Not set'}
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 p-4 rounded text-red-700">
                  <p>❌ No user logged in</p>
                </div>
              )}
            </div>

            {/* All Orders in Database */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">
                All Orders in Database ({allOrders.length})
              </h2>
              {allOrders.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {allOrders.map((order: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded text-sm">
                      <p>
                        <strong>ID:</strong> {order.id}
                      </p>
                      <p>
                        <strong>User ID:</strong>{' '}
                        {order.userId || '<no userId field>'}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Items:</strong> {order.items?.length || 0}
                      </p>
                      <p>
                        <strong>Total:</strong> Rp {order.totalPrice?.toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No orders in database</p>
              )}
            </div>

            {/* User's Orders */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">
                Your Orders ({userOrders.length})
              </h2>
              {user && userOrders.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {userOrders.map((order: any, idx: number) => (
                    <div key={idx} className="bg-green-50 p-3 rounded text-sm border-l-4 border-green-500">
                      <p>
                        <strong>ID:</strong> {order.id}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Items:</strong> {order.items?.length || 0}
                      </p>
                      <p>
                        <strong>Total:</strong> Rp {order.totalPrice?.toLocaleString('id-ID')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  {user ? 'No orders found for your account' : 'Please log in to see your orders'}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
