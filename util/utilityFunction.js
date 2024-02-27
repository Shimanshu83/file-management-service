
/**
 * 
 * @param {*} fileData file data 
 * returns the csv data in the form of 
 * {
 *  key : [value1 , value2 ], 
 *  key2 : [value12 , value21]
 * }
 */
function convertCsvFileData(fileData) {

    let fileStringData = fileData.data.toString('utf8');
    let rows = fileStringData.split('\r\n');

    let data = rows[0].split(',').map((data) => {
        if (data !== undefined && data != "" && data !== null) {
            return [data]
        }
    });
    let rowLevelData = "";
    let colLength = data.length;
    for (let i = 1; i < rows.length; i++) {
        rowLevelData = rows[i].split(',');

        for (let j = 0; j < colLength; j++) {
            if (rowLevelData[j] !== "" && rowLevelData[j] !== undefined && rowLevelData[j] !== null) {
                data[j].push(rowLevelData[j]);
            }
        }

    }

    let csvDataObject = {}

    for (let k = 0; k < data.length; k++) {
        let headerColData = data[k][0];
        data[k].shift()
        csvDataObject[headerColData] = data[k];
    }

    return csvDataObject;

}

module.exports = {
    convertCsvFileData
}