import React from "react";
import "./Avatar.css";

export type AvatarSize = "tiny" | "small" | "medium" | "large";

export type AvatarProps = {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = "small",
  online = false,
  className,
}: AvatarProps) {
  const classes = [
    "tt-avatar",
    `tt-avatar--size-${size}`,
    src ? "tt-avatar--image" : "tt-avatar--initials",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {src ? (
        <img className="tt-avatar__img" src={src} alt={alt} />
      ) : (
        <span className="tt-avatar__initials">{initials?.slice(0, 2) ?? ""}</span>
      )}
      {online && <span className="tt-avatar__status" aria-label="Online" />}
    </span>
  );
}

export type AvatarGroupProps = {
  users: { src?: string; initials?: string; alt?: string; online?: boolean }[];
  max?: number;
  size?: AvatarSize;
  showStatus?: boolean;
  className?: string;
};

export function AvatarGroup({
  users,
  max = 3,
  size = "small",
  showStatus = false,
  className,
}: AvatarGroupProps) {
  const visible = users.slice(0, max);
  const overflow = Math.max(users.length - max, 0);
  const layoutClass = showStatus ? "tt-avatar-group--spaced" : "tt-avatar-group--stacked";

  const classes = ["tt-avatar-group", layoutClass, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {visible.map((u, i) => (
        <Avatar
          key={i}
          src={u.src}
          initials={u.initials}
          alt={u.alt}
          size={size}
          online={showStatus && u.online}
        />
      ))}
      {overflow > 0 && (
        <Avatar
          size={size}
          initials={`${overflow}+`}
          alt={`${overflow} more`}
        />
      )}
    </div>
  );
}
