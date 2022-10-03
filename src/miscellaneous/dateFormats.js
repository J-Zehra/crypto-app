export const changeDateFormat = (period) => {
    let format = '';

    switch(period){
        case '1h': format = 'LT'; break;
        case '3h': format = 'LT'; break;
        case '12h': format = 'LT'; break;
        case '24h': format = 'LT'; break;
        case '7d': format = 'YYYY-MM-DD'; break;
        case '30d': format = 'YYYY-MM-DD'; break;
        case '1y': format = 'YYYY-MM-DD'; break;
        case '3y': format = 'YYYY-MM-DD'; break;
        default: format = 'YYYY-MM-DD'; break;
    }

    return format;
}