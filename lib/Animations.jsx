export const Animation = {
    containerVariants: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    },

    textVariants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }
    },

    buttonVariants: {
        hover: { scale: 1.1, transition: { duration: 0.2 } }
    },
}