import express from "express"
import ProductManager from "./components/product_manager.js"

const app = express()
app.use(express.urlencoded({extended : true}))

const productos = new ProductManager()
const readProducts = productos.readProducts()

app.get('/products', async (req, res) => {
    let limit = parseInt (req.query.limit)
    let allProducts = await readProducts
    if(!limit) return res.send(allProducts)
    let productLimit = allProducts.slice(0, limit)
    res.send(await productLimit);
})

app.get('/products/:id', async (req, res) =>{
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productById = allProducts.find(product => product.id === id)
    res.send(productById)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`server up ${server.address().port}`);
})
server.on('error', (error) => console.log('error del servidor ${error}'))