import { promises as fs } from "fs";

class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
        this.format = "utf-8"
    }

    static id = 0
    
    addProduct = async (title, description, price, image, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id : ProductManager.id
        }

        this.products.push(newProduct)
        
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    getProducts = async() => {
        let respuesta = (JSON.parse(await fs.readFile(this.patch, this.format)))
        console.log(respuesta);

    }
}

const productos = new ProductManager

productos.addProduct('motorolla g200', 'celular gama alta', 150000, 'imagenG200', 'ku2001', 10 )
productos.addProduct('motorolla g50', 'celular gama media', 98000, 'imagenG50', 'ku501', 15 )