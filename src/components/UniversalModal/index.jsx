import { Modal } from 'antd';

const UniversalModal = ({ isVisible, handleOk, handleCancel, children }) => {
  return (
    <Modal
      title="Login"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default UniversalModal;
