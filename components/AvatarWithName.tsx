import "./AvatarWithName.css";
import { Avatar, type AvatarSize } from "./Avatar";

export type AvatarWithNameProps = {
  name: string;
  src?: string;
  initials?: string;
  online?: boolean;
  showName?: boolean;
  size?: AvatarSize;
  className?: string;
};

export function AvatarWithName({
  name,
  src,
  initials,
  online,
  showName = true,
  size = "small",
  className,
}: AvatarWithNameProps) {
  const classes = ["tt-avatar-with-name", className].filter(Boolean).join(" ");
  return (
    <span className={classes}>
      <Avatar
        src={src}
        initials={initials ?? name.slice(0, 2)}
        alt={name}
        online={online}
        size={size}
      />
      {showName && <span className="tt-avatar-with-name__label">{name}</span>}
    </span>
  );
}
