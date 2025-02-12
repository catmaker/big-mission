import Image from "next/image";

interface NextImageProps {
  path: string;
  className?: string;
  size?: "small" | "medium" | "large";
}

export function NextImageComponent({
  path,
  className,
  size = "medium",
}: NextImageProps) {
  const fullUrl = path.startsWith("http")
    ? path
    : `https://front-mission.bigs.or.kr${path}`;

  const sizeConfig = {
    small: {
      maxWidth: "300px",
      maxHeight: "300px",
    },
    medium: {
      maxWidth: "500px",
      maxHeight: "500px",
    },
    large: {
      maxWidth: "800px",
      maxHeight: "800px",
    },
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        maxWidth: sizeConfig[size].maxWidth,
        margin: "0 auto",
      }}
    >
      <Image
        src={fullUrl}
        alt="이미지"
        width={0}
        height={0}
        sizes={`(max-width: 768px) 100vw, ${sizeConfig[size].maxWidth}`}
        className="w-full h-auto object-contain rounded-lg"
        quality={90}
        style={{
          maxHeight: sizeConfig[size].maxHeight,
        }}
      />
    </div>
  );
}
