import React from 'react';

class Navbar extends React.Component {

    render() {
        return(
            <div>
                <nav>
                    <div className="nav-wrapper light-blue darken-4">
                    <a href="/" className="brand-logo">&nbsp;&nbsp;UA Tennis</a>
                    <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/ranked">Ranked</a></li>
                        <li><a href="/dashboard">Member Dashboard</a></li>
                    </ul>
                    </div>
                </nav>

                <ul className="sidenav" id="mobile-demo">
                        <li><a href="/ranked">Ranked</a></li>
                        <li><a href="/dashboard">Member Dashboard</a></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;
