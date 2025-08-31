import React from 'react';
import avatarSrc from './images/ethereum-avatar.png'

function EthereumAvatar() {
  return (
    <div className="w-[200px] h-[70px] overflow-hidden">
      <img
        src={avatarSrc}
        className="pl-18 w-auto h-full object-cover object-center"
        alt="logo"
      />
    </div>
  );
}

export default EthereumAvatar;