import React, { useEffect, useState } from 'react';

function Hackathons() {
  const [hacks, setHacks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/hacks/') // replace with your API URL
      .then(res => res.json())
      .then(data => setHacks(data))
      .catch(err => console.error('Failed to fetch hacks:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {hacks.map((hack, index) => (
        <div key={index} className="bg-white shadow rounded-xl p-4">
          <img src={`https:${hack.image}`} alt="Hackathon banner" className="w-full h-48 object-cover rounded-lg" />
          <h2 className="text-xl font-bold mt-2">{hack.title}</h2>
          <h3 className='text-lg font-bold mt-2'>prize : ${hack.prize}</h3>
          <p className="text-sm text-gray-500">{hack.date}</p>
          <a
            href={hack.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 hover:underline"
          >
            Visit
          </a>
        </div>
      ))}
    </div>
  );
}

export default Hackathons;
