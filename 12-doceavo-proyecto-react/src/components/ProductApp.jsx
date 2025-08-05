import { useEffect, useState } from "react";
import { create, findAll, remove, update } from "../services/ProductService";
import { ProductGrind } from "./ProductGrind";
import PropTypes from "prop-types";
import { ProductForm } from "./ProductForm";

export const ProductApp = ({title}) => {

    const [products, setProducts] = useState([]); //manejo de la tabla

    const [productSelected, setProductSelected] = useState({
        id: 0,
        name: '', 
        description: '',
        price: ''
    })
    const getProducts = async() => {
        const result = await findAll() //listProduct();
        console.log(result);
        setProducts(result.data._embedded.products); //para que se inicialicen una sola vez
    }

    useEffect(  () => {
        getProducts();
    }, []); // es un post creat
    
    const handlerAddProduct = async (product) => { //metodos handler
        console.log(product);
        
        if(product.id > 0){ // products.id > 0 products.includes(product)
            const response = await update(product);
            setProducts(products.map(prod => {
                if(prod.id == response.data.id){
                    return {...response.data}
                }
                return prod;
            }));
        }else{
            const response = await create(product);
            setProducts([...products, {...response.data }]);//cuando creamos un producto le damos un id
        }
    }
    const handlerRemoveProduct = (id) => {
        //console.log(id);
        remove(id);
        setProducts(products.filter(product => product.id != id));
    }

    const handlerProductSelected = (product) => {
        setProductSelected({...product})
    }

    return (
        <div className = "container my-4">
        <h2>{title}</h2>
            <div className="row">
                <div className="col">
                    <ProductForm handlerAdd = {handlerAddProduct} productSelected ={productSelected}/>
                </div>
                <div className="col">
                    {
                        products.length > 0 ? <ProductGrind products = {products} handlerRemove={handlerRemoveProduct} handlerProductSelected={handlerProductSelected}/>
                        :<div className="alert alert-warning">No hay producto en el sistema!</div>
                    }
                    
                </div>
            </div>
        </div>
    )// del padre al hijo

}
ProductApp.propTypes = {
    title: PropTypes.string.isRequired
}