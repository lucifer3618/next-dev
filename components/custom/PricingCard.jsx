
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pricingPlans = [
    {
        name: "Basic",
        description: "Essential features for small businesses",
        price: "$9",
        features: [
            { text: "Up to 5 users", included: true },
            { text: "Basic analytics", included: true },
            { text: "24-hour support", included: true },
            { text: "1GB storage", included: true },
            { text: "API access", included: false },
            { text: "Custom branding", included: false },
        ],
        buttonText: "Get Started",
    },
];

export function PricingCards({ }) {
    return (
        <div className="">
            {pricingPlans.map((plan, index) => (
                <Card
                    key={index}
                    className={`flex flex-col border-2 transition-all duration-200 hover:shadow-lg ${plan.isPopular ? "border-primary shadow-md" : "border-border hover:border-muted-foreground/20"
                        }`}
                >
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                            {plan.isPopular && <Badge className="bg-primary hover:bg-primary/80">Popular</Badge>}
                        </div>
                        <CardDescription className="pt-1.5 h-12">{plan.description}</CardDescription>
                        <div className="mt-4">
                            <span className="text-4xl font-extrabold">{plan.price}</span>
                            <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-3 text-sm">
                            {plan.features.map((feature, featureIndex) => (
                                <li
                                    key={featureIndex}
                                    className="flex items-center"
                                >
                                    <span className={`flex items-center justify-center w-5 h-5 mr-2 rounded-full ${feature.included ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                                        }`}>
                                        {feature.included && <Check className="w-3.5 h-3.5" />}
                                    </span>
                                    <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="pt-6">
                        <Button
                            className={`w-full ${plan.isPopular ? "" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"}`}
                            variant={plan.isPopular ? "default" : "outline"}
                        >
                            {plan.buttonText}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}