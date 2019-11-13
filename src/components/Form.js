import React,{Component} from 'react';

import './Form.css'

class Form extends Component{
    state={
        isLatlongHide:true,
        isCityHide:false,
        inputValue: ''
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
       this.setState({inputValue: e.target.value})
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
                    
                    <div className="row">
                        <div className="col-md-3">
                            <input typ="text" name="param" className={this.state.isCityHide ? 'hidden' : 'form-control search-box' }/>
                        {/* </div> */}
                        {/* <input typ="text" name="param" className={this.state.isCityHide ? 'hidden' : '' } onKeyUp={(ev)=>this.props.getWeather(ev)}/> */}
                        {/* <div className="col-md-2"> */}
                            <input type="text" name="lat" className={this.state.isLatlongHide ? 'hidden' : 'form-control' }/>
                        {/* </div> */}
                        {/* <div className="col-md-2"> */}
                            <input type="text" name="long" className={this.state.isLatlongHide ? 'hidden' : 'form-control'}/>
                        </div>
                        <div className="col-md-2">
                            <select name="type" value ={this.state.value} className="form-control" onChange={this.handleChange}>
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