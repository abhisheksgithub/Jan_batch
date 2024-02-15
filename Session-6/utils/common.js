const currentDateTimeInString = (currDate) => {
    const date = new Date(currDate);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const hh = date.getHours();
    const min = date.getMinutes();
    const ss = date.getSeconds();
    const ms = date.getMilliseconds();
    return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}:${ms}`;
}

export { currentDateTimeInString }