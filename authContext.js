import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import {doc, getDoc, setDoc} from 'firebase/firestore'

//Importações necessárias

// Cria um contexto de autenticação para ser usado em toda a aplicação
export const AuthContext = createContext();

// Define o provider do AuthContext que envolve a aplicação com estado de autenticação
export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

 // Efeito que escuta alterações no estado de autenticação (login/logout)
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            // console.log('got user: ', user);
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    },[]);

   // Função para buscar dados adicionais do usuário no Firestore e atualizar o estado do usuário
    const updateUserData = async (userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
        }
    }
 // Função para login com e-mail e senha
    const login = async (email, password)=>{
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        }catch(e){
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg='E-mail inválido'
            if(msg.includes('(auth/invalid-credential)')) msg='E-mail ou Senha errada'
            return {success: false, msg};
        }
    }
   // Função para logout do usuário
    const logout = async ()=>{
        try{
            await signOut(auth);
            return {success: true}
        }catch(e){
            return {success: false, msg: e.message, error: e};
        }
    }
  // Função para registrar novo usuário com autenticação + criação de documento no Firestore
    const register = async (email, password, username, profileUrl)=>{
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user :', response?.user);

            // setUser(response?.user);
            // setIsAuthenticated(true);

  // Cria um novo documento com os dados adicionais do usuário
            await setDoc(doc(db, "users", response?.user?.uid),{
                username, 
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user};
        }catch(e){
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg='E-mail inválido'
            if(msg.includes('(auth/email-already-in-use)')) msg='Esse e-mail já está em uso'
            return {success: false, msg};
        }
    }
   // Retorna o provider com o estado e funções disponíveis para qualquer componente filho

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const value = useContext(AuthContext);

   // Garante que o hook está sendo usado dentro do AuthContextProvider
    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}
