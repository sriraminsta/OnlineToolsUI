import { Link } from 'react-router-dom'
import { ImageToolsList } from '../../../Constants/ImageToolsList'
 
import '../../Layout/Styles/homepage.css'
import '../../Layout/Styles/shared.css'


export  function ImageToolCardComponent() {

    return (
        <>
            {ImageToolsList.map((item) => (
                <Link to={item.url} className="tc" key={item.id}>
                    <div className="tc-icon" style={{ background: '#eef1ff' }} dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                    <div className="tc-name">{item.name}</div>
                    <div className="tc-desc">{item.description}</div>
                    <div className="tc-ft">
                        <span className="t-built">{item.status}</span>
                        <span className="tc-arr">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg></span>
                    </div>
                </Link>
            ))
            }
              <Link to="/image-tools" className="tc-more">+15 more calculators &rarr;</Link>
        </>
    )
}