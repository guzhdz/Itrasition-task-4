"use client";

//React and Next imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

//Styles and Assets imports
import styles from './admin-panel.module.css';

//Components imports
import Header from '../components/shared/Header';
import Tabs from '../components/admin-panel/Tabs';
import Table from '../components/admin-panel/Table';
import LoadingPage from '../components/shared/LoadingPage';

//Services import
import { getCookie, deleteCookie } from '../services/cookiesService';
import { getUser, getUsers } from '../services/userService';

export default function AdminPanel() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    id_user: null,
    name: '',
    email: '',
    last_login_time: null,
    register_time: null,
    status: null
  });
  const [activeTab, setActiveTab] = useState('all');
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(true);

  const getUserId = async () => {
    const response = await getCookie('userId');
    if (response.ok) {
      return response.data;
    } else {
      alert(response.message);
      setIsLoading(true);
      router.push('/');
    }
  };

  const getUserInfo = async (userId) => {
    const response = await getUser(userId);
    if (response.ok) {
      setUserInfo(response.data);
    } else {
      alert(response.message);
      await deleteUserId();
      setIsLoading(true);
      router.push('/');
    }
  };

  const callGetUsers = async (action) => {
    const response = await getUsers(action);
    if (response.ok) {
      setUsers(response.data);
    } else {
      alert(response.message + ' We could not retrieve the list of users.')
    }
  };

  const getPrivateData = async () => {
    const userId = await getUserId();
    if (userId) {
      await getUserInfo(userId);
    } else {
      alert("Unable to log in to your account. Please check your credentials and try again.");
      await deleteUserId();
      router.push('/');
    }
  }

  const initializeData = async () => {
    setIsLoading(true);
    setIsTableLoading(true);
    await getPrivateData();
    await callGetUsers('getUsers');
    setIsLoading(false);
    setIsTableLoading(false);
  }

  const fetchData = async () => {
    setIsTableLoading(true);
    await getPrivateData();
    switch (activeTab) {
      case 'all':
        await callGetUsers('getUsers');
        break;
      case 'active':
        await callGetUsers('getActiveUsers');
        break;
      case 'blocked':
        await callGetUsers('getBlockedUsers');
        break;
      default:
        await callGetUsers('getAll');
        break;
    }
    setIsTableLoading(false);
  }

  const deleteUserId = async () => {
    return await deleteCookie('userId');
  };

  useEffect(() => {
    initializeData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <main className={`${styles['main-custom']}`}>
      {isLoading && <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <LoadingPage />
      </div>}

      {!isLoading && <div>
        <Header name={userInfo.name} email={userInfo.email} />

        <section className={`d-flex flex-column p-5 mx-auto ${styles['main-section']}`}>
          <h1 className="fw-semibold fs-2 mb-4">Admin Panel</h1>
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            deleteUserId={deleteUserId}
            userInfo={userInfo}
            router={router}
            setIsLoading={setIsLoading} />
          <Table
            users={users}
            fetchData={fetchData}
            userInfo={userInfo}
            deleteUserId={deleteUserId}
            router={router}
            setIsLoading={setIsLoading}
            isTableLoading={isTableLoading}
            setIsLoadingTable={setIsTableLoading} />
        </section>
      </div>}
    </main>
  );
}
