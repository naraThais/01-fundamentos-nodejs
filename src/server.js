import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Query parameters: URL Stateful => usados para filtros, paginaçao, busca, não sao info obrigatorios 
// http://localhost:3333/users?usersId=1&name=Thais

// Route Parameters: parametros n nomeados que tbm ficam na rota => identificaçao de recurso 
// http://localhost:3333/users/1

// Request Body: Envio de informaçoes de um form (https)



const Server = http.createServer(async(req, res) => {
    const {method, url} = req 
    
    await json(req,res)
    const route = routes.find(route =>{
        return route.method === method && route.path === url
    })
    if (route){
        return route.handler(req,res)
    }
    return res.writeHead(404).end('Not Found!')
})

Server.listen(3333)