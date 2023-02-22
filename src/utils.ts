const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
    });
}

export {
    formatDate
}