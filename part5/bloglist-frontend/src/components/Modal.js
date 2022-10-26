import ReactDOM from 'react-dom'
// import Close from "./times-solid.svg";
import Close from "./cross.svg";
import './modal.css'
const Modal = ({ show, close }) => {
    return ReactDOM.createPortal(
        <>
            {
                show ?

                    <div
                        className="modalContainer"
                        onClick={() => close()}
                    >
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <header className="modal_header">
                                <h2 className="modal_header-title"> Modal Title </h2>
                                <button className="close"   onClick={() => close()}>
                                    <img src={Close} alt="close" />
                                </button>
                            </header>
                            <main className="modal_content">
                                This is Modal Content
                            </main>
                            <footer className="modal_footer">
                                <button className="modal-close"  onClick={() => close()}>
                                    Cancel
                                </button>

                                {/* <button className="submit">Submit</button> */}
                            </footer>
                        </div>
                    </div>
                    : null
            }
        </>
        , document.getElementById("modal")
    );
};
export default Modal