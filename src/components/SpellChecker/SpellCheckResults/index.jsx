import { Card, Space } from 'antd';
import '../SpellChecker.css';

const SpellCheckResults = ({ originalTextWithMistakes, correctedText }) => {
  return (
    <Space direction="vertical" size="middle" className="spell-check-results">
      <Card title="Original Text (Mistakes Highlighted)" bordered={false} className="original-text-card">
        <div dangerouslySetInnerHTML={{ __html: originalTextWithMistakes }} />
      </Card>
      <Card title="Corrected Text (Suggestions Highlighted)" bordered={false} className="corrected-text-card">
        <div dangerouslySetInnerHTML={{ __html: correctedText }} />
      </Card>
    </Space>
  );
};

export default SpellCheckResults;
