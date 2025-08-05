import PropTypes from "prop-types"
export const ProductDetail = ({handlerProductSelected ,handlerRemove ,product = {}} ) => {

    return (
    <tr>
        
        <td> {product.name} </td>
        <td> {product.description} </td>
        <td> {product.price} </td>
        <td>
            <button className="btn btn-secondary btn-sn" onClick={() => handlerProductSelected(product)}>
                update
            </button>
        </td>
        <td>
            <button className="btn btn-danger btn-sn" onClick={() => handlerRemove(product.id)}>
                remove
            </button>
        </td>
    </tr> 
    )
}
ProductDetail.propTypes = {
    product: PropTypes.object.isRequired, //validad
    handlerRemove: PropTypes.func.isRequired,
    handlerProductSelected: PropTypes.func.isRequired
}