const PaintsLayout = ({ children, }: { children: React.ReactNode; }) => {
    return (
        <section className="w-full relative">
            <div className="flex justify-center items-start">
                {children}
            </div>
        </section>
    );
}

export default PaintsLayout;
