import React,{ useState } from 'react'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import Axios from 'axios'

const AudioRecorder = () => {
    const [audioDetails,setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: null,
            m: null,
            s: null,
        }
    })

    function handleAudioStop(data){
        console.log(data)
        setAudioDetails(data)
    }
    async function handleAudioUpload(file) {
        console.log(file);
        // const audioUrl = URL.createObjectURL(audioBlob);
        const audioBlob = new Blob(audioDetails.chunks, {type:'audio/wav; codecs=MS_PCM'});
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        // audio.play();
        var data = new FormData()
        data.append('file', audioBlob)
        // const res = await Axios.post(process.env.REACT_APP_AUDIO_SERVER + '/predict',{
        //     audioDetails,
        //     // file
        // })
        // console.log(res)
        fetch(process.env.REACT_APP_AUDIO_SERVER + '/predict', {
            method: 'POST',
            body: data

        }).then(response => response.json()
        ).then(json => {
            console.log(json)
        });
    }
    function handleRest(){
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
            h: null,
            m: null,
            s: null,
            }
        }
        setAudioDetails(reset)
    }

    function handleOnChange(value, name){
        console.log(value)
    }

    return (
        <Recorder
            record={true}
            title={"Tell us how do you feel today?"}
            audioURL={audioDetails.url}
            showUIAudio
            handleAudioStop={data => handleAudioStop(data)}
            handleOnChange={(value) => handleOnChange(value, 'firstname')}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleReset={() => handleRest()} />
    )
}

export default AudioRecorder