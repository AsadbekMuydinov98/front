import { Button, Space } from 'antd';

const ActionButtons = ({ onSave, onDelete }) => {
  return (
    <Space style={{ marginTop: '20px' }}>
      <Button type="primary" onClick={onSave}>Save</Button>
      <Button type="default" onClick={onDelete}>Delete</Button>
    </Space>
  );
};

export default ActionButtons;
