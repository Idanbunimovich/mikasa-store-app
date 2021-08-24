let array = [{sfs:'sdfsdf',sd:'sdf'},{sfs:'kaki',sd:'sdf'},{sfs:'sdfsdf',sd:'sdf'},{sfs:'sdfsdf',sd:'sdf'}]
let sd = array.find(item=>item.sfs === 'kaki')
sd.sfs = 'bulbul'
let obj = {itzik:'sdfs',0:'sdf'}
console.log(array)
obj = {...obj,0:'sdfs'}
console.log(obj)
