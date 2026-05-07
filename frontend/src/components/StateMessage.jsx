import { AlertCircle, CheckCircle2, Loader2, SearchX } from "lucide-react";
import styles from "./StateMessage.module.css";

const iconByType = {
  loading: Loader2,
  error: AlertCircle,
  empty: SearchX,
  success: CheckCircle2
};

export default function StateMessage({
  type = "empty",
  title,
  children,
  actionLabel,
  onAction,
  compact = false
}) {
  const Icon = iconByType[type] || SearchX;

  return (
    <div className={`${styles.message} ${styles[type]} ${compact ? styles.compact : ""}`}>
      <span className={styles.icon}>
        <Icon size={compact ? 18 : 22} />
      </span>
      <div>
        {title && <strong>{title}</strong>}
        {children && <p>{children}</p>}
        {actionLabel && onAction && (
          <button type="button" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
