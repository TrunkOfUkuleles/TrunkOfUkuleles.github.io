import React , {useState} from 'react';
import '../styles/index.css'


 function App() {

   const  [selected, setSelected] = useState('section s1 selected')

    const selector = (e) => {
        let targeting = document.getElementsByClassName(e.target.className)
        if (e.target.className !== selected){
            let previous = document.getElementsByClassName(selected)
            previous.classList.remove('selected');
            targeting.classList.add('selected');
            setSelected(e.target.className)
        }
    }


    return(
        <div className="app-container">
            <div className="section s1 selected" onClick={(e)=> selector(e)}>
                section 1
            </div>
            <div className="section s2" onClick={(e)=> selector(e)}>
                section 2
            </div>
            <div className="section s3" onClick={(e)=> selector(e)}>
                section 3
            </div>

        </div>
    )
}

export default App;