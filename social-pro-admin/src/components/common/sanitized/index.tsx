import { FC, ReactElement } from 'react';
import DOMPurify from 'dompurify';
import parser from 'html-react-parser';
interface SanitizedComponentProps {
  content: string;
}
const SanitizedComponent: FC<SanitizedComponentProps> = ({ content }: SanitizedComponentProps): ReactElement => {
  const htmlSanatized = DOMPurify.sanitize(content);
  return <span>{parser(htmlSanatized)}</span>;
};

export default SanitizedComponent;
