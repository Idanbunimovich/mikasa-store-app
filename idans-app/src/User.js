import React from "react";

class User extends React.Component{

    render() {
        const {id,name,email,basketball,futsal,footy,soccer,volleyball} = this.props
        return(
            <tr className="stripe-dark">
                <td className="pa3">{id}</td>
                <td className="pa3">{name}</td>
                <td className="pa3">{email}</td>
                <td className="pa3">{basketball}</td>
                <td className="pa3">{futsal}</td>
                <td className="pa3">{footy}</td>
                <td className="pa3">{soccer}</td>
                <td className="pa3">{volleyball}</td>

            </tr>

        )

    }

}
export default User;