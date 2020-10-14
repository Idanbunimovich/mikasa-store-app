import React from "react";
import Error from "./error";
import "./App.css";



class ShoppingCart extends React.Component{
    constructor(props) {
        super(props);
        const {basketball,volleyball,futsal,footy,soccer,id} = this.props;


        this.state = {
            id:id,
            isError:false,
            errorMessage:'',
            basketball:basketball,
            futsal:futsal,
            volleyball:volleyball,
            soccer:soccer,
            footy:footy,
            isSubmit:'false'
        };
        /*this.buttonClick = this.buttonClick.bind(this);
        this.onSubmitCart = this.onSubmitCart.bind(this);*/

    }
    changeErrorState = (message)=>{
        let tmp = !this.state.isError
        this.setState({isError:tmp,errorMessage:message})
    }
    buttonClick = (event) => {
        switch (event.target.id){
            case '+b':
                    this.setState({
                    basketball: (parseInt(this.state.basketball)+1)

                });

                break;
            case '-b':
                if(parseInt(this.state.basketball) === 0) this.changeErrorState('not possible');
                else{
                    this.setState({
                        basketball: (parseInt(this.state.basketball)-1)
                    })
                }
                break;
            case '+f':

                this.setState({
                    footy: (parseInt(this.state.footy)+1)
                })
                break;
            case '-f':
                if(parseInt(this.state.footy) === 0) this.changeErrorState('not possible');
                else{
                    this.setState({
                        footy: (parseInt(this.state.footy)-1)
                    })
                }
                break;
            case '+v':
                this.setState({
                    volleyball: (parseInt(this.state.volleyball)+1)
                })
                break;
            case '-v':
                if(parseInt(this.state.volleyball) === 0) this.changeErrorState('not possible');
                else{
                    this.setState({
                        volleyball: (parseInt(this.state.volleyball)-1)
                    })
                }
                break;
            case '+fu':

                this.setState({
                    futsal: (parseInt(this.state.futsal)+1)
                })
                break;
            case '-fu':
                if(parseInt(this.state.futsal) === 0) this.changeErrorState('not possible');
                else{
                    this.setState({
                        futsal: (parseInt(this.state.futsal)-1)
                    })
                }
                break;
            case '+s':

                this.setState({
                    soccer: (parseInt(this.state.soccer)+1)
                })
                break;
            case '-s':
                if(parseInt(this.state.soccer) === 0) this.changeErrorState('not possible');
                else{
                    this.setState({
                        soccer: (parseInt(this.state.soccer)-1)
                    })
                }
                break;
            default:
                break;
        }

    }

    onSubmitCart = () => {

        fetch('http://localhost:3000/shoppingcart1', {
            method:'put',
            headers: {'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem('token')},
            body: JSON.stringify({
                id:this.state.id,
                basketball: this.state.basketball,
                footy:this.state.footy,
                volleyball:this.state.volleyball,
                futsal:this.state.futsal,
                soccer:this.state.soccer
            })
        })
            .then(response => response.json())
            .then((res)=>{

                if(res === 'success') {
                    this.props.load(this.state.basketball,this.state.volleyball,this.state.futsal,this.state.footy,this.state.soccer)
                    this.setState({isSubmit: 'true'});

                }
                    else{
                        this.setState({isSubmit:'failed'});
                    }

            })
    }

    render() {

        return(

            <div className="pa4">
                {this.state.isError === true ? <div className='zone'>
                    <Error change={this.changeErrorState} isError={this.state.isError} errorMessage={this.state.errorMessage}/>
                </div>:<div></div>}
                <div className="overflow-auto">
                    <table className="f9 w-100 mw8 center" cellSpacing="0">
                        <thead>
                        <tr className="stripe-dark">
                            <th className="fw6 pa3 bg-white center" onClick={this.getShoppingCart}>sport</th>
                            <th className="fw6 pa3 bg-white center">amount</th>
                            <th className="fw6 pa3 bg-white">add</th>
                            <th className="fw6 pa3 bg-white">remove</th>
                        </tr>
                        </thead>
                        <tbody className="lh-copy">
                        <tr className="stripe-dark">
                            <td className="pa3">basketball</td>
                            <td className="pa3">{this.state.basketball}</td>
                            <td className="pa3 dim" id='+b' onClick={this.buttonClick}>+</td>
                            <td className="pa3 dim" id='-b' onClick={this.buttonClick}>-</td>
                        </tr>
                        <tr className="stripe-dark">
                            <td className="pa3">volleyball</td>
                            <td className="pa3">{this.state.volleyball}</td>
                            <td className="pa3 dim" id='+v'onClick={this.buttonClick}>+</td>
                            <td className="pa3 dim" id='-v'onClick={this.buttonClick}>-</td>
                        </tr>
                        <tr className="stripe-dark">
                            <td className="pa3">footyvolley balls</td>
                            <td className="pa3">{this.state.footy}</td>
                            <td className="pa3 dim" id='+f'onClick={this.buttonClick}>+</td>
                            <td className="pa3 dim"id='-f'onClick={this.buttonClick}>-</td>
                        </tr>
                        <tr className="stripe-dark">
                            <td className="pa3">soccer balls</td>
                            <td className="pa3">{this.state.soccer}</td>
                            <td className="pa3 dim" id='+s'onClick={this.buttonClick}>+</td>
                            <td className="pa3 dim" id='-s'onClick={this.buttonClick}>-</td>
                        </tr>
                        <tr className="stripe-dark">
                            <td className="pa3">futsal balls</td>
                            <td className="pa3">{this.state.futsal}</td>
                            <td className="pa3 dim" id='+fu'onClick={this.buttonClick}>+</td>
                            <td className="pa3 dim" id='-fu'onClick={this.buttonClick}>-</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                { this.state.isSubmit === 'true' ?
                    <div className="mt2 pa3 b--black-05">
                        success
                    </div> : (this.state.isSubmit === 'false'? <div className='mt2 pa3 b--black-05 br3 ba b--black-10 shadow-5 center mw5 grow' onClick={this.onSubmitCart}>submit</div> :<div className='mt2 pa3 b--black-05 br3 ba b--black-10 shadow-5 mw5 center'>failed to submit</div>)
                }
            </div>



        )
    }
}
export default ShoppingCart;