import React from 'react';
import './Message.scss';
import MessageProps from './MessageProps';

function Message({ deleteError, status }: MessageProps) {
  return (
    <div className={`message ${deleteError ? 'message--error' : ''}`}>
      <p className="message__text">{status}</p>
    </div>
  );
}

export default Message;
