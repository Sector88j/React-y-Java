import { useEffect, useState } from "react"

const initialDataForm = {
    id: 0,
    name: '',
    description: '',
    price: ''
}

export const ProductForm = ({productSelected, handlerAdd}) => {

    const [form, setForm] = useState(initialDataForm);

    const {id ,name, description, price} = form;

    useEffect(() => {
        setForm(productSelected);
    } , [productSelected])//CUANDO CAMBIE

    return(
        <form onSubmit = {(event)=> {
            event.preventDefault();

            if(!name  || !description || !price){
                alert("Debe de completar lo datos del formulario")
                return;
            }
            //console.log(form);
            handlerAdd(form);
            setForm(initialDataForm);
        }}>
            <div><input placeholder="name"
                className="form-control my-3 w-75"
                name="name"
                value={name}
                onChange={(event) => setForm({
                    ...form, name: event.target.value
                }) }
            /></div>
            
            <div><input placeholder="description"
                className="form-control my-3 w-75"
                name="description"
                value={ description }
                onChange={(event) => setForm({
                    ...form, description: event.target.value
                })}
            /></div>
            
            <div><input placeholder="price"
                className="form-control my-3 w-75"
                name="price"
                value={price}
                onChange={(event) => setForm({
                    ...form, price: event.target.value
                })}
            /></div>
            
            <button type="submit" className="btn btn-primary">
                {id > 0 ? 'Update': 'Create'}
            </button>
        </form>
    )
}