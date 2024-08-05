interface Props extends React.HtmlHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  src: string;
  alt: string;
}

const Avatar = ({ src, alt, fallback, ...props }: Props) => {
  return (
    <div className="relative">
      <img src={src} alt={alt} {...props} />
      <div className="absolute inset-0 -z-10 flex items-center justify-center rounded-full bg-sky-500 text-xs font-medium">
        DC
      </div>
    </div>
  );
};

export { Avatar };
