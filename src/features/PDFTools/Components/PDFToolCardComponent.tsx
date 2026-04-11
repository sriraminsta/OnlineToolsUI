import { Link } from 'react-router-dom'
import { PDFToolsList } from '../../../Constants/PDFToolsList'
 
import '../../Layout/Styles/homepage.css'
import '../../Layout/Styles/shared.css'


export  function PDFToolCardComponent() {

    return (
        <>
            {PDFToolsList.slice(0,3).map((item) => (
                <Link to={item.url} className="tc" key={item.id}>
                    <div className="tc-icon" style={{background:'#fff7ed'}} dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                    <div className="tc-name">{item.name}</div>
                    <div className="tc-desc">{item.description}</div>
                    <div className="tc-ft">
                        <span className={item.status == 'BUILT'?
                            't-built': item.status == 'POPULAR'?
                            't-popular' : item.status == 'COMING SOON'?
                            't-soon':''
                          }>{item.status}</span>
                        <span className="tc-arr">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg></span>
                    </div>
                </Link>
            ))
            }
              <Link to="/pdf-tools" className="tc-more">+{PDFToolsList.length - 3} more tools &rarr;</Link>
        </>
    )
}