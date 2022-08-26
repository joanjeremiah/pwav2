import  React,{ useCallback, useEffect, useState } from "react";

import "survey-core/modern.min.css";
// import 'survey-core/survey.min.css';
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import Axios from "axios"
import Spinner from '../../Containers/Spinner/Spinner';
import { toast } from 'react-toastify'
import AudioRecorder from './AudioRecorder'
import {useHistory} from 'react-router-dom'

StylesManager.applyTheme("modern");

function Preliminary() {
  const [surveyJson,setSurveyJson] = useState({ elements:[]})

  const [isloading,setIsloading] = useState(true)
  
  let survey = new Model(surveyJson)

  const history = useHistory();

  useEffect(() => {
    Axios.get('/question/preliminary?s=10')
    .then(doc => {
        console.log(doc)
        
        setIsloading(false)
        setSurveyJson({ elements: doc.data })
    })
  },[])

  const alertResults = useCallback((sender) => {
    console.log(sender.data)
    setSurveyJson(pre => {
      console.log(pre)
      let score = 0;
      pre.elements.forEach(el => {
        if(el.name in sender.data){
          if(el.isPositive){
            if(sender.data[el.name]){
              score++;
            }
            else{
              score--;
            }
          }
          else{
            if(sender.data[el.name]){
              score--;
            }
            else{
              score++;
            }
          }
        }
      })
      console.log(score)
      try{
        Axios.post('/user/score/add',{score})
        .then(res => {
          console.log(res)
          toast(res.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
        })
      }catch(e){
        console.log(e)
      }
      return pre
    })
    history.push('/secondary')
    
  }, [surveyJson.elements]);
  
  if (isloading) {
    return (
        <>
            <div className="container loading">
                <div className="mar-20">
                    <Spinner />
                </div>
            </div>
        </>
    )
  }
  
  survey.focusFirstQuestionAutomatic = false;
  survey.onComplete.add(alertResults);

  return (
    <>
      <AudioRecorder />
      <Survey model={survey} />
    </>
    
  );
}

export default Preliminary;
