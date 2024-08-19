import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};
const CardService = ({ icon: Icon, title, description }: CardProps) => {
  return (
    <Card className="flex flex-col items-center text-center p-4">
      <CardHeader className="flex flex-col items-center mb-4">
        <CardTitle className="text-4xl text-blue-500 mb-2">
          <Icon />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-lg font-semibold">{title}</p>
      </CardContent>
      <CardFooter className="mt-4">
        <p className="text-gray-600">{description}</p>
      </CardFooter>
    </Card>
  );
};
export default CardService;
