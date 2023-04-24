import React from 'react';
import './Message.scss';

function Message(props: any) {
  const isShowMessage:boolean = false;

  if (props.showMessage) {
    props.handleCallBack(isShowMessage);
  }

  return (
    <div className={`message ${props.deleteError ? 'message--error' : ''}`}>
      <p className="message__text">{props.status}</p>
    </div>
  );
}

export default Message;