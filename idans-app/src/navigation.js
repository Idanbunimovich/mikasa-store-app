import React from "react";
import "./App.css";


const Navigation = ({onRouteChange,isSignedIn,id}) => {
    if (isSignedIn && id.toString() !== '3') {
            return (

            <ul className="flex f3  underline pa3 pointer list pl0 br3 ba b--black-10 ma0  shadow-5 center" >
                <li className="dim" onClick={() => onRouteChange('home')}>ball shop</li>
                <li className="dim" onClick={()=> onRouteChange('shoppingcart')}>your shopping cart</li>
                <li className="dim" onClick={() => onRouteChange('sports')}>sports</li>
                <li className="dim" onClick={() => onRouteChange('sports')}>readme</li>
                <li className="dim" onClick={() => onRouteChange('readme')}>about me</li>
                <li className="dim ml-auto" onClick={() => onRouteChange('signout')} >sign out</li>
            </ul>
        );

    }
    else if(isSignedIn===false){
        return (
            <ul className="flex f3  underline pa3 pointer list pl0 br3 ba b--black-10 ma0  shadow-5 center">
                <li className="dim" onClick={() => onRouteChange('home')}>ball shop</li>
                <li className="dim" onClick={() => onRouteChange('sports')}>sports</li>
                <li className="dim" onClick={() => onRouteChange('aboutme')}>about me</li>
                <li className="dim" onClick={() => onRouteChange('readme')}>readme</li>
                <li className="dim ml-auto" onClick={() => onRouteChange('signin')} >sign in</li>
                <li className="dim" onClick={() => onRouteChange('register')}>register</li>
            </ul>

        );

        }
    else{ return(
        <ul className="flex f3  underline pa3 pointer list pl0 br3 ba b--black-10 ma0  shadow-5 center" >
            <li className="dim" onClick={() => onRouteChange('home')}>ball shop</li>
            <li className='dim'onClick={()=> onRouteChange('allusers')}>all users</li>
            <li className="dim" onClick={()=> onRouteChange('shoppingcart')}>your shopping cart</li>
            <li className="dim" onClick={() => onRouteChange('sports')}>sports</li>
            <li className="dim" onClick={() => onRouteChange('aboutme')}>about me</li>
            <li className="dim" onClick={() => onRouteChange('readme')}>readme</li>
            <li className="dim ml-auto" onClick={() => onRouteChange('signout')} >sign out</li>
        </ul>
    );
   }
}
export default Navigation;
