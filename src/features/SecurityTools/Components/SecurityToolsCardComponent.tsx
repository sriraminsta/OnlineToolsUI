import { Link } from 'react-router-dom'
import { SecurityToolsList } from '../../../Constants/SecurityToolsLits'
 
import '../../Layout/Styles/homepage.css'
import '../../Layout/Styles/shared.css'


export  function SecurityToolsCardComponent() {

    return (
        <>
            {SecurityToolsList.slice(0,4).map((item) => (
                <Link to={item.url} className="mini-tc" key={item.id}>
                    <div className="mini-icon" style={{background:'#f5f3ff'}} dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                    <div className="mini-name">{item.name}</div>
                    <div className="mini-name">{item.subCategory}</div>
                         <span className={item.status == 'BUILT'?
                            't-built': item.status == 'POPULAR'?
                            't-popular' : item.status == 'COMING SOON'?
                            't-soon':''
                          }>{item.status}</span>                    
                </Link>
            ))
            }
<Link
  to="/security-tools"
  className="mini-tc"
  style={{
    color: "var(--accent)",
    fontSize: ".8rem",
    fontWeight: 600,
    justifyContent: "center",
  }}
>
  +{SecurityToolsList.length - 4}  more text tools →
</Link>
        </>
    )
}