import React,{Component} from 'react';
import './App.css';
import Register from "./register";
import Navigation from "./navigation";
import Logo from "./logo";
import Particles from 'react-particles-js';
import CardList from "./CardList";
import Signin from "./SignIn";
import Sports from "./Sports";
import AboutMe from "./aboutMe";
import ShoppingCart from "./ShoppingCart";
import AllUsers from "./AllUsers";
import readme from "./readme";
import Readme from "./readme";
const particlesOptions = {
      particles: {

            number: {
                  value: 30,
                  density: {
                        enable: true,
                        value_area: 800
                  }
            }
      },
      interactivity: {
            "detect_on": "window",
            "events": {
                  "onhover": {
                        "enable": true,
                        "mode": "repulse"
                  },
                  "onclick": {
                        "enable": true,
                        "mode": "push"
                  },
                  "resize": true

            }
      }
}

class App extends Component {
      constructor(props) {
            super(props);

            this.state = {
                  route: 'aboutme',
                  isJustgGotIn:true,
                  allusers:'',
                  user: {
                        id: '',
                        name: '',
                        email: '',
                      basketball:'',
                      volleyball:'',
                      soccer:'',
                      footy:'',
                      futsal:''

                  }

            };
            /*this.getComponent=this.getComponent.bind(this);
            this.onRouteChange=this.onRouteChange.bind(this);
            this.loadNewAmount=this.loadNewAmount.bind(this);
            this.loadUser=this.loadUser.bind(this);
            this.loggingIn=this.loggingIn.bind(this);*/
      }
    componentDidMount() {
        const token = window.sessionStorage.getItem('token');
        console.log(token);
        if (token!==null) {
            console.log(token);
            fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response =>
                    response.json())
                .then(data => {
                    console.log(data)
                    if (data && data.id) {
                        fetch(`http://localhost:3000/profile/${data.id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': token
                            }
                        })
                            .then(response => response.json())
                            .then(user => {
                                console.log(user);

                                if (user && user.email) {
                                    this.loadUser(user)
                                    this.loggingIn()
                                }
                            })
                    }
                })
                .catch(err => console.log(err.toString()))
        }

    }





    getComponent = () => {

          switch (this.state.route) {
              case 'home':
                  return(<div>
                      <Logo/>
                      <CardList  id = {this.state.user.id} load={this.loadNewAmount} isSignedIn ={this.state.isSignedIn}volleyball = {this.state.user.volleyball} soccer = {this.state.user.soccer}basketball = {this.state.user.basketball}footy = {this.state.user.footy}futsal = {this.state.user.futsal}/>
                  </div>);
              case 'allusers':
                  console.log(this.state.allusers)
                      return (<div>

                      <AllUsers allusers={this.state.allusers}/>
                  </div>)

              case "signin":
                  return(
                  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} loggingIn ={this.loggingIn}/>);

              case "register":
                  return(
                  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} loggingIn ={this.loggingIn}/>);

              case 'aboutme':
                  return(
                      <AboutMe/>);

              case "sports":
                  return(
                  <Sports/>);

              case "shoppingcart":

                  return (<div>
                      <p className='pa3 center mb0 f2 measure b'>{`${this.state.user.name}\`s shopping cart`}</p>
                      <ShoppingCart  load={this.loadNewAmount} id = {this.state.user.id} volleyball = {this.state.user.volleyball} soccer = {this.state.user.soccer}basketball = {this.state.user.basketball}footy = {this.state.user.footy}futsal = {this.state.user.futsal}/>
                  </div>)
              case "readme":
                  return <Readme/>;
              default :
                  break;

          }
      }
      loggingIn = () => {
          this.setState({isSignedIn: true})
      }
      onRouteChange = (route) => {
            if (route === 'signout') {
                  this.setState({isSignedIn: false,route:'aboutme'})
            } else if(route === 'allusers') {
                const token = window.sessionStorage.getItem('token');
                fetch(`http://localhost:3000/allprofile/${this.state.user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        this.setState({allusers: response},()=>this.setState({route: route}))
                    }).catch(console.log);
            }

            else{
                this.setState({route: route});
            }

      }
      loadUser = (data) => {
          if(data.id===undefined){
              return;
          }
          else {
              this.setState({
                  user: {
                      id: data.id,
                      name: data.name,
                      email: data.email,
                      basketball: data.basketball,
                      volleyball: data.volleyball,
                      soccer: data.soccer,
                      footy: data.footy,
                      futsal: data.futsal
                  }
              })
          }
      }
      loadNewAmount= (basketball,volleyball,futsal,footy,soccer) => {
                      this.setState(Object.assign(this.state.user,{
                      basketball: basketball,
                      volleyball: volleyball,
                      soccer: soccer,
                      footy: footy,
                      futsal: futsal
                  }
              ))
          }


      render (){

            return(
    <div className="App">
          <Particles className="particles"  params={particlesOptions}  />
        <Navigation classsName='flex' onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} id={this.state.user.id}/>
        {this.getComponent()}

    </div>
            );

}
}

export default App;
