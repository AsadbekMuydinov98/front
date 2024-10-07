import { Layout, Button } from 'antd';
import './Header.css';
import useUserStore from '../../customHooks/useUser';

const { Header } = Layout;

const HeaderCom = ({ showModal }) => {
  const { user } = useUserStore();

  return (
    <Header className="header">
      <div className="header-container">
        <div className="header-title">
          Check spelling Website
        </div>
        {user ? (
          <div className="welcome-message">
            Welcome, {user.name}!
          </div>
        ) : (
          <Button type="primary" onClick={showModal}>
            Login
          </Button>
        )}
      </div>
    </Header>
  )
}

export default HeaderCom;
