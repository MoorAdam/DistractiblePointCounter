import React from "react";
export default function Modal({open, children}) {
    if (!open) return null;
    return (
        <>
            <dialog id="my_modal_1" className="modal" open={open}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{children}</h3>
                </div>
            </dialog>
        </>
    );
}