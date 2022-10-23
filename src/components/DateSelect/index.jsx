import { addDays, subDays, format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Icon } from '~/components/Icon'



export const DateSelect = ({ currentDate, onChange }) => {

    const date = new Date(currentDate)

    const prevDay = () => {
        const prevDate = subDays(date, 1)
        onChange(formatISO(prevDate))
        
    }

    const nextDay = () => {
        const nextDate = addDays(date, 1)
        onChange(formatISO(nextDate))
        
    };


    return (

        <div className='w-full flex justify-between my-8 space-x-4 items-center  text-red-300 font-bold text-lg'>
            <Icon name="arrowLeft" className="w-6 text-red-500" onClick={prevDay}/>
            <span className='font-bold'>{format(date, "d 'de' MMMM", { locale: ptBR })}</span>
            <Icon name="arrowRight" className="w-6 text-red-500" onClick={nextDay}/>
        </div>

    )
}

