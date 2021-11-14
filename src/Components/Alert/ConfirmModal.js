
const ConfirmModal = (props) => {

    const {modalTitle, modalContent} = props;

    return (
        <div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {modalContent}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Discard</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={props.actionYes}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;