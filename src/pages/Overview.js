import React from 'react'
import {
    MoreHorizontal,
    Monitor,
    Headphones,
    Cpu
} from 'lucide-react';

const Overview = () => {
    const stats = [
        {
            title: 'Orders Completed',
            value: '1,274k',
            color: 'orange',
            icon: '📦'
        },
        {
            title: 'Total revenue made',
            value: '£168k',
            color: 'purple',
            icon: '📈'
        },
        {
            title: 'Total store visits',
            value: '2.5m',
            color: 'blue',
            icon: '👥'
        },
        {
            title: 'Total sales made',
            value: '52,712',
            color: 'pink',
            icon: '💰'
        }
    ];

    const topProducts = [
        {
            name: 'Gold-coast candles',
            dateAdded: 'December 12, 2020',
            price: '£1200',
            earnings: '£17,932',
            icon: Monitor
        },
        {
            name: 'Aburi candles',
            dateAdded: 'January 28, 2021',
            price: '£299',
            earnings: '£15,321',
            icon: Headphones
        },
        {
            name: 'Makola candles',
            dateAdded: 'March 22, 2021',
            price: '£115',
            earnings: '£14,321',
            icon: Cpu
        }
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 border border-gray-100">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                            <div className="text-2xl">{stat.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Revenue this week</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">£8,792</p>
                        </div>
                        <div className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm">
                            £8,792
                        </div>
                    </div>

                    {/* Simple chart representation */}
                    <div className="relative h-64">
                        <svg className="w-full h-full" viewBox="0 0 400 200">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.3 }} />
                                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,150 Q50,140 100,120 T200,100 T300,80 T400,90"
                                stroke="#8b5cf6"
                                strokeWidth="3"
                                fill="none"
                            />
                            <path
                                d="M0,150 Q50,140 100,120 T200,100 T300,80 T400,90 L400,200 L0,200 Z"
                                fill="url(#gradient)"
                            />
                            <circle cx="300" cy="80" r="4" fill="#8b5cf6" />
                        </svg>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
                            <span>June</span>
                            <span>July</span>
                            <span>August</span>
                            <span>September</span>
                            <span>October</span>
                            <span>03:30 PM</span>
                        </div>
                    </div>
                </div>

                {/* Store Visits */}
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Store visits</h3>
                        <MoreHorizontal size={20} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Details about your store visits</p>

                    <div className="space-y-4">
                      

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Monthly</span>
                                <span className="text-sm font-medium">30%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Weekly</span>
                                <span className="text-sm font-medium">70%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Visits/day</span>
                                <span className="text-sm font-medium">60%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Products */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                            <p className="text-sm text-gray-500">Best selling products in your store</p>
                        </div>
                        <MoreHorizontal size={20} className="text-gray-400" />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-sm font-medium text-gray-500 pb-3">Product name</th>
                                    <th className="text-left text-sm font-medium text-gray-500 pb-3">Date added</th>
                                    <th className="text-left text-sm font-medium text-gray-500 pb-3">Price</th>
                                    <th className="text-left text-sm font-medium text-gray-500 pb-3">Total Earning</th>
                                    <th className="text-left text-sm font-medium text-gray-500 pb-3"></th>
                                </tr>
                            </thead>
                            <tbody className="space-y-3">
                                {topProducts.map((product, index) => {
                                    const Icon = product.icon;
                                    return (
                                        <tr key={index} className="border-b border-gray-50">
                                            <td className="py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <Icon size={20} className="text-gray-600" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-sm text-gray-500">{product.dateAdded}</td>
                                            <td className="py-4 text-sm font-medium text-orange-600">{product.price}</td>
                                            <td className="py-4 text-sm font-medium text-teal-600">{product.earnings}</td>
                                            <td className="py-4">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Customers */}
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Customers</h3>
                        <MoreHorizontal size={20} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mb-6">Information about your store's customers</p>

                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                fill="none"
                                stroke="url(#customerGradient)"
                                strokeWidth="8"
                                strokeDasharray="220"
                                strokeDashoffset="50"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="customerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="50%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#f97316" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">139%</div>
                                <div className="text-xs text-gray-500">Total</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                                <span className="text-sm text-gray-600">Current customers</span>
                            </div>
                            <span className="text-sm font-medium">66%</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                                <span className="text-sm text-gray-600">New customers</span>
                            </div>
                            <span className="text-sm font-medium">48%</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                <span className="text-sm text-gray-600">Retargeted customers</span>
                            </div>
                            <span className="text-sm font-medium">25%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview