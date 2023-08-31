import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
    }
    .main-text-color{
        color: ${({ theme }) => theme.text};
    }
    .sub-bg{
        background: ${({ theme }) => theme.bg};
    }
    .sub-part-bg{
        background: ${({ theme }) => theme.body};
    }
    .sub-part-1-bg{
        background: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.text};
    }
    .sub-part-2-bg{
       background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    }
    .sub-part-3-bg{
       background: ${({ theme }) => theme.secondary};
       color: ${({ theme }) => theme.text};
    }
    .sub-part-4-bg{
       background: ${({ theme }) => theme.bg};
       color: ${({ theme }) => theme.text};
    }
    .sub-part-4-bg:hover{
       background: ${({ theme }) => theme.bg};
       color: ${({ theme }) => theme.text};
    }
   .btn-bg {
        background: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.text};
   }
   .btn-bg:hover {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.subtext};
   }
   .btn-bg-active {
        background: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.subtext};
   }
   .btn-bg-outlined {
        border-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.primary};
   }
   .btn-bg-outlined:hover {
        border-color: ${({ theme }) => theme.hover};
        color: ${({ theme }) => theme.hover};
   }
   .btn-bg-outlined-active {
        border-color: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.secondary};
   }
   .sub-text-color{
        color: ${({ theme }) => theme.primary};
    }
    .MuiOutlinedInput-root {
        color: ${({ theme }) => theme.text};
    }
    .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline{
        border-color: ${({ theme }) => theme.secondary};
    }
    
    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.hover};
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.text};
        
    }
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.secondary};
        border-radius: 10px;
        
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.primary};
    }
    .MuiList-root{
        background: ${({ theme }) => theme.secondary};
        border-radius: 0px;
        overflow: hidden;
    }

    .MuiList-root .MuiMenu-list{
        color: ${({ theme }) => theme.subtitle};
    }

    .MuiList-root .MuiMenu-list:hover{
        color: ${({ theme }) => theme.subtext};
        background: ${({ theme }) => theme.primary};
    }
    .MuiBadge-badge{
         background: ${({ theme }) => theme.secondary};
         color: ${({ theme }) => theme.primary};
    }
    .MuiChip-label{
        color: ${({ theme }) => theme.primary};
    }
    .border-style{
        border-color: ${({ theme }) => theme.primary};
    }
    
`;

export default GlobalStyles;
