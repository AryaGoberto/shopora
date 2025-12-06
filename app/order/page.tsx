'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bell, Package } from 'lucide-react';
import Link from 'next/link';
import { getAllOrders, updateOrderStatus, getOrderReviews } from '../lib/firestoreService';
import { auth } from '../lib/firebase';
import OrderCard from '../components/order/OrderCard';

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'received';

type Order = {
  id: string;
  items: any[];
  totalPrice: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  invoiceNumber: string;
  status: OrderStatus;
  createdAt: any;
  estimatedDelivery?: string;
};

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState('Ongoing');
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersWithReviews, setOrdersWithReviews] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);

  // Load orders from Firestore
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const user = auth.currentUser;
        if (!user) {
          console.warn('⚠️ User not authenticated');
          setOrders([]);
          setIsLoading(false);
          return;
        }
        
        console.log('📥 Fetching orders for user:', user.uid);
        
        const allOrders = await getAllOrders(user.uid);
        console.log('📦 Raw orders from Firestore:', allOrders);
        
        if (!allOrders || allOrders.length === 0) {
          console.warn('⚠️ No orders found in Firestore');
          setOrders([]);
          return;
        }
        
        // Log first order structure
        if (allOrders.length > 0) {
          console.log('🔍 First order structure:', allOrders[0]);
          console.log('🔍 First order status:', allOrders[0].status);
          console.log('🔍 Order statuses in response:', allOrders.map(o => ({ id: o.id, status: o.status })));
        }
        
        // Sort by createdAt descending (newest first)
        const sortedOrders = allOrders.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        });
        
        console.log('✅ Orders loaded and sorted:', sortedOrders.length, 'orders');
        console.log('Status breakdown:', {
          confirmed: sortedOrders.filter(o => o.status === 'confirmed').length,
          processing: sortedOrders.filter(o => o.status === 'processing').length,
          shipped: sortedOrders.filter(o => o.status === 'shipped').length,
          delivered: sortedOrders.filter(o => o.status === 'delivered').length,
          received: sortedOrders.filter(o => o.status === 'received').length,
          other: sortedOrders.filter(o => !['confirmed', 'processing', 'shipped', 'delivered', 'received'].includes(o.status)).length,
        });
        setOrders(sortedOrders);

        // Check which orders have reviews
        const reviewedSet = new Set<string>();
        for (const order of sortedOrders) {
          const reviews = await getOrderReviews(order.id);
          if (reviews && reviews.length > 0) {
            reviewedSet.add(order.id);
            console.log(`✅ Order ${order.id} has ${reviews.length} review(s)`);
          }
        }
        setOrdersWithReviews(reviewedSet);
        console.log(`📊 Total orders with reviews: ${reviewedSet.size}`);
        
      } catch (error) {
        console.error('❌ Error loading orders:', error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
    
    // Note: Removed auto-refresh interval to prevent constant re-renders
    // Orders will only load when page is opened
    
  }, []);

  // Filter orders by status
  const getDisplayData = () => {
    console.log(`🔍 Filtering for tab: ${activeTab}`);
    console.log(`📊 Total orders available: ${orders.length}`);
    
    if (activeTab === 'Ongoing') {
      const ongoing = orders.filter(o => {
        const hasStatus = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'].includes(o.status);
        if (!hasStatus) {
          console.warn(`⚠️ Order ${o.id} has status: "${o.status}" (not in ongoing list)`);
        }
        return hasStatus;
      });
      console.log(`✅ Ongoing orders: ${ongoing.length}`);
      return ongoing;
    }
    if (activeTab === 'Complete') {
      const complete = orders.filter(o => o.status === 'received');
      console.log(`✅ Complete orders: ${complete.length}`);
      return complete;
    }
    // Review tab - only show orders that have reviews
    const reviewed = orders.filter(o => ordersWithReviews.has(o.id));
    console.log(`✅ Reviewed orders: ${reviewed.length} out of ${orders.length}`);
    return reviewed;
  };

  const displayData = getDisplayData();

  // Handle "Pesanan Diterima" button
  const handleOrderReceived = async (orderId: string) => {
    try {
      setIsUpdatingStatus(orderId);
      await updateOrderStatus(orderId, 'received');
      
      // Update local state
      setOrders(orders.map(o => 
        o.id === orderId ? { ...o, status: 'received' } : o
      ));
      
      console.log('✅ Order marked as received:', orderId);
    } catch (error) {
      console.error('❌ Error updating order:', error);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  return (
    <div className="min-h-screen bg-white sm:bg-gray-50 font-sans pb-10">
      
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-20 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between border-b border-gray-100 sm:shadow-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 lg:text-xl">My Orders</h1>
        </div>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition relative">
          <Bell className="w-5 h-5 text-gray-800" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        
        {/* TABS */}
        <div className="bg-[#F0F2F9] p-1.5 rounded-xl flex mb-8">
          {['Ongoing', 'Complete', 'Review'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200
                ${activeTab === tab 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : displayData.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders in {activeTab}</p>
            <Link href="/" className="text-blue-600 font-bold hover:underline">
              Start shopping now
            </Link>
          </div>
        ) : (
          /* ORDER LIST GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayData.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                activeTab={activeTab}
                isUpdatingStatus={isUpdatingStatus}
                onOrderReceived={handleOrderReceived}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
}