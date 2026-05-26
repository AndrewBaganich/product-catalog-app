import "./statusMessage.css";

type StatusMessageProps = {
  message: string;
  isError?: boolean;
};

function StatusMessage({
  message,
  isError = false,
}: StatusMessageProps) {
  return (
    <p
      className={
        isError
          ? "status-message error-message"
          : "status-message"
      }
    >
      {message}
    </p>
  );
}

export default StatusMessage;