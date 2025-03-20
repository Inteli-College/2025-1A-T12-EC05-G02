
interface Props {
    active: boolean
}

const Active: React.FC<Props> = ({active}) => {
    return active ? (
        <div className="bg-[#80C7A3] text-[13px] w-18 h-8 rounded-md flex items-center justify-center text-[#3F3047]">
            ATIVO
        </div>
    ) : (
        <div className="bg-[#80C7A3] text-[13px] w-18 h-8 rounded-md flex items-center justify-center text-[#3F3047]">
            INATIVO
        </div>
    )
}

export default Active