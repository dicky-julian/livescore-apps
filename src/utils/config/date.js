const monthLists = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const generateFormat = (el) => {
    if (el.toString().length === 1) {
        return ('0' + el).slice(-2);
    }
    return el;
}

const getTime = (date) => {
    const newDate = new Date(date);
    const hours = generateFormat(newDate.getHours());
    const minutes = generateFormat(newDate.getMinutes());
    return `${hours}.${minutes}`;
}

const getFullDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();
    return `${day} ${monthLists[month]} ${year}`;
}

let date = new Date();
let day = date.getDate();
let dayTomorrow = day + 1;
let month = date.getMonth() + 1;
let year = date.getFullYear();

day = generateFormat(day);
dayTomorrow = generateFormat(dayTomorrow);
month = generateFormat(month);

let today = `${year}-${month}-${day}`;
let tomorrow = `${year}-${month}-${dayTomorrow}`;

export default {
    today,
    tomorrow,
    getTime,
    getFullDate
}