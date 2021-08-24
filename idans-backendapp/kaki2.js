let hi = {
    get:()=>{
        console.log('hi')
    }
}


let proxyHi = new Proxy(hi,{
    get: (target,prop)=>{
        if(prop==='get'){
            return () => {
                console.log('hi')
                hi.get()
            }
        }
    }
})
let hi3 = () => {
    let hi = new Promise((res, rej) => {
        res(true)
    })
    hi.then((item)=>{

    }).then(item=>console.log(item))





}
let hi2 = (f) => {
    console.log(typeof f.name)
}
hi3()



