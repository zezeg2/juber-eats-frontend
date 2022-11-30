import React from 'react';

interface IParagraphProps {
  title: string;
  content?: string;
}
export const Paragraph: React.FC<IParagraphProps> = ({ title, content }) => {
  return (
    <div className="text-center sm:text-left">
      <h1 className="mb-4 text-4xl font-bold">{title}</h1>
      <p className="text-left">{content}</p>
    </div>
  );
};
