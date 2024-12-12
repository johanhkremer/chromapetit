"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import AuthHeader from "./auth-header";
import { BackButton } from "./back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    title: string;
    showSocial?: boolean;
    backButtonHref: string;
}

const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, title }: CardWrapperProps) => {
    return (
        <Card className="w-full sm:w-full md:w-1/2 xl:w-1/4 shadow-md">
            <CardHeader>
                <AuthHeader label={headerLabel} title={title} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter className="p-4 flex justify-between">
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;