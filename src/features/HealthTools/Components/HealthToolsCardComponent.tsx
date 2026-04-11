import { Link } from 'react-router-dom'
import { HealthToolsList } from '../../../Constants/HealthToolsList'
 
import '../../Layout/Styles/homepage.css'
import '../../Layout/Styles/shared.css'


export  function HealthToolsCardComponent() {

    return (
        <>
            {HealthToolsList.slice(0,4).map((item) => (
                <Link to={item.url} className="mini-tc" key={item.id}>
                    <div className="mini-icon" style={{background:'#fef2f2'}} dangerouslySetInnerHTML={{ __html: item.icon }}></div>
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
  to="/health-tools"
  className="mini-tc"
  style={{
    color: "var(--accent)",
    fontSize: ".8rem",
    fontWeight: 600,
    justifyContent: "center",
  }}
>
  +{HealthToolsList.length - 4}  more text tools →
</Link>
        </>
    )
}