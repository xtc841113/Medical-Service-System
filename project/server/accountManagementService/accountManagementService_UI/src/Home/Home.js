import React,{Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import bcrypt from 'react-native-bcrypt';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            token:sessionStorage.getItem("token")
        }

        this.isLoginOnChange = this.isLoginOnChange.bind(this);
        this.isLoginOnChange()
        if(this.state.token === null){
            this.setState({
                isLogin: false
            });
        }
    }

    isLoginOnChange(){
        let data = this.props.location.state;
        let self = this;
        bcrypt.compare(data.username, this.state.token, function(err, res) {
            if (res===false){
                self.setState({
                    isLogin: false
                });
            }
            if(err){
                self.setState({
                    isLogin: false
                });
            }
        });
    }

    render(){
        if(this.state.isLogin === false) {
            return <Redirect to="/login" />
        } 

        return(
            <div>
                {this.props.location.state.username}
                <a> 's homePage</a>
                <br/>
                <Link to="/logout">Logout</Link>
            </div>
        ); 
    }
    
}

export default Home;