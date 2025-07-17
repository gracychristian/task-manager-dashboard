import React from "react";

interface TagBadgeProps {
  icon?: React.ReactNode;
  label: string;
  colorClass: string;
}

const TagBadge = ({ icon, label, colorClass }: TagBadgeProps) => {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
      {icon}
      {label}
    </span>
  );
};

export default TagBadge;
