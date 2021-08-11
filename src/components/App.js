import React , {useState} from 'react';
import '../styles/index.css'
import area1 from './area1.js';


 function App() {

   const  [selected, setSelected] = useState('section1')

    const selector = (e) => {
        let targeting = e.target.id
        if (targeting !== selected){
            setSelected(targeting)
        }
    }


    return(
        <div className="app-container">
            <div id="section1" className={`section s1 ${selected==="section1" ? "active" : ""}`} onClick={(e)=> selector(e)}>
                {area1()}
            </div>
            <div id="section2" className={`section s2 ${selected==="section2" ? "active" : ""}`}   onClick={(e)=> selector(e)}>
                section 2
            </div>
            <div id="section3" className={`section s3 ${selected==="section3" ? "active" : ""}`}   onClick={(e)=> selector(e)}>
                section 3
            </div>

        </div>
    )
}
 
export default App;