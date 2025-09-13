import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchOrders = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=50');
    return data.map(item => ({
        productName: `Task Item #${item.id}`,
        productNumber: `PROD-${item.id * 101}`,
        paymentStatus: item.completed ? 'Paid' : 'Due',
        status: item.completed ? 'Active' : 'Pending',
    }));
};

const RecentOrdersTable = () => {
    const { data: orders, isLoading, error } = useQuery({ queryKey: ['orders'], queryFn: fetchOrders });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const filteredOrders = useMemo(() => {
        if (!orders) return [];
        return orders.filter(order =>
            order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.productNumber.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending': return 'text-yellow-500';
            case 'Declined': return 'text-red-500';
            case 'Active': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };
    
    if (isLoading) return <div className="text-center p-8">Loading orders...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error fetching data.</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <input 
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
              />
            </div>
            {/* --- MOBILE CARD VIEW --- */}
            <div className="grid grid-cols-1 gap-4 sm:hidden">
                {currentOrders.length > 0 ? currentOrders.map((order, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-2">
                        <div className="font-bold text-lg">{order.productName}</div>
                        <div className="text-sm text-gray-500">{order.productNumber}</div>
                        <div className="flex justify-between items-center text-sm">
                            <span>Payment: <span className="font-semibold">{order.paymentStatus}</span></span>
                            <span className={`font-semibold p-1 rounded-md ${getStatusClass(order.status)}`}>{order.status}</span>
                        </div>
                    </div>
                )) : (
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg">No orders found.</div>
                )}
            </div>

            {/* --- TABLET & DESKTOP TABLE VIEW --- */}
            <div className="hidden sm:block bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg overflow-x-auto">
                <table className="w-full text-left">
                    {/* ... table head ... */}
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="p-4">Course Name</th>
                            <th className="p-4">Course Number</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.length > 0 ? currentOrders.map((order, index) => (
                            <tr key={index} className="border-b dark:border-gray-700 last:border-b-0">
                                <td className="p-4">{order.productName}</td>
                                <td className="p-4">{order.productNumber}</td>
                                <td className="p-4">{order.paymentStatus}</td>
                                <td className={`p-4 font-semibold ${getStatusClass(order.status)}`}>{order.status}</td>
                                <td className="p-4 text-blue-500 cursor-pointer hover:underline">Details</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="text-center p-8">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecentOrdersTable;