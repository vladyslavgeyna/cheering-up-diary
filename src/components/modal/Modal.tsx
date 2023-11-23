// src/components/modal/Modal.tsx
import React, { FC, PropsWithChildren } from 'react'
import './Modal.scss'

interface ModalProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, isActive, setIsActive }) => {
    return (
        <div className={isActive ? 'modal active' : 'modal'} onClick={() => setIsActive(false)}>
            <div className={'content'} onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsActive(false)} className="close-button">X</button>
                {children}
            </div>
        </div>
    )
}

export default Modal
