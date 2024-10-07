import { useState } from 'react';
import { Collapse, Divider } from 'antd';
import './Sidebar.css';

const { Panel } = Collapse;

const Sidebar = ({ spellCheckResults, onTextClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const truncateText = (text, maxWords = 5) => {
    const words = text.split(' ');
    return words.length > maxWords ? `${words.slice(0, maxWords).join(' ')} ...` : text;
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        Spell Check Results
      </div>
      <Collapse 
        accordion 
        onCollapse={onCollapse}
      >
        {spellCheckResults && spellCheckResults.length > 0 ? (
          spellCheckResults.map((result, index) => (
            <Panel header={result.date} key={index} className="panel-header">
              {result.texts.map((text, textIndex) => (
                <div key={textIndex} onClick={() => onTextClick(text.originalText, text.suggestions)}> 
                  <p style={{ marginBottom: 0 }}>
                    {truncateText(text.originalText)} 
                  </p>
                  {textIndex < result.texts.length - 1 && <Divider className="panel-divider" />}
                </div>
              ))}
            </Panel>
          ))
        ) : (
          <p className="empty-message">
            Empty list or no registered user
          </p>
        )}
      </Collapse>
    </div>
  );
};

export default Sidebar;
