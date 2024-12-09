// import Menu from "@/components/menu/Menu";
// import MenuAsImages from "@/components/menu/Menu2";

// export default function Page() {
//   // const jsonString = JSON.stringify(GPTmenu);
//   // console.log(jsonString);
//   return (
//     <main className="">
//       <div
//         className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipOiz8wa0lQhdDXJVwGsYATLwdZYa-8gLbLaOm4=s680-w680-h510')" }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//           <h1 className="text-[#EFEBDA] text-5xl font-extrabold text-center italic">
//             <h1 className="text-3xl font-bold text-center mb-8">
//               Notre menu
//             </h1>
//           </h1>
//         </div>
//       </div>
//       <main className="body-container min-h-screen my-5">
//         <Menu />
//         <MenuAsImages />
//       </main>
//     </main>
//   )
// }


'use client'
import { useState } from 'react';
import Menu from "@/components/menu/Menu";
import MenuAsImages from "@/components/menu/Menu2";

export default function Page() {
  // State to track which component to show
  const [showMenu, setShowMenu] = useState(true);

  return (
    <main>
      <div
        className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/p/AF1QipOiz8wa0lQhdDXJVwGsYATLwdZYa-8gLbLaOm4=s680-w680-h510')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 grid place-content-center gap-y-5">
          <h1 className="text-[#EFEBDA] text-5xl font-extrabold text-center italic">
            Notre menu
          </h1>
          <div className='space-x-3'>
            <button
              onClick={() => setShowMenu(true)}
              className={`btn ${showMenu && "bg-black text-white"}`}>
              Menu en liste
            </button>
            <button
              onClick={() => setShowMenu(false)}
              className={`btn ${!showMenu && "bg-black text-white"}`}>
              Menu en images
            </button>
          </div>
        </div>
      </div>

      <div className="body-container min-h-screen my-5">
        {showMenu ? <Menu /> : <MenuAsImages />}
      </div>
    </main>
  );
}
