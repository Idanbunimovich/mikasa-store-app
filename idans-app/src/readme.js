import React from "react";

const Readme = (props) => {

    return(
        <div className='flex justify-center'>
        <div className='pa4 '>
            <p className='f3 measure pa3'> 1.The store name is idans balls shop </p>
            <p className='f3 measure pa3'>2.Im selling as explicitly i stated in the title mikasa balls</p>
            <p className='f3 measure pa3'>3.the additional pages is explanations about the sports to control your cart and a page a little about myself the app is very interactive and the elements can move and change shape</p>
            <p className='f3 measure pa3'>4.to implement the front end was very challenging for me I learned from scratch and now I feel pretty good with my level in react also I learned about jwt tokens by myself and the difference between different kind of databases learned postgresql by myself it was also chalengin</p>
            <p className='f3 measure pa3'>5.I did it by myself</p>
            <p className='f3 measure pa3'>6.The routes for not signed users are the shop without being able to buy the about me and readme and sports and register and sign in pages for the signed in user it’s the all the pages I stated with out register and sign in and with addition shopping cart and for admin all the pages I just stated plus the allusers page </p>
            <p className='f3 measure pa3'>7.I made my app secured using jwt tokens which I bycrypt and send to server which he stores in redis and I bycrypt the password  asswell and store it in postgres in other table and not send it over the web also the other credentials stored in postgers which is more secure database</p>
            <p className='f3 measure pa3'>8.As I stated previously I did implemented react in the app </p>
        </div>
        </div>
    );

}
export default Readme;