import React,{Component} from 'react';

import './Form.css'

class Form extends Component{
    state={
        isLatlongHide:true,
        isCityHide:false,
        inputValue: undefined,
        param:undefined,
        lat:undefined,
        long:undefined,
        error: false,
        errorMessage: ''
    }
      handleChange=(e)=>{
        if (e.target.value === "latlong") {
            this.setState({
                isLatlongHide: false,
                isCityHide:true,
            });
       }else if(e.target.value === "zipcode"){
            this.setState({
                isLatlongHide: true,
                isCityHide:false,
            });
        }else{
            this.setState({
                isLatlongHide: true,
                isCityHide:false,
            });
        }
                
        // console.log(e.elements.target.param.value)
        // console.log(this.state.param)
        // console.log(this.state.inputValue)
        // if(e.target.value !==undefined){
        //     this.setState({
        //         param:this.state.param,
        //         lat:this.state.lat,
        //         long:this.state.long
        //     })
        //     this.handleParam(e);
        // }
        // this.setState({
        //    inputValue: e.target.value,
        //    error: e.target.value==="" ? true : false,
        //    errorMessage: e.target.value==="" ? 'Please select an option.' : ""
        // })
      }
      handleParam=(event)=>{
       // this.onSubmit();
        //this.handleChange(event);
        if(this.state.inputValue !== undefined){
            console.log(event.target.value);
            this.setState({
                param: event.target.value,
                inputValue:this.state.inputValue
            });
            console.log("param : "+this.state.param, "selectOption : "+this.state.inputValue);
            let data={
                param:event.target.value,
                selectOption:this.state.inputValue
            }
            console.log("data : "+data);
            this.props.getWeather(data);
        }else{
            this.setState({
                error: true,
                errorMessage: 'Please select an option.'
            })
        }
        
      }

      handleLatLong=(event)=>{

      }
    //   submitFormHandler = event => {
    //       //alert(event.keyCode);
    //     if (event.keyCode === 13) {
    //         this.Form.Submit();    
    //     }
    //     //  alert(this.props.getWeather);   
    //   }
    render(){
        return(
            <div className="inputData">
            <form id="inputformid" onSubmit={this.props.getWeather}>
                <div className="container">
                    <div className="search-form">
                    {
                        this.state.error &&
                        <p>{this.state.errorMessage}</p>
                    }
                    <div className="row">
                        <div className="col-md-3">
                            <input typ="text" name="param" className={this.state.isCityHide ? 'hidden' : 'form-control search-box' }/>
                        {/* </div> */}
                        {/* <input typ="text" name="param" className={this.state.isCityHide ? 'hidden' : 'form-control search-box'} onChange={(ev)=>this.handleParam(ev)}/> */}
                        {/* <div className="col-md-2"> */}
                            <input type="text" name="lat" className={this.state.isLatlongHide ? 'hidden' : 'form-control' } onChange={(e)=>this.handleLatLong(e)}/>
                        {/* </div> */}
                        {/* <div className="col-md-2"> */}
                            <input type="text" name="long" className={this.state.isLatlongHide ? 'hidden' : 'form-control'} onChange={(e)=>this.handleLatLong(e)}/>
                        </div>
                        <div className="col-md-2">
                            <select name="type" value ={this.state.value} className="form-control" onChange={(e) => this.handleChange(e)}>
                                {/* <option value="">Select Option</option> */}
                                <option value="name">Name</option>
                                <option value="latlong">Lat/Long</option>
                                <option value="zipcode">Zip Code</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-info">Get Wether Details</button>
                        </div>
                    </div>
                </div>
                </div>
            </form>
        </div>
        );
    }    
}

export default Form;