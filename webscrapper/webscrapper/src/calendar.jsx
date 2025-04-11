import Calendar from 'react-calendar'
import React, { useState } from 'react';
import StyleSheet from './calendar.module.css'
import { useEffect } from 'react';



function Cal(){

  const [hacks, setHacks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/hacks/') // replace with your API URL
        .then(res => res.json())
        .then(data => setHacks(data))
        .catch(err => console.error('Failed to fetch hacks:', err));
    }, []);


    const handleDateClick = (value) => {
        setSelectedDate(value); // store clicked date
    };

    function isHackathonOnDate(h, selectedDate){
      const dateStr = h.date|| "" ;
  
      const match = dateStr.match(/^([A-Za-z]{3} \d{2}) - ([A-Za-z]{3} \d{2}), (\d{4})$/);
  
      if(!match) return false;
  
      const[,startStr,endStr,year] = match;
      const startDate = new Date(`${startStr} ${year}`);
      const endDate = new Date(`${endStr} ${year}`); 
  
      return startDate <= selectedDate && selectedDate <= endDate;
    };

    const filteredHacks = hacks.filter((h) => isHackathonOnDate(h, selectedDate));

    return(
        <div className={StyleSheet.calendar}>
            <Calendar onClickDay={handleDateClick} />

            {selectedDate && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#eee" }}>
          {filteredHacks.length > 0 ? (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Hackathons on {selectedDate.toDateString()}:</h2>
              {filteredHacks.map((h, index) => (
                <div key={index} style={{ margin: "10px 0", padding: "10px", background: "#fff", borderRadius: "5px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>{h.title}</h3>
                  <img src={`https:${h.image}`} alt="Hackathon banner" className="w-full h-48 object-cover rounded-lg" />
                  <p style={{ fontSize: "16px" }}>Name : {h.title}</p>
                  <p style={{ fontSize: "16px" }}>Prize : {h.prize}</p>
                  <p style={{ fontSize: "16px" }}>Date : {h.date}</p>
                  <a
                    href={h.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:underline"
                  >
                    Visit
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p>No hackathons on this date.</p>
          )}
        </div>
      )}
        </div>
    )
}

export default Cal