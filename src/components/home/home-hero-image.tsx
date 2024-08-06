interface Props {}

export const HomeHeroImage = ({}: Props) => {
  return (
    <div className="relative flex-1 hidden lg:block">
      <img
        src="https://imagedelivery.net/0VK4YOgiY_3ex-SewiQEFw/e59500bd-50b5-480d-e46e-371426df7f00/public"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity group-hover:opacity-100 duration-300"
      />
      <img
        src="https://imagedelivery.net/0VK4YOgiY_3ex-SewiQEFw/710f31e7-3299-40ae-0e76-e7f9ce453f00/public"
        className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity group-hover:opacity-0 duration-300"
      />
    </div>
  );
};
