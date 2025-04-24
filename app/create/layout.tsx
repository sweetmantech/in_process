import { ZoraCreateProvider } from "@/providers/ZoraCreateProvider"
import { ReactNode } from "react"

const RootLayout = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <ZoraCreateProvider>
            <main className="w-screen grow">
                <div className="flex flex-col items-center justify-center pt-[120px] md:pt-[200px]">
                    <div className="w-full">
                    <div className="px-3 md:px-10 flex flex-col md:flex-row gap-10 pb-20 relative">
                        <div className="grow flex flex-col md:flex-row gap-4">
                            {/* {createdContract ? <CreatedMoment /> : <Moment />}
                            <div className="grow w-full flex justify-center">
                                <MetadataCreation />
                            </div>
                            </div>
                            <div className="w-full md:!min-w-[420px] md:!w-[420px]">
                            <div className="w-full space-y-3" ref={inputRef}>
                                {createdContract ? (
                                <>
                                    <p className="font-archivo-medium text-4xl">{name}</p>
                                </>
                                ) : (
                                <CreateForm />
                                )}
                            </div> */}
                            {children}
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        </ZoraCreateProvider>
    )
}

export default RootLayout