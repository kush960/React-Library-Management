import React from 'react'

function Modal({ openModal, users, selectedUserId, onSelectChange, issueBookHandler,closeRef }) {
    return (<>
        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={openModal}>
            Issue
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Issue Book</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeRef}></button>
                    </div>
                    <div className="modal-body">
                        <p>Please select user.</p>
                        <select className="form-select" aria-label="Default select example"
                            value={selectedUserId} onChange={onSelectChange}>
                            <option value={""}>select user</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={issueBookHandler}>Issue Book</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Modal