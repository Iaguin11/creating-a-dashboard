import Image from "next/image";
import sapiens from "../../../public/sapiens.svg"

export default function UnAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className="flex justify-center">
          <div className="space-y-2 place-content-center flex flex-col justify-center">
            <div className="flex w-full -mb-14 justify-center">
              <Image 
                alt="logo"
                width={600}
                height={600}
                src={sapiens}
                className="w-[440px]"
              />
            </div>
            <h1 className="mb-4 text-2xl text-center font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
              Melhor{" "}
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                Jeito
              </span>
              <br />
              de{" "}
              <span className="inline bg-gradient-to-r from-[#5797d6] via-[#1fc0f1] to-[#0382d7] text-transparent bg-clip-text">
                controlar seus usuários
              </span>{" "}
            </h1>
            <div className="w-[60%]">
              <p className="text-base text-center font-normal text-muted-foreground lg:text-lg">
              </p>
            </div>
          </div>
        </div>
        {children}     
    </main>
  );
}
