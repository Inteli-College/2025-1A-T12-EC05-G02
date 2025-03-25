// "use client";

// import Header from "../components/Header"; // Header do topo
// import TabelaPharma from "../components/TabelaPharma"; // Tabela com os dados dos usuários
// import { Column, Data } from "../components/table";

// const colunas: Column[] = [
//     { id: 'id', label: 'ID', minWidth: 150 },
//     { id: 'usuario', label: 'Usuário', align: 'center', minWidth: 170 },
//     { id: 'email', label: 'email', minWidth: 200 },
//     { id: 'data', label: 'data do cadastro', minWidth: 170 },
// ]

// export default function UsuariosCadastrados() {

//     const rowsMock: Data[]= [{id: "01", usuario:'Mateus', email:'email',  data:'data de cadastro'}]

//   return (
//     <div style={{ display: 'flex' }}>

//       {/* Conteúdo principal */}
//       <div style={{ flex: 1 }}>
//         {/* Header */}
//         <Header />

          

//           {/* Componente da tabela de usuários */}
//           <TabelaPharma titulo="Usuários cadastrados" subtitulo="Lista e cadastro de usuários" rows={rowsMock} colunas={colunas} render= {0} loading={false}/>

//       </div>
//     </div>
//   );
// }

