import { Select } from 'antd';

const { Option } = Select;

const LanguageSelector = ({ language, onLanguageChange }) => {
  return (
    <Select defaultValue={language} style={{ width: 120 }} onChange={onLanguageChange}>
      <Option value="en-US">English</Option>
      <Option value="fr-FR">French</Option>
      <Option value="de-DE">German</Option>
      <Option value="es-ES">Spanish</Option>
    </Select>
  );
};

export default LanguageSelector;
