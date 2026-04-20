import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Paper } from '@mui/material';
import { fetchTrainings } from '../apis/trainingAPI';

// Define calendar event type
interface CalendarEvent {
  title: string;
  start: string; // YYYY-MM-DD
  color?: string;
}

const Calendar: React.FC = () => {
  // Data
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        fetchTrainings()
        .then(data => {
            // after getting data, map it into FullCalendar format
            const formattedEvents = data._embedded.trainings.map((training) => ({
                title: `${training.activity} / ${training.customer?.firstname}`, // add the name of their activity also
                start: training.date.split('T')[0], // get date part only
                backgroundColor: '#1976d2', // blue color for events
                borderColor: '#1976d2', // same as background for a solid look 
                allDay: true
            }))
            setEvents(formattedEvents);

        })
        .catch(error => console.error('Error fetching trainings:', error));
    }, []);

  return (
    <Box sx={{ width: "100%", height: "90%", p: 2 }}>
      <Paper elevation={3} sx={{ p: 1 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          titleFormat={{year: 'numeric', month: 'long'}}
          events={events}
          height="auto"
          // Custom header toolbar 
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          // CSS 
          eventClassNames="custom-event-bar"
        />
      </Paper>

      {/* CSS for blue texts inside calendar */}
      <style>{`
        .fc-event {
          border: none !important;
          padding: 2px 4px !important;
          margin-bottom: 1px !important;
          border-radius: 4px !important;
          cursor: pointer;
        }
        .fc-event-title {
          font-weight: 500 !important;
          font-size: 0.85em !important;
        }
        .fc-daygrid-day-top {
          flex-direction: row !important; 
        }
        .fc-theme-standard td, .fc-theme-standard th {
          border: 1px solid #eee !important; 
        }
        .fc-toolbar-title {
          font-weight: 700 !important;
          font-size: 1.5em !important;
          color: black !important;
        }
        .fc button {
            background-color: #f8f9fa !important;
            border-color: #ddd !important;
            color: #333 !important;
        }
        .fc button:hover {
            background-color: #e2e6ea !important;
            border-color: #ccc !important;
            color: #000 !important;
        }    
      `}</style>
    </Box>
  );
};

export default Calendar;