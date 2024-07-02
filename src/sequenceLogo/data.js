// generate random data
export function generateSeqData(n = 10) {
    const data = [];
    for (let i = 0; i < n; i++) {
        const dataSingle = generateSeqDataSingle();
        data.push(dataSingle);
    }
    return data;
}

function generateSeqDataSingle() {
    const data = {};

    // Returns a random integer from 0 to 100:
    for (const l of ['A', 'G', 'C', 'T']) {
        let r_int = Math.floor(Math.random() * 101);

        // with 30% chance return 0
        if (Math.random() < 0.3) {
            r_int = 0;
        }
        data[l] = r_int;
    }
    return data;
}

export function extendSeqData(data) {
    const dataExtended = [];
    for (let i = 0; i < data.length; i++) {
        const dataCounts = data[i];
        const dataExtendedSingle = {};
        dataExtendedSingle['counts'] = dataCounts;
        dataExtendedSingle['total'] = dataCounts['A'] + dataCounts['G'] + dataCounts['C'] + dataCounts['T'];
        dataExtendedSingle['x'] = i;
        dataExtended.push(dataExtendedSingle);
    }
    return dataExtended;
}

export function changeToStack(data) {
    const dataStack = [];
    for (const d of data) {
        const dArr = [];

        for (const key in d.counts) {
            dArr.push( {'letter': key, 'value': d.counts[key], 'x': d.x} )
        }
        dArr.sort(function(a,b) {
            return a.value - b.value;
        });

        let minY = 0;
        for (const arr of dArr) {
            arr['ymin'] = minY;
            minY += arr.value;
            arr['ymax'] = minY;
        }
        dataStack.push(dArr);
    }
    return dataStack;
}

export function returnTestData() {
    const data = [
        { A: 95, G: 31, C: 0, T: 45 },
        { A: 0, G: 71, C: 42, T: 94 },
        { A: 0, G: 0, C: 19, T: 45 },
        { A: 33, G: 6, C: 38, T: 0 },
        { A: 56, G: 13, C: 0, T: 0 },
        { A: 3, G: 47, C: 0, T: 0 },
        { A: 58, G: 0, C: 20, T: 66 },
        { A: 47, G: 32, C: 0, T: 0 },
        { A: 0, G: 0, C: 0, T: 99 },
        { A: 3, G: 0, C: 90, T: 40 }
    ]
    return data;
}