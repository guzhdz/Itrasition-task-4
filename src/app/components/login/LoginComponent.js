//React import
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

//Components imports
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

//Services import
import { insertUser, updateUsers } from '../../services/userService';
import { saveCookie } from '../../services/cookiesService';
import { authUser } from '../../services/authService';

const LoginComponent = ({ setOpacity, setIsLoading }) => {
    const router = useRouter();
    const formsTitles = [
        {
            title: "User login",
            subtitle: "Please log in to continue"
        },
        {
            title: "Create an account",
            subtitle: "Please fill out the form to create your account"
        }
    ]
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [loading, setLoading] = useState(false);

    const resetValues = () => {
        setMessageError('');
        setPasswordVisible(false);
    }

    const toogleForm = () => {
        setOpacity('opacity-0');
        setTimeout(() => {
            resetValues();
            setOpacity('opacity-1');
            setIsLoginForm(!isLoginForm);
        }, 600);
    }

    const handleLogIn = async (data) => {
        setMessageError('');
        setLoading(true);
        if (!validateEmail(data.email))
            setMessageError('Please enter a valid email address');
        else
            await callAuthUser(data);
        setLoading(false);
    }

    const handleRegister = async (data) => {
        setMessageError('');
        setLoading(true);
        if (!validateEmail(data.email))
            setMessageError('Please enter a valid email address');
        else
            await callInsertUser(data);
        setLoading(false);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleViewPassword = () => {
        setPasswordVisible(!passwordVisible);
    }

    const callAuthUser = async (form) => {
        const response = await authUser(form);
        if (response.ok) {
            const saveOk = await callSaveCookie('userId', response.data, 3600 * 2);
            if (saveOk) {
                const updateOk = await updateLoginTime(response.data);
                if(updateOk) {
                    setIsLoading(true);
                    router.push('/admin-panel');
                } else 
                    setMessageError('Something went wrong. Please try again later.');
            } else
                setMessageError('Something went wrong. Please try again later.');
        } else {
            setMessageError(response.message);
        }
    }

    const callInsertUser = async (form) => {
        const user = {
            name: form.name,
            email: form.email,
            lastLoginTime: null,
            registerTime: new Date().toISOString(),
            status: 1,
            password: form.password
        }
        const response = await insertUser(user);
        if(response.ok) {
            const saveOk = await callSaveCookie('webRoute', 'confirm', 60);
            if(saveOk) {
                setIsLoading(true);
                router.push('/confirm');
            } else 
                setMessageError('Something went wrong. Please try again later.');
        } else 
            setMessageError(response.message);
    }

    const updateLoginTime = async (id) => {
        const newLoginTime = new Date().toISOString();
        const users = [
            {
                idUser: id,
                lastLoginTime: newLoginTime
            }
        ];
        const response = await updateUsers(users);
        !response.ok && setMessageError(response.message);
        return response.ok;
    }

    const callSaveCookie = async (name, value, time) => {
        return await saveCookie(name, value, time);
    }

    return (
        <>
            <h1 className="fw-bold fs-1 mb-2">{isLoginForm ? formsTitles[0].title : formsTitles[1].title}</h1>
            <p className="mb-5">{isLoginForm ? formsTitles[0].subtitle : formsTitles[1].subtitle}</p>

            {isLoginForm && <LoginForm passwordVisible={passwordVisible}
                messageError={messageError}
                loading={loading}
                handleLogIn={handleLogIn}
                handleViewPassword={handleViewPassword}
                handleRegister={toogleForm} />}
            {!isLoginForm && <RegisterForm passwordVisible={passwordVisible}
                messageError={messageError}
                loading={loading}
                handleLogIn={handleRegister}
                handleViewPassword={handleViewPassword}
                handleRegister={handleRegister}
                handleLogin={toogleForm} />}
        </>
    );
};

export default LoginComponent;