//React import
import React from 'react';

//Styles and Assets import
import styles from './admin-panel.module.css';



const Tabs = ({ activeTab, setActiveTab, userInfo, deleteUserId, router, setIsLoading }) => {

  const handleTab = async (tab) => {
    if (userInfo.status) {
      setActiveTab(tab);
    } else {
      alert("Your account is no longer accessible. You have been logged out for security reasons");
      await deleteUserId();
      setIsLoading(true);
      router.push('/');
    }
  }
  return (
    <ul className={`nav nav-underline mb-4 ${styles['tabs-custom']}`}>
      <li className="nav-item text-center">
        <a className={`nav-link ${activeTab === 'all' && 'active ' + styles['active-custom']}`} href="#" onClick={() => handleTab('all')}>All</a>
      </li>
      <li className="nav-item text-center">
        <a className={`nav-link ${activeTab === 'active' && 'active ' + styles['active-custom']}`} href="#" onClick={() => handleTab('active')}>Active</a>
      </li>
      <li className="nav-item text-center">
        <a className={`nav-link ${activeTab === 'blocked' && 'active ' + styles['active-custom']}`} href="#" onClick={() => handleTab('blocked')}>Blocked</a>
      </li>
    </ul>
  );
};

export default Tabs;