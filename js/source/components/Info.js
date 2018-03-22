import React from 'react';
import emitter from "./event";

class Info extends React.Component{
    render(){
        const cb = (msg) => {
            return ()=>{
                emitter.emit("Page",msg)
            }
        }
        return(
            <div className="Info">
                <a href='#' onClick = {cb("Homepage")}>Homepage</a>
                <a href='#' onClick = {cb("Shopping")}>Shopping Cart</a>
                <a href='#' onClick = {cb("User")}>UserInfo</a>
                <a href='#' onClick = {cb("Log")}>Log in/out</a>
            </div>
        );
    }
}

export default Info