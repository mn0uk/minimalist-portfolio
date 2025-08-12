export default function CardGrid({ children, className = '' }) {
  return (
    <div className={`card-grid ${className}`}>
      {children}
    </div>
  );
}
