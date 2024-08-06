// import { ReactNode } from "react";
// import Header from "./Header";
// import SideMenu from "./SideMenu";
// import Content from "./Content";

// interface LayoutProps {
//   title: string
//   subtitle: string
//   children?: ReactNode
// }
// export default function Layout({title,subtitle,children}:LayoutProps){
//   return ( 
//     <div className={`flex h-screen w-screen`}>
//       <SideMenu />
//       <div className={`flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800`}>
//         <Header title={title} subtitle={subtitle}/>
//         <Content>
//           {children}
//         </Content>
//       </div>
//     </div>
//   )

// }