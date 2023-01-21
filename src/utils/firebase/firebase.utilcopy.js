import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    writeBatch,
    query,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCbArxFPv4wVLpYU4Lr5M_rrMoMUBmV74w",
    authDomain: "aly-clothing-db.firebaseapp.com",
    projectId: "aly-clothing-db",
    storageBucket: "aly-clothing-db.appspot.com",
    messagingSenderId: "340465460864",
    appId: "1:340465460864:web:d77b69083a436dcef86865",
    measurementId: "G-CHZSSH14WL"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt:"select_account"
  })

export const auth = getAuth();
export const signInWithGooglePopup = () =>
 signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () =>
 signInWithRedirect(auth,googleProvider);
 
export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
  ) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
    
    objectsToAdd.forEach((object) => {
       const docRef = doc(collectionRef, object.title.toLowerCase());
       batch.set(docRef, object);
    });
  
    await batch.commit();
    console.log('done');
  };
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  
    return categoryMap;
  };
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}) =>{
    if (!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid)
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef)
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
        const {displayName,email} = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt,
                ...additionalInformation,
            })
        } catch(error){
            console.log('error crrating the user', error.message);
        }
    }

    return userDocRef;

    // if user data does not exists
    // create / set the document with the data from userAuth in my collection
    // check if user data exists
    // return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
    console.log('result',{email,password});
    if(!email || !password) return; 
   return await createUserWithEmailAndPassword(auth,email,password)

}

export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
    console.log('result',{email,password});
    if(!email || !password) return; 
   return await signInWithEmailAndPassword(auth,email,password)

}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth,callback)