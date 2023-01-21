import { Outlet } from "react-router-dom"
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import {ReactComponent as AlyLogo} from '../../assets/crown.svg'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
// import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
// import { CartContext } from "../../contexts/cart.context";
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles';
const Navigation = () =>{
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  // const {currentUser} = useContext(UserContext)
  // const {isCartOpen} = useContext(CartContext)
  // const {currentUser,setCurrentUser} = useContext(UserContext)
  //  console.log("current user",currentUser); 
  
  //  const signOutHandler = async() =>{
  //   const res = await signOutUser()
  //   console.log('res',res);
  //   setCurrentUser(null)
  // }
   return(
      <Fragment>
      {/*
     <div className="navigation">
            <Link className="logo-container" to="/">
                <AlyLogo className="logo"/>
            </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
            SHOP
            </Link>
            {currentUser?(
                <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
              ) :(
                <Link className="nav-link" to='/auth'>
                  SIGN IN
                </Link>
              )
            }
            <CartIcon/>
          </div>
          {isCartOpen && <CartDropdown/>}
        </div>
    */}
       <NavigationContainer>
       <LogoContainer to='/'>
          <AlyLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
       </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

export default Navigation