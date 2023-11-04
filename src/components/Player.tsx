import React, { useEffect, useState } from 'react'
import SpotifyWebPlayer from 'react-spotify-web-playback'
type PlayerProps = {
    token : string
    trackUri : string;
}
export default function Player(props : PlayerProps) {
    const [play, setPlay] = useState(false);

    useEffect(()=>{setPlay(true)},[props.trackUri])
  return (
    <SpotifyWebPlayer callback={state=>{
        if(!state.isPlaying) setPlay(false)
    }} showSaveIcon token={props.token} play={play} uris={props.trackUri? [props.trackUri] : []}/>
  )
}
