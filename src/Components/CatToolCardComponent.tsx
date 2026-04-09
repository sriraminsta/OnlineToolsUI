import {Link} from 'react-router-dom'
//import type { Categories } from '../types/Categories'
import { CategoriesList } from '../Constants/CategoriesList'
 import '../features/Layout/Styles/homepage.css'
 import '../features/Layout/Styles/shared.css'


export default function CatToolCardComponent (){

    return (
        <>
            {CategoriesList.map((item) => (
            <Link key={item.id} to= {item.url} className="cat-card" style={{'--c' : item.c,'--cb':item.cb} as React.CSSProperties}>
                <div className="cat-icon"   dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                <div className="cat-name">{item.name}</div>
                <div className="cat-desc">{item.description}</div>
                <span className="cat-badge">{item.toolCount } tools</span>
                </Link>

             ) )
            }
            </>
    )
}