
const Notification = (props) => {

    const {contentALert, classALert} = props;
    return (
        <div className={`alert ${classALert ? classALert : 'alert-success'}`} role="alert">
            <i className="fa fa-check" aria-hidden="true">&nbsp;</i>{contentALert}
        </div>
    )
}

export default Notification;