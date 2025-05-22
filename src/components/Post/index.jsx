import React from 'react';

export default function Post({
  title,
  thumbUrl,
  description,
  variant,
}) {
  return (
    <div className={`cs_post cs_style_1 ${variant}`}>
      <div className="cs_post_thumb cs_view_mouse">
        <img src={thumbUrl} alt={title} />
      </div>
      <div className="cs_post_info">
        <div>
          <h2 className="cs_post_title cs_semibold cs_fs_32">
            <span>{title}</span>
          </h2>
          <div className="cs_posted_by" style={{ textAlign: 'justify' }}>
  {description}
</div>
        </div>
      </div>
    </div>
  );
}
