import './MainUI.css';
import SpellChecker from '../SpellChecker';
import Sidebar from '../Sidebar';

const MainUI = ({ user, selectedText, selectedSuggestions, onTextClick }) => {
  return (
    <div className="blok">
      <SpellChecker 
        selectedText={selectedText}
        selectedSuggestions={selectedSuggestions}
      />
      <Sidebar spellCheckResults={user?.spellCheckResults} onTextClick={onTextClick} />
    </div>
  );
};

export default MainUI;
