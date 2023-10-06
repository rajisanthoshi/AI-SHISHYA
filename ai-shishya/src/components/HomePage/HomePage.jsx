import React from 'react';
import './HomePage.css';
export class HomePage extends React.Component{
    render(){
        return(
            <div>
                <modus-navbar
                    id="blue-theme"
                    show-apps-menu
                    show-help
                    show-main-menu
                    show-notifications
                    variant="blue">
                    <div slot="main">Render your own main menu.</div>
                </modus-navbar>
                <div className='fullpage'>
                    <div className='model-dropdown'>
                <div>
                    <h3>Search in</h3>
                <modus-checkbox label="model1"></modus-checkbox>
                <modus-checkbox label="model2"></modus-checkbox>
                <modus-checkbox label="model3"></modus-checkbox>
                <modus-checkbox label="model4"></modus-checkbox>
                <modus-checkbox label="model5"></modus-checkbox>
                </div>
                <div><modus-dropdown toggle-element-id="toggleElement">
                <modus-button id="toggleElement" slot="dropdownToggle" show-caret="true">Dropdown</modus-button>
                <modus-list slot="dropdownList">
                    <modus-list-item size="condensed">Item 1</modus-list-item>
                    <modus-list-item size="condensed">Item 2</modus-list-item>
                    <modus-list-item size="condensed">Item 3</modus-list-item>
                </modus-list>
                </modus-dropdown></div>               
                </div>
                <div className='textbox'>
                <modus-text-input
                    placeholder="Ask AI Shishya"
                    ></modus-text-input>
                    <modus-button color="tertiary">Ask</modus-button>
                </div>
                </div>
            </div>
        )
    }
}