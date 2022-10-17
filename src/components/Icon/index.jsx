import { ReactComponent as arrowBack } from '~/assets/back.svg'
import { ReactComponent as arrowLeft } from '~/assets/arrow-left.svg'
import { ReactComponent as arrowRight } from '~/assets/arrow-right.svg'
import { ReactComponent as profile } from '~/assets/profile.svg'

const icons = {
    arrowBack,
    arrowLeft,
    arrowRight,
    profile,
}


export const Icon = ({ name, ...props }) => {
    const ELement = icons[name]
    return <ELement {...props} />
    
    // return <Element {...props} />

}
    
