
/// calculating job experience
let sectionElement= document.querySelector('#experience-section')
let experienceDurationArray = sectionElement.getElementsByClassName('pv-entity__bullet-item-v2')
let jobTitleArray = sectionElement.getElementsByClassName('t-16 t-black t-bold')
let timeAsStudent=sectionElement.getElementsByClassName('pv-entity__date-range t-14 t-black--light t-normal')
let workPlaces=sectionElement.getElementsByClassName('pv-entity__secondary-title t-14 t-black t-normal')
let about = document.getElementsByClassName('lt-line-clamp__raw-line')


let durationNumber,durationStringArray,i,regex
let duationNumbeTotal = 0
let data = {
    duration:0,
    workPlaces:[],
    university:[],
    isStudent:false
}



for (i = 0; i < experienceDurationArray.length; i++) {

    regex = /[0-9]+/g;

    if(jobTitleArray[i].innerText.toUpperCase()==='PROJECT MANAGER'|| jobTitleArray[i].innerText.toUpperCase().indexOf('STUDENT') !== -1) {
        durationStringArray = experienceDurationArray[i].innerText.match(regex)
        durationNumber = durationStringArray.reduce((accumulator, item, index) => {

            if (index === 0) {

                if (durationStringArray.length === 1) {
                    return (parseInt(item) / 12) + accumulator

                } else {
                    return parseInt(item) + accumulator
                }

            } else {
                return accumulator + parseInt(item) / 12
            }

        }, 0)

        if(jobTitleArray[i].innerText.toUpperCase().indexOf('STUDENT') !== -1){
            data.university.push(workPlaces[i].innerText)
            if(timeAsStudent[i].innerText.indexOf('Present')!==-1){
                data.isStudent = true
            }
        }
    else {
            data.duration += durationNumber;
            data.workPlaces.push(workPlaces[i].innerText)
        }
    }

}


console.log(data)

////


