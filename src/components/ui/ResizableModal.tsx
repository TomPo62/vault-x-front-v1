import { ReactNode } from "react";
import { Rnd } from "react-rnd";

interface ResizableModalProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
  children: ReactNode;
}

const ResizableModal: React.FC<ResizableModalProps> = ({
  isOpen,
  onClose,
  width = "500px",
  height = "500px",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <Rnd
        default={{
          width: width,
          height: height,
          x: window.innerWidth / 2 - parseInt(width) / 2,
          y: window.innerHeight / 2 - parseInt(height) / 2,
        }}
        minWidth={300}
        minHeight={200}
        bounds="window"
        enableResizing={{
          top: true,
          right: true,
          bottom: true,
          left: true,
          topRight: true,
          bottomRight: true,
          bottomLeft: true,
          topLeft: true,
        }}
        className="bg-background text-primary p-6 rounded-lg shadow-lg relative overflow-auto overflow-x-hidden custom-scrollbar"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-background bg-primary hover:bg-first-hover py-1 px-2 rounded"
        >
          Close
        </button>
        {children}
      </Rnd>
    </div>
  );
};

export default ResizableModal;
