const regexp = /<p>([a-zA-Z]*):(.+?)<\/p>/g;
const str ="<p>idan:person</p>,<p>idan:hat</p>,<p>lia:white</p>,<p>itzik:blue</p>,<p>gil:red</p>,<p>idan:cat</p>,<p>lia:dog</p>"

const array = [...str.matchAll(regexp)];
let nameString,messageString,nameArr=[],messageArr=[],newString=''
array.forEach((item,index)=>{
    if(index === 0){
        nameString = item[1]
        messageString = item[2]
        nameArr.push(item[1])
        messageArr.push(item[2])
    }
    else{
        nameString = `${nameString},${item[1]}`
        messageString = `${messageString},${item[2]}`
        nameArr.push(item[1])
        messageArr.push(item[2])
    }
},'')

nameArr.forEach((item,index)=>{
    newString = `${newString}<p>${item} : ${messageArr[index]}</p>`
})

let a = {
    1:'sd',
    2:'dsf'
}
console.log(a[1])



console.log(newString)

