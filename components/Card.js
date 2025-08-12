import Link from 'next/link';

export default function Card({
  title,
  date,
  category,
  description,
  author,
  tags,
  image,
  icon,
  href,
  external = false,
  className = ''
}) {
  const CardContent = () => (
    <div className={`card ${className}`}>
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}

      {icon && !image && (
        <div className="card-icon">
          {icon}
        </div>
      )}

            <div className="card-content">
        <div className="card-meta">
          <div className="meta-left">
            {author && (
              <span className="card-author">{author}</span>
            )}
            {date && (
              <>
                {author && <span> · </span>}
                <time className="card-date" dateTime={date}>
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </>
            )}
          </div>
          <div className="card-arrow">→</div>
        </div>

        <h3 className="card-title">{title}</h3>

        {description && (
          <p className="card-description">{description}</p>
        )}
      </div>
    </div>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          <CardContent />
        </a>
      );
    }

    return (
      <Link href={href} className="card-link">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
