import express from "express"
import ProductManager from "./components/product_manager.js"

const app = express()
app.use(express.urlencoded({extended : true}))

const productos = new ProductManager()
const readProducts = productos.readProducts()

app.get('/products', async (req, res) => {
    res.send(await readProducts);
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`server up ${server.address().port}`);
})
server.on('error', (error) => console.log('error del servidor ${error}'))