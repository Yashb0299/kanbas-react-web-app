const ConvertDateToString = ({ dateString, isDue }: { dateString: string, isDue: boolean }) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    if (isDue) {
        date.setMinutes(date.getMinutes() - 1);
    }

    const formattedDate = !isNaN(date.getDate()) ? `${date.toLocaleString('default', { month: 'long' })} ${String(date.getDate()).padStart(2, '0')} at ${date.toLocaleTimeString('default', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    })}` : "";

    return (
        <>
            {formattedDate}
        </>
    );
};

export default ConvertDateToString;
