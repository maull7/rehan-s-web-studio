import { cn } from "@/lib/utils";

interface MascotImageProps {
  className?: string;
  alt?: string;
}

const MascotImage = ({ className, alt = "Rehan clay mascot" }: MascotImageProps) => (
  <img
    src="/helo-rehan.png"
    alt={alt}
    className={cn("object-contain", className)}
    loading="lazy"
    decoding="async"
  />
);

export default MascotImage;
