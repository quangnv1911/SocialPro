import DOMPurify from 'dompurify';
import React, { ReactElement } from 'react';

interface SanitizedHTMLProps {
  htmlContent: string;
  className?: string;
}

// Component to sanitize and render HTML content safely
const SanitizedHTML: React.FC<SanitizedHTMLProps> = ({
                                                       htmlContent,
                                                       className,
                                                     }: SanitizedHTMLProps): ReactElement => {
  // Sanitize the HTML content to prevent XSS attacks
  const sanitizedContent: string = DOMPurify.sanitize(htmlContent);

  return <span className={className} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default SanitizedHTML;
