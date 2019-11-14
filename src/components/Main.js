import React, { Component } from 'react'

import Title from './Title';
import Form from './Form';
import Weather from './Weather'

const API_KEY="71152f973f9220fd1c29abaf7fc6c97c";

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state= {
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: undefined,
          searchHistory:[]
        }
      }
    
      componentDidMount = () => {
        let data = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];
        this.setState({searchHistory: data});
      }
    
      getWeather=async(e)=>{
        e.preventDefault();
        const searchParam=e.target.elements.param.value;
        const lat=e.target.elements.lat.value;
        const long=e.target.elements.long.value;
        const searchType=e.target.elements.type.value;
        // const searchParam=e.param;
        // const lat=e.lat;
        // const long=e.long;
        // const searchType=e.selectOption;
        let countryCode='IN';
        //console.log(searchParam+'--'+searchType);
        let searchAPI="";
        if(searchType==="name"){
          searchAPI=`http://api.openweathermap.org/data/2.5/weather?q=${searchParam}&appid=${API_KEY}&units=metric`;
        }else if(searchType==="latlong"){
          searchAPI=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
        }else{
          searchAPI=`http://api.openweathermap.org/data/2.5/weather?zip=${searchParam},${countryCode}&appid=${API_KEY}&units=metric`;
        }
        const api_call=await fetch(searchAPI);
        const jsondata=await api_call.json();
        //console.log(jsondata.cod);
        if (jsondata.cod!=='404' && (searchParam || (lat && long))) {
          //console.log('inside if', this.state);
          // let history;
          let history = this.state.searchHistory?this.state.searchHistory:[];
         console.log('history', this.state.searchHistory, history);
         if(history.length===3){
          history.splice(0,1);
         }
          let data={
            temp:jsondata.main.temp,
            city: jsondata.name
          }
          history.push(data);
          console.log('heeee', history);
          //history.push('Temp: '+jsondata.main.temp,'City: '+jsondata.name);
          //debugger
          console.log('sss--'+history);
          this.setState({
            temperature: jsondata.main.temp,
            city: jsondata.name,
            country: jsondata.sys.country,
            humidity: jsondata.main.humidity,
            description: jsondata.weather[0].description,
            error: "",
            //searchHistory: history
          });
          //console.log('sss'+this.state.searchHistory);
          localStorage.setItem('history',JSON.stringify(history));
          //console.log('----kdokoq--',localStorage.getItem('history'));
        } else {
          //console.log('inside else');
          this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            searchHistory:[],
            error: "Entered data is wrong. Please enter valid input."
          });
        }
      }
      render(){
      return (
        <div className="App">
         <Title />
         <Form getWeather={this.getWeather} />
         <Weather 
            temperature={this.state.temperature} 
            humidity={this.state.humidity}
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            searchHistory={this.state.searchHistory}
            error={this.state.error}
          />
        </div>
      );
    }
}
