import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0000FF', '#E0E7FF'];  // Blue

const AllUserchart = ({ totalUser }) => {
    const targetTotal = 100;
    const data = [
        { name: 'Total Users', value: totalUser },
        { name: 'Remaining', value: targetTotal - totalUser },
    ];

    return (
        <div className="w-full h-80 flex flex-col items-center justify-center bg-white rounded-xl shadow-md ">
            <h1 className="text-xl font-medium">All Users</h1>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        startAngle={90}
                        endAngle={-270}
                        cornerRadius={15}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="24"
                        fontWeight="bold"
                        fill="#333"
                    >
                        {totalUser}
                    </text>
                </PieChart>
            </ResponsiveContainer>
            <h1 className="text-gray-500 pb-4">Showing total user for all time</h1>
        </div>
    );
};

export default AllUserchart;
