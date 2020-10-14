import React from "react";

import {asphaltBall, basketBall, footyBall, grassBall, volleyBall} from "./img/export";
import Error from "./error";

class CardList extends React.Component {
    constructor(props) {
        super(props);
        const {basketball,volleyball,futsal,footy,soccer,isSignedIn} = this.props;

        this.state = {
            id:this.props.id,
            isError:false,
            errorMessage:'',
            isSignedIn:isSignedIn,
            searchBox:'',
            basketball:basketball,
            futsal:futsal,
            volleyball:volleyball,
            soccer:soccer,
            footy:footy,
            target:'',
            isSubmit1:'false',
            isSubmit2:'false',
            isSubmit3:'false',
            isSubmit4:'false',
            isSubmit5:'false'
        }
    }
    changeErrorState = ()=>{
        let tmp = !this.state.isError
        this.setState({isError:tmp})
    }
    
    submitToShoppingCart = () => { fetch('http://localhost:3000/shoppingcart1', {
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
        .then((res) => {
            if (res === 'success') {
                this.props.load(this.state.basketball,this.state.volleyball,this.state.futsal,this.state.footy,this.state.soccer)
            }

            switch (this.state.target) {
                case '1':
                    if (res === 'success') {
                        this.setState({isSubmit1: 'true'});
                    } else {
                        this.setState({isSubmit1: 'failed'});
                    }
                    break;
                case '2':
                    if (res === 'success') {
                        this.setState({isSubmit2: 'true'});
                    } else {
                        this.setState({isSubmit2: 'failed'});
                    }
                    break;
                case '3':
                    if (res === 'success') {
                        this.setState({isSubmit3: 'true'});
                    } else {
                        this.setState({isSubmit3: 'failed'});
                    }
                    break;
                case '4':
                    if (res === 'success') {
                        this.setState({isSubmit4: 'true'});
                    } else {
                        this.setState({isSubmit4: 'failed'});
                    }
                    break;
                case '5':
                    if (res === 'success') {
                        this.setState({isSubmit5: 'true'});
                    } else {
                        this.setState({isSubmit5: 'failed'});
                    }
                    break;
                default :
                    break;
            }

        })

    }

    addToShoppingCart = (event) => {

        if (this.state.isSignedIn === false) {
            this.setState({isError:true,errorMessage:("you need to sign in!")},()=>console.log(this.state.errorMessage))
        } else {
                this.setState({target: event.target.id}, () =>{
                switch (this.state.target) {
                case '1':

                    this.setState({basketball: (parseInt(this.state.basketball) + 1)},() => this.submitToShoppingCart())

                    break;
                case '2':
                    this.setState({futsal: (parseInt(this.state.futsal) + 1)},() => this.submitToShoppingCart())
                    break;
                case '3':
                    this.setState({footy: (parseInt(this.state.footy) + 1)},() => this.submitToShoppingCart())
                    break;
                case '4':
                    this.setState({volleyball: (parseInt(this.state.volleyball) + 1)},() => this.submitToShoppingCart())
                    break;
                case '5':
                    this.setState({soccer: (parseInt(this.state.soccer) + 1)},() => this.submitToShoppingCart())
                    break;
                default :
                        break;

            }


        })
    }
    }



    onSearchboxChange = (event) => {
        this.setState({searchBox: event.target.value})


    }

    render() {

        return (
            <div className="parent">

                {this.state.isError === true ? <div className='zone'>
                    <Error change={this.changeErrorState} isError={this.state.isError} errorMessage={this.state.errorMessage}/>
                </div>:null}
                <div className = 'pa2 mw-30'>
                    <input
                        className ='pa3 ba b--green  bg-lightest-blue'
                        type='search'
                        placeholder='search balls'
                        onChange ={this.onSearchboxChange}/>
                </div>
                {"basketball".includes(this.state.searchBox) ?
                    <div className="zone">
                        <div className=' br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                            <img alt='logo' src={basketBall}/>
                            <p className="f2 measure b">basketball</p>
                            {this.state.isSubmit1 === 'true'? <p className="f4 measure no-underline br-pill ba ph3 pv2 mb2 dib black">added to cart</p>
                               : <p className="f4 measure grow no-underline br-pill ba ph3 pv2 mb2 dib black" id='1' onClick={this.addToShoppingCart}>add to shoping card</p>}
                        </div>
                    </div> : <div></div>
                }
                {"futsal ball".includes(this.state.searchBox) ?
                    <div className="zone">
                        <div className=' br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                        <img alt='logo' src={asphaltBall}/>
                        <p className="f2 measure b">futsal ball</p>
                        {this.state.isSubmit2 === 'true'? <p className="f4 measure no-underline br-pill ba ph3 pv2 mb2 dib black">added to cart</p>
                            : <p className="f4 measure grow no-underline br-pill ba ph3 pv2 mb2 dib black" id = '2' onClick={this.addToShoppingCart}>add to shoping card</p>}
                    </div>
                    </div>: <div></div>
                }
                {"footyvolley ball".includes(this.state.searchBox) ?
                    <div className="zone">
                        <div className=' br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                        <img alt='logo' src={footyBall}/>
                        <p className="f2 measure b">footyvolley ball</p>
                        {this.state.isSubmit3 === 'true'? <p className="f4 measure no-underline br-pill ba ph3 pv2 mb2 dib black">added to cart</p>
                            : <p className="f4 measure grow no-underline br-pill ba ph3 pv2 mb2 dib black" id = '3' onClick={this.addToShoppingCart}>add to shoping card</p>}
                        </div> </div>: <div></div>
                }
                {"volleyball".includes(this.state.searchBox) ?
                    <div className="zone">
                        <div className=' br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                        <img alt='logo' src={volleyBall}/>
                        <p className="f2 measure b">volleyball</p>
                        {this.state.isSubmit4 === 'true'? <p className="f4 measure no-underline br-pill ba ph3 pv2 mb2 dib black">added to cart</p>
                            : <p className="f4 measure grow no-underline br-pill ba ph3 pv2 mb2 dib black" id = '4' onClick={this.addToShoppingCart}>add to shoping card</p>}
                        </div></div> : <div></div>
                }
                {"soccer ball".includes(this.state.searchBox) ?



                    <div className="zone">
                        <div className=' br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
                        <img alt='logo' src={grassBall}/>
                        <p className="f2 measure b">soccer ball</p>
                        {this.state.isSubmit5 === 'true'? <p className="f4 measure no-underline br-pill ba ph3 pv2 mb2 dib black">added to cart</p>
                            : <p className="f4 measure grow no-underline br-pill ba ph3 pv2 mb2 dib black" id = '5' onClick={this.addToShoppingCart}>add to shoping card</p>}
                        </div> </div>: <div></div>}
            </div>




        );
    }
}
export default CardList;


