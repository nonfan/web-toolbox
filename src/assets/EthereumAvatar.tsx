import React from 'react';
import avatarSrc from './images/ethereum-avatar.png'

function EthereumAvatar() {
  return (
    <div style={{ width: "200px", height: "70px", overflow: "hidden" }}>
      <img
        src={avatarSrc}
        className="pl-18"
        alt="logo"
        style={{
          width: "auto",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center" // 可以换成 "top"、"bottom"、"left"、"right"
        }}
      />
    </div>
  );
}

export default EthereumAvatar;