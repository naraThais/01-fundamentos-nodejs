//process.stdin
//.pipe(process.stdout)

//tudo que eu estou recebendo como entrada, eu estou encaminhando (pipe) para uma saída.

import { Readable, Transform, Writable } from 'node:stream'

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
class InverseNumberStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
} 
class MultiplyByTenSream extends Writable{
    _write(chunk, encoding, callback){
            console.log(Number(chunk.toString())*10)
            callback()
    }
}
    
new OneToHundredStream()
.pipe(new InverseNumberStream())
.pipe(new MultiplyByTenSream())

