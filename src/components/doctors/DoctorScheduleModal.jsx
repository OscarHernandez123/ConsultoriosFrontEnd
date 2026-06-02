import { useState, useEffect } from 'react';
import BaseModal from '../BaseModal';
import { getDoctorAvailability } from '../../services/availabilityApi';

function DoctorScheduleModal({ isOpen, onClose, doctor, appointmentTypeId }) {
    const [scheduleMap, setScheduleMap] = useState({});
    const [loading, setLoading] = useState(false);

    const days = ['MON', 'TUE', 'WED', 'THU', 'FRY'];

    async function fetchAvailability() {
        
        setLoading(true);
        
        try {
            const today = new Date();
            const currentDayOfWeek = today.getDay();
            const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
            const monday = new Date(today);
            monday.setDate(today.getDate() + mondayOffset);

            const weekDates = days.map((day, index) => {
                const date = new Date(monday);
                date.setDate(monday.getDate() + index);
                return date.toISOString().split('T')[0];
            });

            const requests = weekDates.map(dateStr => 
                getDoctorAvailability(doctor.id, dateStr, appointmentTypeId)
            );

            const results = await Promise.all(requests);

            const newScheduleMap = {};
            days.forEach((day, index) => {
                newScheduleMap[day] = results[index].map(slot => slot.time);
            });

            setScheduleMap(newScheduleMap);
        } catch (error) {
            setScheduleMap({});
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (doctor && isOpen) {
            fetchAvailability();
        }
    }, [doctor, isOpen]);

    if (!doctor) return null;

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={`Horario — ${doctor.name}`}>
            <div className="schedule-modal-body">
                <p className="schedule-subtitle">
                    Availability Slots
                </p>

                {loading ? (
                    <div className="schedule-loading">
                        Loading...
                    </div>
                ) : (
                    <div className="schedule-grid">
                        {days.map(day => (
                            <div key={day} className="day-column">
                                <span className="day-header">
                                    {day}
                                </span>
                                <div className="slots-container">
                                    {(scheduleMap[day] || []).map(time => (
                                        <div key={`${day}-${time}`} className="time-slot">
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="schedule-footer">
                <button className="btn-outline">
                    + Add Schedule
                </button>
                <button className="btn-primary" onClick={onClose}>
                    Close
                </button>
            </div>
        </BaseModal>
    );
}

export default DoctorScheduleModal;