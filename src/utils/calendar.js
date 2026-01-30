/**
 * Utility for calendar operations.
 */

export const generateICS = (event) => {
    const { title, description, location, start, end, url } = event;

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${url || window.location.href}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;
};

export const downloadCalendarFile = (filename, content) => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
