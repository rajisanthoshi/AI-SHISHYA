import React from 'react';
import './HomePage.css';

export class HomePage extends React.Component{

    render(){
        return(
            <div className='main-page'>
                <div className='navbar'>
                   <modus-navbar
                       id="blue-theme"
                       show-apps-menu
                       variant="blue">
                    </modus-navbar>
                </div>

                <div className='container'>
                    <div className='left-panel'>    
                        <p>Search in</p>
                        <div className='checkboxes'>
                            <modus-list-item size="large"><modus-checkbox label="model1"></modus-checkbox></modus-list-item>
                            <modus-list-item size="large"><modus-checkbox label="model2"></modus-checkbox></modus-list-item>
                            <modus-list-item size="large"><modus-checkbox label="model3"></modus-checkbox></modus-list-item>
                            <modus-list-item size="large"><modus-checkbox label="model4"></modus-checkbox></modus-list-item>
                            <modus-list-item size="large"><modus-checkbox label="model5"></modus-checkbox></modus-list-item>
                            <modus-list-item size="large"><modus-checkbox label="model6"></modus-checkbox></modus-list-item>
                            <modus-list-item size="large"><modus-checkbox label="model7"></modus-checkbox></modus-list-item>
                            <modus-list-item size="large"><modus-checkbox label="model8"></modus-checkbox></modus-list-item>
                            <modus-list-item size="large"><modus-checkbox label="model9"></modus-checkbox></modus-list-item>
                        </div>
                        <modus-select
                           id="select-demo-5"
                           label="Models dropdown"
                           options-display-prop="display">
                        </modus-select>                      
                    </div>

                    <div className='middle-panel'>
                        <div className='text-box'>
                           <modus-text-input placeholder="Ask AI Shishya"></modus-text-input>
                           <modus-button color="tertiary">Ask</modus-button>
                        </div>
                        <div className='model-container'>
                           <iframe>

                           </iframe>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}