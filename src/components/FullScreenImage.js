import React, { useState } from 'react';

const FullScreenImage = ({ src, alt, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer rounded shadow ${className}`}
      />

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded"
          />
        </div>
      )}
    </>
  );
};

export default FullScreenImage;
