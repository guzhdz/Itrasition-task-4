"use client";

//React and Next imports
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

//Styles imports
import styles from './confirm.module.css';

//Components imports
import Button from '../components/shared/Button';
import LoadingPage from '../components/shared/LoadingPage';

export default function Confirm() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const handleToLogin = () => {
        setIsLoading(true);
        router.push('/');
    };

    useEffect(() => {
        setIsLoading(false);
      }, []);

    return (
        <main className={`d-flex justify-content-center align-items-center ${styles['main-custom']}`}>
            {isLoading && <LoadingPage />}

            {!isLoading && <div className={`card d-flex flex-column align-items-center justify-content-center border border-0 ${styles['card-custom']}`}>
                <section className={`rounded d-none d-md-flex ${styles['section-custom']}`}>
                    <i className={`bi bi-patch-check-fill mx-auto ${styles['icon-custom']}`}></i>
                </section>

                <section className={`rounded d-flex flex-column align-items-center ${styles['section-custom']}`}>
                    <h1 className="text-center fs-4">Your account has been successfully created</h1>
                    <p className="text-center fs-5 mb-4">Please log in to continue</p>
                    <div className={`d-flex flex-column ${styles['btn-container-custom']}`}>
                        <Button type="button" text="Go to login" customColor="btn-secondary-custom" rounded="rounded-pill" onClick={handleToLogin} />
                    </div>
                </section>
            </div>}
        </main>
    );
}
