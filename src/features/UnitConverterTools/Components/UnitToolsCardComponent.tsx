import { Link } from 'react-router-dom'
import { UnitConverterToolsList } from '../../../Constants/UnitConverterToolsList'
 
import '../../Layout/Styles/homepage.css'
import '../../Layout/Styles/shared.css'


export  function UnitToolsCardComponent() {

    return (
        <>
            {UnitConverterToolsList.slice(0,4).map((item) => (
                <Link to={item.url} className="mini-tc" key={item.id}>
                    <div className="mini-icon" style={{background:'#fff7ed'}} dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                    <div className="mini-name">{item.name}</div>
                         <span className={item.status == 'BUILT'?
                            't-built': item.status == 'POPULAR'?
                            't-popular' : item.status == 'COMING SOON'?
                            't-soon':''
                          }>{item.status}</span>                    
                </Link>
            ))
            }
<Link
  to="/unit-converters"
  className="mini-tc"
  style={{
    color: "var(--accent)",
    fontSize: ".8rem",
    fontWeight: 600,
    justifyContent: "center",
  }}
>
  +{UnitConverterToolsList.length - 4}  more text tools →
</Link>
        </>
    )
}