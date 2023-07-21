import {Readable} from 'node:stream'




class OneToHundredStream extends Readable{
    index = 1

     _read() {
        const i = this.index++
    
        setTimeout(() => {if(i > 100){
            this.push(null)//fornecer infor
        }else{
            const buf = Buffer.from(String(i))//recebe qual informaçao estou querendo converter, buffer n aceita numeros, preciso converter em uma string.
            this.push(buf)
        }}, 100)

     }
    }

fetch('http://localhost:3334', {
    method: 'POST', 
    body: new OneToHundredStream(),
}).then(response => {
    response.text().then(data =>{
        console.log(data)
    })
})
