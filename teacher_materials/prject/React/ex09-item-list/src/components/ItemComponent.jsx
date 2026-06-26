import './ItemComponent.css'

function ItemComponent(props){
    return (
        <div className="item" onClick={props.onClick}>
            <div className="line1">
                <span>{props.item.no}</span>
                <span>{props.item.name}</span>
            </div>
            <div className="line2">
                {props.item.message}
            </div>
        </div>
    )
}
export default ItemComponent