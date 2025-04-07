import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FeatureCard = ({
    icon,
    title,
    description,
    delay = 0,
    className
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + delay, duration: 0.5 }}
            className={cn(
                "relative group p-5 rounded-xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300",
                className
            )}
        >
            {/* Slight glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/10 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="flex flex-col h-full relative z-10">
                <div className="mb-3">
                    {icon}
                </div>

                <h3 className="text-lg font-medium mb-1 text-white">{title}</h3>

                <p className="text-gray-400 text-sm">{description}</p>
            </div>
        </motion.div>
    );
};

export default FeatureCard;