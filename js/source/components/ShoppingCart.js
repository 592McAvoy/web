import React from 'react';
import emitter from "./event";

class ShoppingCart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            load:false
        }
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            if(msg != "Shopping"){
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
        return <p>Shopping!</p>;
    }
}

export default ShoppingCart