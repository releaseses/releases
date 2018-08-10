import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class NavItem extends Component {
    render () {
        const { to, children, location } = this.props;

        return (
            <li className={location.pathname === to ? 'is-active' : ''}>
                <Link to={to}>{children}</Link>
            </li>
        )
    }
}

export default withRouter(NavItem)
