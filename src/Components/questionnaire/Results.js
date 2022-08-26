import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../../Containers/Spinner/Spinner';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import moment from 'moment'
import './Results.css'
import meter from '../../assets/file_526682.png'

const Results = () => {

    const [isloading,setIsLoading] = useState(true)
    const [data,setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await Axios.get('/user/result')
            const scores = res.data.scores
            console.log(scores)
            setIsLoading(false)
            scores.forEach(score => {
                score.date = moment(score.date).valueOf(); // date -> epoch
            });
            setData(scores)
        }
        fetchData()
        
    },[])

    const dateFormatter = date => {
        // return moment(date).unix();
        // return new Date(date*1000).toLocaleString()
        return date
      };

    if(isloading){
        return <Spinner />
    }

    return (
        <div className='results-container'>
             <h2>Mood Meter</h2>
             <LineChart className='result-chart' width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis
        tickFormatter={dateFormatter} />
                    <YAxis />
             </LineChart>
             <img src={meter} />
        </div>
    )
}

export default Results