import React from "react";

interface Props {
  titulo: string;
  subtitulo: string;
}

const TituloTabela: React.FC<Props> = ({ titulo, subtitulo }) => {
  return (
    <div className="py-5">
      <h1 className="md:text-3xl text-2xl">{titulo}</h1>
      <h5 className="md:text-md text-sm opacity-55">{subtitulo}</h5>
    </div>
  );
};

export default TituloTabela;
