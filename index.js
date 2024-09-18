// // src/index.js
// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import Home from "./src/app/page";
// import { ReactQueryDevtools } from "react-query/devtools";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// import { Toaster } from "react-toastify";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';


// const queryClient = new QueryClient();
// // Function to load Google Fonts
// const loadGoogleFonts = () => {
//   const link = document.createElement('link');
//   link.href = 'https://fonts.googleapis.com/css2?family=Be+Vietnam:wght@400;700&family=Open+Sans:wght@400;700&family=Roboto:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Playfair+Display:wght@400;700&family=Arial:wght@400;700&family=Times+New+Roman:wght@400;700&family=Helvetica:wght@400;700&family=Courier+New:wght@400;700&family=Verdana:wght@400;700&family=Georgia:wght@400;700&family=Tahoma:wght@400;700&family=Calibri:wght@400;700&family=Garamond:wght@400;700&family=Bookman:wght@400;700&family=Museo+Moderno:wght@400;700&family=Noto+Serif:wght@400;700&family=Sedgwick+Ave:wght@400;700&family=Amatic+SC:wght@400;700&family=Patrick+Hand:wght@400;700&family=Vollkorn:wght@400;700&family=Mali:wght@400;700&family=Copperplate:wght@400;700&family=Bangers:wght@400;700&family=Lobster:wght@400;700&family=Dancing+Script:wght@400;700&family=Pacifico:wght@400;700&family=Bungee+Shade:wght@400;700&family=Saira+Stencil+One:wght@400;700&family=Srisakdi:wght@400;700&family=Charmonman:wght@400;700&display=swap';
//   link.rel = 'stylesheet';
//   document.head.appendChild(link);
// };
// loadGoogleFonts();

// ReactDOM.render(
//   <QueryClientProvider client={queryClient}>
//     <DndProvider backend={HTML5Backend}>
//       <ToastContainer />

//       <Home />
//       <ReactQueryDevtools initialIsOpen={false} />
//     </DndProvider>
//   </QueryClientProvider>,
//   document.getElementById("root")
// );
