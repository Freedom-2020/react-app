import { URL } from "url";


test('', () => {
    // const result = getAmount(5);
    // expect(result).toBe(4)
    //const result = getAmount(39);
    findMinNum([[21558440,92303169],[63958031,97066148],[14738097,22643868],[69834481,92725156],[10120709,101819636],[31704567,130482423],[55179497,80051850],[27254586,99531551],[69455306,73419989],[52406219,52434843]])
    console.log('Result:',1)
})

function findMinNum(points: Number[][]) {
    points.sort((a,b)=> {
        if(a[1] !== b[1]){
            return (a[1] as number) - (b[1] as number)
        }else{
            return (a[0] as number) - (b[0] as number)
        }
    })

    let result = 0
    let current = points[0][1]
    for(let i = 1; i < points.length; i ++){
        let start = points[i][0]
        if(start<=current){
            if(points[i+1] === undefined || points[i+1][0] > current){
                result  = result + 1
                if(points[i+1]){
                    current = points[i+1][1]
                }
            }
        }else {
            current = points[i][1]
            result = result + 1
        }
    }
    return result
}





const getAmount = (amount: number) => {
    let result = 0;
    let temp = amount;
    while(temp > 0){
        let stringNum = temp.toString();
        stringNum = stringNum.replace(/5/g, '4');
        temp = parseInt(stringNum) - 1
        result++
    }

    
    return result;
}
