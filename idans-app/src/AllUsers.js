import React from "react";
import User from "./User";
class AllUsers extends React.Component{


    render() {
        const {allusers} = this.props;
        return(
            <div className="pa4">
                <table className="f9 w-100 mw8 center" cellSpacing="0">
                    <tr className="stripe-dark">
                        <th className="fw6 pa3 bg-white center" >id</th>
                        <th className="fw6 pa3 bg-white center" >Name</th>
                        <th className="fw6 pa3 bg-white center" >email</th>
                        <th className="fw6 pa3 bg-white center" >is logged in</th>
                        <th className="fw6 pa3 bg-white center" >basketball</th>
                        <th className="fw6 pa3 bg-white center" >volleyball</th>
                        <th className="fw6 pa3 bg-white center" >footy</th>
                        <th className="fw6 pa3 bg-white center" >soccer</th>
                        <th className="fw6 pa3 bg-white center" >futsal</th>

                    </tr>
                    {this.props.allusers.map((user,i)=>{
                        return <User id={allusers[i].id} name={allusers[i].name} email={allusers[i].email} basketball={allusers[i].basketball} volleyball={allusers[i].volleyball} footy={allusers[i].footy} soccer={allusers[i].soccer} futsal={allusers[i].futsal} isloggedin = {allusers[i].isloggedin}/>
                    })
                    }
                </table>
            </div>







                );
    }
}
export default AllUsers;