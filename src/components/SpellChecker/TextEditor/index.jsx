import { Input } from 'antd';

const { TextArea } = Input;

const TextEditor = ({ text, onTextChange }) => {
  return (
    <TextArea
      rows={10}
      placeholder="Enter text"
      value={text}
      onChange={onTextChange}
    />
  );
};

export default TextEditor;
