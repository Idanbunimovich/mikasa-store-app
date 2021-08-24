let redis = require('redis')
let fs = require('fs')
let path = require('path')
let dirPath = 'C:\\Users\\idanb\\Desktop\\Bringa\\connections'
let dirPath2 = 'C:\\Users\\idanb\\Desktop\\JSON files - 27May21'
const dirPath3 = 'C:\\Users\\idanb\\Desktop\\Bringa\\JSON files2'

let readDir = (i_dirPath) => {
    return new Promise((res, rej) => {
        fs.readdir(i_dirPath, async (err, files) => {
            if (err) {
                console.error("Could not list the directory.", err);
                process.exit(1);
            } else {
                res(files)
            }
        })
    })
}

let readJson = (htmlString) => {

    return new Promise((resolve) => {
        fs.readFile(htmlString,'utf8', (error, html) => {

            resolve(html)
        })
    })
}
let writeFile = async (data,i) => {

    return new Promise((resolve) => {
        fs.writeFile(`json${i}.json`, data, 'utf8', (error) => {

            resolve('hi')
        })
    })
}
let oes = async () => {
    let files = await readDir(dirPath2)
    let jsonData = {}
    // if(!mainData.workPlaces){
    //     console.log('hi')
    //     mainData = await scrapeProfile(obj,dirPath4,req.body.fullName.toUpperCase(),'BIZZABO')
    //
    // }


    for(let i=0;i<files.length;i++){

            let json = await readJson(path.join(dirPath2, files[i]))
            json = JSON.parse(json)
            let data = {}
            json.forEach(value => {
                if (value.url) {
                    data[value.url] = value
                } else {
                    console.log({url: value.url, name: value.name})
                }
            })
            data = JSON.stringify(data)
            await writeFile(data, 17)
            console.log(i)
        }


}

let its = async () => {
    let files = await readDir(dirPath)
    files = files.sort()
    console.log(files)
}

let jsonData = {}
let i= async () =>
{
    let files = await readDir(dirPath3)
    for (let i = 0; i < files.length; i++) {

        let json = await readJson(path.join(dirPath3, files[i]))
        jsonData[`json${i}`] = JSON.parse(json)
        console.log(i)

    }
}
its()