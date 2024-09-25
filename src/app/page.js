"use client";

//React and Next imports
import { useState, useEffect } from 'react';
import Image from 'next/image'

//Styles and Assets imports
import styles from './page.module.css';
import loginImage from './public/images/login-image.jpg'

//Components imports
import LoginComponent from './components/login/LoginComponent';
import LoadingPage from './components/shared/LoadingPage';

export default function Home() {
  const [opacity, setOpacity] = useState('opacity-1');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className={`d-flex justify-content-center align-items-center ${styles['main-custom']}`}>
      {isLoading && <LoadingPage />}

      {!isLoading && <div className={`card d-flex flex-row border border-0 ${styles['card-custom']}`}>

        <section className={`position-relative rounded ${styles['section-custom']}`}>
          <Image
            alt="Login image"
            src={loginImage}
            fill
            className="rounded" />
        </section>

        <section className={`
          d-flex flex-column 
          align-items-center 
          justify-content-center 
          p-3 
          ${styles['section-custom']}
          ${styles['form-section']}
          ${opacity}`}>
          <LoginComponent setOpacity={setOpacity} setIsLoading={setIsLoading}/>
        </section>
      </div>}
    </main>
  );
}
