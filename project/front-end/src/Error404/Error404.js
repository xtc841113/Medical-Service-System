import React from 'react';
import './Error404.css';

class Error404 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        
    }

    render(){
        document.body.style = 'background: #DDDDDD;';
        return(
            
            <div className="text-position">
                  <h1>404</h1> 
                  Not Found  
            </div>
        )
    }
}

export default Error404;