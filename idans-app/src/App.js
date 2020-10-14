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
import Readme from "./readme";
import ErrorBoundry from "./ErrorBoundry";
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
                  isSignedIn: false,
                  allusers:'',
                  user: {
                        id: '',
                        name: '',
                        email: '',
                      remember:false,
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
        const token = window.localStorage.getItem('token');
        const email = window.localStorage.getItem('email');
        const password = window.localStorage.getItem('password');
        if(password && email){
            this.setState(Object.assign(this.state.user,{email:email}))
        }

        if (token!==undefined&&token!==null) {

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
                                if (user && user.email) {
                                    this.loadUser(user)
                                    let message = this.loggingIn(user.id)
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

                      return (<div>

                      <AllUsers allusers={this.state.allusers}/>
                  </div>)

              case "signin":
                  return(
                  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} loggingIn ={this.loggingIn} email = {this.state.user.email}/>);

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
      loggingIn = async (id) => {
          try {
              await this.setState({isSignedIn: true})
              const token = window.localStorage.getItem('token');
              let result = await fetch(`http://localhost:3000/signin`, {
                  method: 'put',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': token
                  },
                  body: JSON.stringify({
                      id: id,
                      isloggedin: this.state.isSignedIn
                  })
              })
              let result2 = await result.json()
              return result2;


          }
          catch (e) {
              console.log(e)
          }


      }
      onRouteChange = (route) => {
            if (route === 'signout') {
                  this.setState({isSignedIn: false,route:'aboutme'})
                  const token = window.localStorage.getItem('token');
                  fetch(`http://localhost:3000/signout`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': token
                      },
                      body: JSON.stringify({
                          id: this.state.user.id,
                          isloggedin: this.state.isSignedIn
                      })
                   }).then(() => {
                      window.localStorage.removeItem(token)
                   });

            } else if(route === 'allusers') {
                const token = window.localStorage.getItem('token');
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
                    }).catch(err => console.log("yeah"));
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
                      remember:data.remember,
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
        <ErrorBoundry>
        {this.getComponent()}
        </ErrorBoundry>

    </div>
            );

}
}

export default App;
