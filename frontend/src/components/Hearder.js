import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/userActions'


function Hearder() {
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  const logoutHandler = ()=>{
    dispatch(logout())
  }

  return (
    <header>
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>

        <LinkContainer to='/'>
        <Navbar.Brand>Mercadona</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
          
          <LinkContainer to='/cart'>
            <Nav.Link> <i className='fas fa-shopping-cart'></i> Panier</Nav.Link>
          </LinkContainer>
          {/* user connexion conditions info login/logout */}
          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
              <LinkContainer to='/profile'>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Item onClick={logoutHandler}>Se déconnecter</NavDropdown.Item>
            </NavDropdown>

          ):(
              <LinkContainer to='/login'>
                <Nav.Link> <i className='fas fa-user'></i> compte</Nav.Link>
              </LinkContainer>

          )}
          {/* admin accounts */}
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin' id='adminmenu'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Utilisateurs</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Produits</NavDropdown.Item>
              </LinkContainer>

               <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>Commandes</NavDropdown.Item>
              </LinkContainer>
              </NavDropdown>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Hearder
