import { useState, useEffect } from 'react';
import { Button, Space, message } from 'antd';
import axios from 'axios';
import './SpellChecker.css'; 
import TextEditor from './TextEditor';
import SpellCheckResults from './SpellCheckResults';
import LanguageSelector from './LanguageSelector';
import ActionButtons from './ActionButtons';

const SpellChecker = ({ selectedText, selectedSuggestions }) => {
  const [text, setText] = useState('');
  const [originalTextWithMistakes, setOriginalTextWithMistakes] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isFromSidebar, setIsFromSidebar] = useState(false);

  useEffect(() => {
    if (selectedText && selectedSuggestions.length > 0) {
      setText(selectedText);
      setSuggestions(selectedSuggestions);
      setIsFromSidebar(true);
      const originalWithMistakes = generateOriginalTextWithMistakes(selectedSuggestions, selectedText);
      setOriginalTextWithMistakes(originalWithMistakes);

      const corrected = generateCorrectedText(selectedSuggestions, selectedText);
      setCorrectedText(corrected);
      setShowResults(true);
    } else {
      resetSpellChecker();
    }
  }, [selectedText, selectedSuggestions]);

  const resetSpellChecker = () => {
    setText('');
    setOriginalTextWithMistakes('');
    setCorrectedText('');
    setSuggestions([]);
    setShowResults(false);
    setIsFromSidebar(false); 
  };

  const handleCheckSpelling = async () => {
    try {
      const response = await axios.post('https://back-yhh6.onrender.com/api/check/check-spelling', {
        text,
        language,
      });

      setSuggestions(response.data.suggestions);

      if (Array.isArray(response.data.suggestions)) {
        const originalWithMistakes = generateOriginalTextWithMistakes(response.data.suggestions, text);
        setOriginalTextWithMistakes(originalWithMistakes);

        const corrected = generateCorrectedText(response.data.suggestions, text);
        setCorrectedText(corrected);
        setShowResults(true);
      } else {
        console.error("API response is not an array.");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const generateOriginalTextWithMistakes = (suggestions, original) => {
    let modifiedText = original;
    suggestions.forEach((item) => {
      const { mistake } = item.message;
      const regex = new RegExp(`\\b${mistake}\\b`, 'g');
      modifiedText = modifiedText.replace(regex, `<span class="mistake">${mistake}</span>`);
    });
    return modifiedText;
  };

  const generateCorrectedText = (suggestions, original) => {
    let corrected = original;
    suggestions.forEach((item) => {
      const { mistake, bestSuggestion } = item.message;
      const regex = new RegExp(`\\b${mistake}\\b`, 'g');
      corrected = corrected.replace(regex, `<span class="correction">${bestSuggestion}</span>`);
    });
    return corrected;
  };

  const handleSave = async () => {
    const date = new Date().toISOString().split('T')[0];
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'https://back-yhh6.onrender.com/api/check/save-spell-check',
        { date, originalText: text, suggestions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Successfully saved!');
    } catch (error) {
      console.error(error);
      message.error('Error saving the data');
    }
  };

  const handleDelete = async () => {
    resetSpellChecker(); 
    message.info('Deleted');
  };

  return (
    <Space className="spell-checker-container" direction="vertical" size="middle">
      <LanguageSelector language={language} onLanguageChange={(value) => setLanguage(value)} />
      <TextEditor text={text} onTextChange={(e) => setText(e.target.value)} />
      <Button type="primary" onClick={handleCheckSpelling}>
        Check Spelling
      </Button>
      {showResults && (
        <>
          <SpellCheckResults originalTextWithMistakes={originalTextWithMistakes} correctedText={correctedText} />
          {isFromSidebar ? (
            <Button type="default" onClick={resetSpellChecker}>Close</Button> 
          ) : (
            <ActionButtons onSave={handleSave} onDelete={handleDelete} />
          )}
        </>
      )}
    </Space>
  );
};

export default SpellChecker;
