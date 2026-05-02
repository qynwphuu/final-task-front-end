import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Paper } from '@mui/material';
import { fetchTrainingsWithCustomers } from '../apis/trainingAPI';
import { addMinutes } from 'date-fns';
import '../calendar/Calendar.css'; // Import custom CSS for calendar styling

const Calendar: React.FC = () => {
    // Data
    const [events, setEvents] = useState<EventInput[]>([]);

    useEffect(() => {
        fetchTrainingsWithCustomers()
            .then(data => {
                // after getting data, map it into FullCalendar format
                const formattedEvents = data.map((training) => {
                    const startTime = new Date(training.date)
                    const endTime = addMinutes(startTime, training.duration);

                    return {
                        title: `${training.activity} / ${training.customer?.firstname}`, // add the name of their activity also
                        start: training.date, // get date part only
                        end: endTime.toISOString(), // get end time
                        backgroundColor: '#1976d2',
                        borderColor: '#1976d2',
                        allDay: false // treat as timed event
                    };

                });
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
                    titleFormat={{ year: 'numeric', month: 'long' }}
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
                    // EventInfo
                    eventContent={(eventInfo) => {
                        const start = eventInfo.event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                        const end = eventInfo.event.end?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                        return (
                            <div style={{
                                fontSize: '0.75rem',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                padding: '2px',
                                color: 'white',
                                backgroundColor: '#1976d2',
                                borderRadius: '4px',
                                width: '100%',
                            }}>
                                <b>{start} - {end}</b> {eventInfo.event.title}
                            </div>
                        )
                    }}
                />
            </Paper>
        </Box>
    );
};

export default Calendar;