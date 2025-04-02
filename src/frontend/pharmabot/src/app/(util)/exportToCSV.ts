export const exportToCSV = <T>(rows: T[], headers: string[], columns: (keyof T)[], fileName: string) => {
    if (rows.length === 0) {
        alert("Não há dados para exportar.");
        return;
    }

    // Formatar os dados para CSV
    const csvRows = rows.map(row =>
        columns.map(column => {
            const value = row[column];

            // Formata datas automaticamente
            if (value instanceof Date) {
                return value.toLocaleString("pt-BR");
            }

            // Adiciona aspas para garantir que valores com vírgulas não quebrem o CSV
            return `"${String(value)}"`;
        }).join(",") // Junta os valores da linha com vírgulas
    );

    // Juntar cabeçalho e linhas
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    // Criar um Blob e disponibilizar para download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Função para formatar a data no nome do arquivo
    const formatDate = (date: Date) => 
        date.getFullYear().toString() +
        String(date.getMonth() + 1).padStart(2, "0") +
        String(date.getDate()).padStart(2, "0") +
        String(date.getHours()).padStart(2, "0") +
        String(date.getMinutes()).padStart(2, "0");

    fileName += `-${formatDate(new Date())}.csv`;

    // Criar um link para download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
