let strArray = ['1999 - PRESENT 0',
    ['1999','1999'],
    ['Jan 2009', 'Mar 2011'],
['Jan 2009','2011'],
 ['2009' ,'Mar 2011'],
['Jan 2009','PRESENT']]
let str = 'Oct 1999 - Oct 1823'

let itzik = (str) => {


        let arr = (str.split(' '))
        let data = {}
        if (arr[0] === '-' || !arr[0]) {
            arr = 0
        } else {
            //insert month for the starting year if theres none
            if (!arr[0].match(/[A-Za-z]/g)) {
                arr.unshift('Oct')
            }
            //delete the - sign
            if (arr[2] === '-') {
                arr.splice(2, 1)
            }
            // insert month if there isn't for the ending year
            if (arr[2].toUpperCase() !== 'PRESENT' && !arr[2].match(/[A-Za-z]/g)) {
                arr.splice(2, 0, 'Oct')
            }
            //split present from the duration example:Jan 2009 - PRESENT2 years 3 months
            if (arr[2].slice(0, 7).toUpperCase() === 'PRESENT' && arr[2].length > 7) {
                arr.splice(3, 0, arr[2].slice(7, arr[2].length))
                arr[2] = arr[2].slice(0, 7)
            }
            //split duration from ending year 'Jan 2009 - 20112 years 3 months'
            if(arr[3]) {
                if (arr[3].length > 4) {
                    arr.splice(4, 0, arr[3].slice(4, arr[3].length))
                    arr[3] = arr[3].slice(0, 4)
                }
                //duration joined together
                if (arr[2].toUpperCase() === 'PRESENT') {
                    arr[3] = arr.slice(3, arr.length).join(' ')
                    arr.splice(4, arr.length - 4)
                } else {
                    if (arr[4]) {
                        arr[4] = arr.slice(4, arr.length).join(' ')
                        arr.splice(5, arr.length - 5)
                    }
                }
            }
        }
        return {startMonth:arr[0],startYear:arr[1],endMonth:arr[2],endYear:arr[3]}



}

const clarifyDates = (startDate,endDate) => {
    let arr = [startDate,endDate]
    let isInsertStart = false
    let isInsertEnd = false
    if (!arr[0]|| !arr[1]) {
        arr = 0
    } else {
        //insert month for the starting year if theres none
        if (!arr[0].match(/[A-Za-z]/g)) {
            arr.unshift('Oct')
            isInsertStart = true
        }
        if(!isInsertStart){
            let item = arr.shift()

            item = item.split(' ')
            arr = item.concat(arr)
        }


        // insert month if there isn't for the ending year
        if (arr[2].toUpperCase() !== 'PRESENT' && !arr[2].match(/[A-Za-z]/g)) {
            arr.splice(2, 0, 'Oct')
            isInsertEnd = true
        }

        if(!isInsertEnd&&arr[2].toUpperCase() !== 'PRESENT'){
            let item = arr.pop()
            item = item.split(' ')
            arr = arr.concat(item)
        }


    }
    let startMonth,startYear ,endMonth,endYear
    if(arr) {
        startMonth = arr[0]
        startYear = arr[1]
        endMonth = arr[2]
        if(arr[3]) {
            endYear = arr[3]
        }
        else{
            endYear = ''
        }
    }
    else{
        startMonth = ''
        startYear = ''
        endMonth = ''
        endYear = ''
    }
    return{startMonth,startYear,endMonth,endYear}
}
let {startMonth,startYear,endMonth,endYear} = clarifyDates('1999','2000')
const calculateDateRange = (startMonth,startYear,endMonth,endYear) =>{

    console.log({startMonth,startYear,endMonth,endYear})

    let monthObj = {"Jan":0, "Feb":1, "Mar":2, "Apr":3, "May":4, "Jun":5, "Jul":6, "Aug":7, "Sep":8,"Oct":9, "Nov":10, "Dec":11};
    let from
    let to
    if(endMonth.toUpperCase() === 'Present'.toUpperCase()&&startYear&&startMonth){
        from = new Date(parseInt(startYear),parseInt(monthObj[startMonth]),2)
        to = new Date()
    }
    else {
        from = new Date(parseInt(startYear),parseInt(monthObj[startMonth]),2)
        to = new Date(parseInt(endYear),parseInt(monthObj[endMonth]),2)
    }
    if(startYear) {
        return ({from, to})
    }
    else{
        return 0
    }
}
console.log(calculateDateRange(startMonth,startYear,endMonth,endYear))
