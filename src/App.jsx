import { useEffect, useState } from 'react';
import './App.css';
import HeaderCom from './components/Header';
import UniversalModal from './components/UniversalModal';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/RegisterForm';
import useUserStore from './customHooks/useUser';
import MainUI from './components/MainUI'; 
function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  const { user, fetchUser } = useUserStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token, fetchUser, user]);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  const switchToRegister = () => setIsRegister(true);
  const switchToLogin = () => setIsRegister(false);

  const handleLogin = () => {
    handleOk();
  };


  const handleTextSelection = (text, suggestions) => {
    setSelectedText(text);
    setSelectedSuggestions(suggestions);
  };

  return (
    <>
      <HeaderCom showModal={showModal} />
      <UniversalModal
        isVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        {isRegister ? (
          <RegisterForm onRegister={handleLogin} switchToLogin={switchToLogin} />
        ) : (
          <LoginForm onLogin={handleLogin} switchToRegister={switchToRegister} />
        )}
      </UniversalModal>
      <MainUI 
        selectedText={selectedText}
        selectedSuggestions={selectedSuggestions}
        onTextClick={handleTextSelection}
        user={user}
      />
    </>
  );
}

export default App;
