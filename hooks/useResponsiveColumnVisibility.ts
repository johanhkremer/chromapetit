import { useEffect, useState } from "react";

type VisibilityState = Record<string, boolean>;

export function useResponsiveColumnVisibility(initialVisibility: VisibilityState) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibility);

    useEffect(() => {
        const mediaQueries = [
            window.matchMedia("(max-width: 639px)"),
            window.matchMedia("(min-width: 640px) and (max-width: 767px)"),
            window.matchMedia("(min-width: 768px) and (max-width: 1023px)"),
            window.matchMedia("(min-width: 1024px) and (max-width: 1279px)"),
            window.matchMedia("(min-width: 1280px)"),
        ];

        const updateVisibility = () => {
            if (mediaQueries[0].matches) {
                setColumnVisibility({
                    hexCode: true,
                    rgbValues: false,
                    name: true,
                    brand: false,
                    type: false,
                    finish: false,
                    updatedAt: false,
                    actions: true,
                });
            } else if (mediaQueries[1].matches) {
                setColumnVisibility({
                    hexCode: true,
                    rgbValues: false,
                    name: true,
                    brand: true,
                    type: false,
                    finish: false,
                    updatedAt: false,
                    actions: true,
                });
            } else if (mediaQueries[2].matches) {
                setColumnVisibility({
                    hexCode: true,
                    rgbValues: false,
                    name: true,
                    brand: true,
                    type: true,
                    finish: false,
                    updatedAt: false,
                    actions: true,
                });
            } else if (mediaQueries[3].matches) {
                setColumnVisibility({
                    hexCode: true,
                    rgbValues: false,
                    name: true,
                    brand: true,
                    type: true,
                    finish: true,
                    updatedAt: false,
                    actions: true,
                });
            } else if (mediaQueries[4].matches) {
                setColumnVisibility({
                    hexCode: true,
                    rgbValues: false,
                    name: true,
                    brand: true,
                    type: true,
                    finish: true,
                    updatedAt: true,
                    actions: true,
                });
            }
        };

        updateVisibility();

        mediaQueries.forEach((mq) => mq.addEventListener("change", updateVisibility));

        return () => {
            mediaQueries.forEach((mq) => mq.removeEventListener("change", updateVisibility));
        };
    }, []);

    return { columnVisibility, setColumnVisibility };
}
