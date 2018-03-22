import React from 'react';
import emitter from "./event";

class Log extends React.Component{
    constructor(props){
        super(props);
        this.state={
            load:false,
            log:false
        }
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            if(msg != "Log"){
                this.setState({load:false})
            } else{
                this.setState({load:true});  
            }         
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }

    render(){
        if(!this.state.load){
            return <div></div>;
        }
        return <p>Log!</p>;
    }
}

export default Log