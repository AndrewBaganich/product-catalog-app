import "./toast.css";

type ToastProps = {
    message: string;
};

function Toast({ message }: ToastProps) {
    if (!message) return null;
    
    return (
    <div className="toast">
        {message}
        </div>
        );
    }

export default Toast;