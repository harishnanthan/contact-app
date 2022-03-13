export default function PreviewContact(props) {
    return (
        <div className="card">
            <span>{props.item.name}</span>
            <span>{props.item.phoneNumber}</span>
            <span>{props.item.email}</span>
        </div>
    )
}