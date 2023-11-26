import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  height:"100vh",
  width:"100vw",
  top:"0",
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function OverlayModal({children,onClose}) {
  return ReactDom.createPortal(
    <>
      <div onClick={onClose} style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children}
      </div>
    </>,
    document.getElementById('modal')
  )
}