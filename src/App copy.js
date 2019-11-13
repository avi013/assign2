import React,{Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather'

const API_KEY="71152f973f9220fd1c29abaf7fc6c97c";

class App extends Component {
  
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

  getWeather=async(e)=>{
  
    // let state = Object.assign({}, this.state)
    console.log('inside get', this.state);
    e.preventDefault();
    //console.log("hello", e);
    const searchParam=e.target.elements.param.value;
    const lat=e.target.elements.lat.value;
    const long=e.target.elements.long.value;
    //const zipcode=e.target.elements.zipcode.value;
    const searchType=e.target.elements.type.value;//this.state.value;
    let countryCode='IN';
    console.log(searchParam+'--'+searchType);
    let searchAPI="";
    if(searchType==="name"){
      searchAPI=`http://api.openweathermap.org/data/2.5/weather?q=${searchParam}&appid=${API_KEY}&units=metric`;
    }else if(searchType==="latlong"){
      searchAPI=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
    }else{
      searchAPI=`http://api.openweathermap.org/data/2.5/weather?zip=${searchParam},${countryCode}&appid=${API_KEY}&units=metric`;
    }
    
    console.log(searchAPI+'-----'+searchParam);
    //const apiCallByCityName=`http://api.openweathermap.org/data/2.5/weather?q=${city}`;
    const api_call=await fetch(searchAPI);
    const jsondata=await api_call.json();
    //console.log(jsondata.cod);
    //debugger
    if (jsondata.cod!=='404' && (searchParam || (lat && long))) {
      console.log('inside if', this.state);
      // let history;
      let history = this.state.searchHistory?this.state.searchHistory:[];
      console.log('history', this.state.searchHistory, history);
      const data={
        tempp:jsondata.main.temp,
        city: jsondata.name

      }
      console.log('heeee', data);
      console.log('000',history);
      history.push(data);
      //console.log('lenth-',history.length);
      // if(history.length>6){
      //  history.splice(0,2);
      // }
      //debugger
      console.log('sss--'+history);
      this.setState({
        temperature: jsondata.main.temp,
        city: jsondata.name,
        country: jsondata.sys.country,
        humidity: jsondata.main.humidity,
        description: jsondata.weather[0].description,
        error: "",
        searchHistory: data
      });
      console.log('sss'+this.state.searchHistory);
      localStorage.setItem('history',this.state.searchHistory);
      //console.log('----kdokoq--',localStorage.getItem('history'));
    } else {
      console.log('inside else');
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Entered data is wrong. Please enter valid input."
      });
    }
  }
  render(){
    console.log('inside render', this.state);
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
        //searchHistory={this.state.searchHistory}
        error={this.state.error}
      />
    </div>
  );
}
}

export default App;
