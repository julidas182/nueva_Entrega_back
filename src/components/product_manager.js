import { promises as fs } from "fs";

export default class ProductManager {
    constructor(){
        this.path = "./productos.js"
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
        
        await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
        
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, this.format)
        return JSON.parse(respuesta)
        
    }

    getProducts = async() =>{
       let respuesta = await this.readProducts()
        return console.log(respuesta);
    } 
    

    getProductsById = async (id) => {
        let respuesta = await this.readProducts()
        if (!respuesta.find(product => product.id === id)){
            console.log('producto no encontrado');
        } else {
            console.log(respuesta.find(product => product.id === id));
        }

        //let filter = respuesta3.find(product => product.id === id)
        //console.log(filter);
    }
    
    // deleteProductsById = async (id) => {
    //     let respuesta = await this.readProducts()
    //     let productFilter = respuesta.filter(products => products.id != id)
    //     await fs.writeFile(this.path, JSON.stringify(productFilter, null, '\t'))
    //     console.log('producto eliminado');
        
    // } 
    deleteProductsById = async (id) => {
        let respuesta = await this.readProducts();
        if (!respuesta.find(product => product.id === id)) {
          console.log('Producto inexistente');
        } else {
          let productFilter = respuesta.filter(product => product.id !== id);
          await fs.writeFile(this.path, JSON.stringify(productFilter, null, '\t'));
          console.log('Producto eliminado');
        }
      }

      updateProducts = async ({id, ...productos}) => {
        await this.deleteProductsById(id)
        let productDel = await this.readProducts()
        let productMod = [{...productos, id}, ...productDel]
        await fs.writeFile(this.path, JSON.stringify(productMod, null, '\t'))
      }
      
}

//const productos = new ProductManager
/*
productos.addProduct('motorolla g200', 'celular gama alta', 150000, 'imagenG200', 'ku2001', 10 )
productos.addProduct('motorolla g50', 'celular gama media', 98000, 'imagenG50', 'ku501', 15 )
productos.addProduct('motorolla g20', 'celular gama baja', 56000, 'imagenG20', 'ku201', 23 )
productos.addProduct('motorolla g70', 'celular gama media', 140000, 'imagenG70', 'ku701', 10 )
productos.addProduct('motorolla g55', 'celular gama media', 90000, 'imagenG55', 'ku551', 20 )
productos.addProduct('motorolla g8', 'celular gama baja', 50000, 'imagenG8', 'ku81', 20 )
productos.addProduct('motorolla g250', 'celular gama alta', 180000, 'imagenG250', 'ku2501', 10 )
productos.addProduct('motorolla g60', 'celular gama media', 95000, 'imagenG60', 'ku601', 15 )
productos.addProduct('motorolla g9', 'celular gama baja', 55000, 'imagenG9', 'ku91', 23 )
productos.addProduct('samsung A20', 'celular gama media', 100000, 'imagenA20', 'ku220', 10 )
productos.addProduct('samsung A50', 'celular gama media', 120000, 'imagenA50', 'ku150', 15 )
productos.addProduct('samsung A04', 'celular gama baja', 56000, 'imagenA04', 'ku104', 23 )*/

//productos.getProducts()
//productos.getProductsById(5)
//productos.deleteProductsById(2)
// productos.updateProducts({
//     "title": "motorolla g200",
// 		"description": "celular gama alta",
// 		"price": 160000,
// 		"image": "imagenG200",
// 		"code": "ku2001",
// 		"stock": 10,
// 		"id": 1
// })