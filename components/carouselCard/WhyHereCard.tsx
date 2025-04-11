import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface CardProps {
  text: string;
  imageSrc: any;
  headerText: string;
}

const WhyHereCard: React.FC<CardProps> = ({ text, imageSrc, headerText }) => {
  return (
    <Card
      className={`rounded-xl shadow-md border-none flex justify-center max-h-1/2`}
    >
      <CardContent className="flex items-center gap-4 p-4 ">
        <Image src={imageSrc} alt="Preferred Partner" width={50} height={50} />
        <div>
          <p className="font-semibold text-black text-bold text-lg">
            {headerText}
          </p>
          <p className="text-sm text-gray-700">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhyHereCard;
