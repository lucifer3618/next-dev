import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Lookup from "@/data/Lookup";
import { PricingCards } from "./PricingCard";


export function PriceDialog({ openDialog, closeDialog }) {
    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Pricing</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue={Lookup.PRICING_OPTIONS[0].name} className="">
                    <TabsList className="w-full flex">
                        {
                            Lookup.PRICING_OPTIONS.map((option) => {
                                return <TabsTrigger value={option.name}>{option.name}</TabsTrigger>
                            })
                        }
                    </TabsList>
                    {
                        Lookup.PRICING_OPTIONS.map((option) => {
                            return <TabsContent value={option.name}><PricingCards /></TabsContent>
                        })
                    }
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
