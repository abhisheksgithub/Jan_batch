const recurssiveUpdate = (jsonData, updateKey, val) => {
    if(jsonData === undefined || !(typeof jsonData === 'object' && !Array.isArray(jsonData))) {
        return
    }
    const indx = updateKey.indexOf('.')
    if(indx === -1) {
        jsonData[updateKey] = val
        return
    }
    const currentKey = updateKey.slice(0,indx)
    recurssiveUpdate(jsonData[currentKey], updateKey.slice(indx+1), val)
}

export { recurssiveUpdate }

// {
//     "name": "Clementina DuBuque",
//     "email": "Rey.Padberg@karina.biz",
//     "address": {
//         "suite": "Suite 198",
//         "geo": {
//             "lat": "-38.2386",
//         }
//     }
// }