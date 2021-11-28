import React from 'react';

class Navbar extends React.Component {

    render() {
        return(
            <div>
                <nav>
                    <div class="nav-wrapper light-blue darken-4">
                    <a href="/" class="brand-logo">&nbsp;&nbsp;UA Tennis</a>
                    <a href="/" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="/ranked">Ranked Ladder</a></li>
                        <li><a href="/chat">Chat</a></li>
                        <li><a href="/matchentry">Submit Match</a></li>
                    </ul>
                    </div>
                </nav>

                <ul class="sidenav" id="mobile-demo">
                        <li><a href="/ranked">Ranked Ladder</a></li>
                        <li><a href="/chat">Chat</a></li>
                        <li><a href="/matchentry">Submit Match</a></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;
