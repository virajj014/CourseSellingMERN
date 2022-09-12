import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { videoatomid } from '../../atoms/currentVideoplaying'
import './Videocard.css'

const Videocard = (props) => {
    let unlocked = 'false'
    if (props.videotype === 'Free' || props.videoaccess === true) {
        unlocked = 'true'
    }
    else if (props.videotype === 'Paid' || props.videoaccess === false) {
        unlocked = 'false'
    }
    const [playvideoid, setvideoid] = useRecoilState(videoatomid)
    const playvideo = () => {
        if (unlocked == 'true') {
            setvideoid(props.videolink)
        }
        else if (unlocked == 'false') {
            window.alert('This video is locked, please purchase the course')
        }
    }
    console.log(props.videolink);
    console.log(playvideoid);

    return (
        <div className={props.videolink === playvideoid ? `videocard videocard-active` : `videocard `} onClick={() => playvideo()}>
            <p>{props.videonum}</p>
            <img src={props.vidimg} />
            <div>
                <h1>{props.title}</h1>
                <h2>{props.description}</h2>
            </div>

            {unlocked == 'true' ?
                <button onClick={() => playvideo()}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                </button>
                :

                <button onClick={() => playvideo()}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                </button>
            }

        </div>
    )
}

export default Videocard