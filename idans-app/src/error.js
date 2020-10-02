import React from "react";
import "./App.css"

class Error extends React.Component{

    render() {
        return(
            <div className='error fixed br3 ba bg b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                <p className='f4 measure b pa3'>{this.props.errorMessage}</p>
                <div className='flex justify-center'>
                <p className='pa3 br3 b--black-10'onClick={()=>this.props.change('')} >ok</p>
                </div>
            </div>
        )
    }

}
export default Error;