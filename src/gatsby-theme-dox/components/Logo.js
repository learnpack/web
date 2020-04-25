import React from 'react'
import { Twemoji }  from "react-emoji-render"

function Logo(props) {
  return (
    <div class="logo" style={{ fontSize: "35px", fontWeight: 800 }}>
        <Twemoji text="📦"/> LearnPack
    </div>
  )
}

export default Logo
