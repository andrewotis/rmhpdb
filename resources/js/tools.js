export const prettifyDate = date => {
    const prettyDate = new Date(Date.parse(date));
    // MM-DD-YYYY
    return `${pad(prettyDate.getMonth() + 1)}-${pad(prettyDate.getDate())}-${prettyDate.getFullYear()}`
}

const pad = number => {
    return number.toString().padStart(2,'0');
}