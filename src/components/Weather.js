import React from 'react';
import './Weather.css'
const Weather=(props)=>(
	<>
    <div className="weather_data">
		{	
			props.city && props.country && <p className="weather__key"> Location: 
				<span className="weather__value"> { props.city }, { props.country }</span>
			</p> 
		}
		{ 	
			props.temperature && <p className="weather__key"> Temperature: 
				<span className="weather__value"> { props.temperature }	</span>
			</p> 
		}
		{ 	
			props.humidity && <p className="weather__key"> Humidity: 
				<span className="weather__value"> { props.humidity } </span>
			</p> 
		}
		{ 	
			props.description && <p className="weather__key"> Conditions: 
				<span className="weather__value"> { props.description } </span>
		</p> 
		}
		{ 
			props.error && <p className="weather__error">{ props.error }</p>  
		}
	</div>
	
		{
			props.searchHistory && <div className="history-section">
			{props.searchHistory.map((item, i)=>{
				return(
				<div className="history-inner" key={i}>
					<span className="searchHistory"><p>{item.temp+'C'}</p><p>{item.city}</p></span>
				</div>
				)
			})}
			
			</div>
		}
	
	</>
);
export default Weather;