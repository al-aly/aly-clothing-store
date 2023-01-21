// import { useEffect } from 'react'
// import { getRedirectResult } from 'firebase/auth'
import { 
    // auth,
    // signInWithGooglePopup,
    // signInWithGoogleRedirect,
    // createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.util.js'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx'
import { AuthenticationContainer } from './authentication.styles';
const Authentication = () =>{
    // useEffect(   () => {
    //     const response =  getRedirectResult(auth);
    //     console.log(response);
    //     if(response){
    //         const userDocRef =  createUserDocumentFromAuth(response.user)
    //     }
    // },[]);

    // const logGoogleUser = async () =>{
    //     // const response = await signInWithGooglePopup()
    //     // console.log(response);
    //     const {user} = await signInWithGooglePopup()
    //     const userDocRef = await createUserDocumentFromAuth(user);
    // }
    // const logGoogleRedirectUser = async () =>{
    //     const {user} = await signInWithGoogleRedirect()
    //     console.log(user);
    // }
    return(
        <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
    )
}

export default Authentication