import React from 'react';

const teamMembers = [
    {
        name: "Jaime Lannister",
        role: "CEO",
        img: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
    },
    {
        name: "Cersei Lannister",
        role: "CTO",
        img: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
    },
    {
        name: "Daenerys Targaryen",
        role: "Lead Designer",
        img: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
    },
];

const TeamSection = () => {
    return (
        <div className="py-10 bg-gradient-to-b from-gray-100 to-white text-center">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">Meet Our Team</h2>
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            <h3 className="text-md font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
