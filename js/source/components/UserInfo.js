import React from 'react';
import emitter from "./event";

class UserInfo extends React.Component{
    constructor(props){
        super(props);

        this.changeEdit = this.changeEdit.bind(this);
        this.changeIntro = this.changeIntro.bind(this);
        this.submitIntro = this.submitIntro.bind(this);

        this.state={
            load:false,
            name:"",
            introduction:"",
            edit:false
        }
    }

    componentDidMount(){
        this.eventEmitter = emitter.addListener("Page",(msg)=>{
            if(msg != "User"){
                this.setState({load:false})
            } else{
                this.setState({load:true});  
            }         
        });
        this.eventEmitter1 = emitter.addListener("User",(name)=>{
            this.setState({name:name});        
        });
    }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
        emitter.removeListener(this.eventEmitter1);
    }

    changeIntro(e){
        this.setState({introduction:e.target.value});
    }
    submitIntro(e){
        e.preventDefault();
        this.setState({edit:false});
    }
    renderIntro(){
        if(this.state.edit){
            return(
                <form onSubmit={this.submitIntro}>
                    <label>Introduction:{'        '}
                        <input type="text" value={this.state.introduction} 
                        onChange={this.changeIntro}/>
                    </label>
                </form>
            )
        }
        else{
            return(<p>Introduction:{'        '}{this.state.introduction}</p>);
        }
    }

    changeEdit(e){
        var edit = this.state.edit;
        this.setState({edit:!edit});
    }
    renderInfo(){
        const intro = this.renderIntro();
        return(
            <div className="usrInfo">
                <h1>Personal Homepage</h1>
                <div id="icon"></div>
                <p>UserName:{'      '}{this.state.name}</p>
                <div onDoubleClick={this.changeEdit}>
                    {intro}
                </div>
            </div>
        );

    }

    renderOrder(){

    }

    render(){
        if(!this.state.load){
            return <div></div>;
        }
        const info = this.renderInfo();
        return (
            <div className="UserInfo">
                {info}
            </div>
        );
    }
}

export default UserInfo