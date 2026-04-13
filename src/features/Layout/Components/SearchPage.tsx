import { useState,useEffect ,useRef} from "react"
import {Link} from 'react-router-dom';
import type {Tool} from '../../../types/Tool'
import '../Styles/homepage.css'
import { KEYWORDS} from "../../../Constants/Keywords";


 
export default function SearchPage() {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [searchResults,setSearchResults] = useState<Tool[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
      const containerRef = useRef<HTMLDivElement>(null);
    
    const handleInputChange = (val: string) => {
        setSearchTerm(val);
        if (val.length < 3) return [];
        const kywd: Tool[] = KEYWORDS.filter((kw) => {
            const isSeachWorked: string | undefined = kw.searchTerms.find((item) => {
                return item.includes(val);
            })
            
            return !!isSeachWorked?.trim();
        });
     setSearchResults(kywd)// = kywd;
     setShowDropdown(true);
    }

      // Handle click outside to hide dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

    return (
        <div className="search-outer fu d3" ref={containerRef}>
            <div className="search-wrap" >
                <input
                    type="text"
                    id="search-input"
                    placeholder={searchTerm}
                    autoComplete="off"
                    value={searchTerm}
                    onChange={e => handleInputChange(e.target.value)}
                />
            </div>
            {/* Dropdown is CHILD of .search-outer, NOT inside overflow:hidden hero background divs */}
            <div  className={`search-results ${searchTerm.length>2 ? "show" : ""} `} id="search-results">
              {showDropdown  && 
              searchResults.length> 0 ?  
                searchResults.map(item => (
                    <Link to = {item.url} key={item.id} className = "search-result-item">                  
                    <div className="sri-icon"  style={{ backgroundColor: item.background}}>
                    {item.icon}
                  </div>
                  <div>
                  <div className="sri-name">{item.name}</div>
                  <div className="sri-cat">{item.description}</div>
                  </div>
                  </Link>
                )) : searchTerm.length > 2 && showDropdown ? (
          <div   className= "search-no-results">
            No tools found for "{searchTerm}". Try another keyword.
          </div>
        ) : null}
            </div>
        </div>

    )
}