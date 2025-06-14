import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const COLORS = [
    '#6366F1', // Indigo
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#A855F7', // Violet
];

const AllUserchart = ({ totalPostallTime }) => {
    const postData = Array.isArray(totalPostallTime) ? totalPostallTime : [];

    const labels = postData.map(item => item.category);
    const dataCounts = postData.map(item => item.count);
    const total = dataCounts.reduce((sum, val) => sum + val, 0);

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Posts',
                data: dataCounts,
                backgroundColor: COLORS.slice(0, dataCounts.length),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '70%',
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        },
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-semibold mb-2">Post Distribution (Last 6 Months)</h2>
            <div className="relative w-64 h-64">
                <Doughnut data={data} options={options} />
                {/* Centered total text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold">{total}</span>
                    <span className="text-gray-500 text-sm">Total Posts</span>
                </div>
            </div>
        </div>
    );
};

export default AllUserchart;
